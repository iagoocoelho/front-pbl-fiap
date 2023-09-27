import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { MainContainer } from "components/container/mainContainer";
import { connect } from "react-redux";
import * as suppliersActions from "store/suppliers/actions";
import * as ordersActions from "store/orders/actions";
import * as productsActions from "store/products/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { getSupplierListRequest } from "store/suppliers/sagas";
import DatePicker from "react-datepicker";
import { UF } from "utils/variables";

import "./formOrder.scss";
import ProductComponent from "./productComponent";

export const FormOrder = ({
  registerOrderRequest,
  registerState,
  editOrderRequest,
  getOrderByIdRequest,
  getOrderByIdClean,
  getProductListRequest,
  editMode,
  productList,
  orders,
  supplierList,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (editMode && isFirstRender.current) {
      isFirstRender.current = false;

      return getOrderByIdRequest(pathname.split("/editar-pedido/")[1]);
    }

    getSupplierListRequest();
    getProductListRequest();

    return () => {
      getOrderByIdClean();
    };
  }, [
    getOrderByIdRequest,
    getOrderByIdClean,
    editMode,
    pathname,
    getProductListRequest,
  ]);

  useEffect(() => {
    if (!orders.loading && orders.success) setData(orders.data);
  }, [orders]);

  const [data, setData] = useState({
    idCliente: 1,
    dataEntrega: "",
    logradouro: "",
    numero: "",
    bairro: "",
    estado: "SP",
    cep: "",
    informacoesAdicionais: "",
    detalhes: [
      {
        idProduto: 0,
        quantidade: 0,
        desconto: 0,
      },
    ],
  });

  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      editOrderRequest(data.id, data, () => navigate("/listagem-pedidos"));
      return;
    }

    registerOrderRequest(
      { ...data, dataEntrega: startDate.toISOString().split("T")[0] },
      () => navigate("/listagem-pedidos")
    );
  };

  const onChangeProduct = ({ idProduto, quantidade, index }) => {
    let newData = data.detalhes.map((detalhe, i) => {
      if (i === index) {
        return {
          idProduto: !!idProduto ? idProduto : detalhe.idProduto,
          quantidade: !!quantidade ? quantidade : detalhe.quantidade,
          desconto: 0,
        };
      }

      return { ...detalhe };
    });

    setData({ ...data, detalhes: newData });
  };

  const removeProduct = ({ index }) => {
    if (data.detalhes.length === 1) return;

    let newList = data.detalhes.filter((detalhe, i) => i !== index);

    setData({ ...data, detalhes: newList });
  };

  const newProduct = () => {
    let newList = data.detalhes;

    newList.push({
      idProduto: null,
      quantidade: "",
      desconto: 0,
    });

    setData({ ...data, detalhes: newList });
  };

  return (
    <MainContainer className="form-order">
      <div>
        <div className="col py-4 title">
          <h3 className="p-2">{editMode ? "Editar" : "Cadastrar"} Pedido</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-3 col-8 col-sm-8">
              <Form.Label htmlFor="estado">Cliente</Form.Label>
              <Form.Select
                id="cliente"
                value={data.idCliente || data?.fornecedor?.id}
                onChange={(e) => {
                  setData({
                    ...data,
                    idCliente: +e.target.value,
                  });
                }}
              >
                <option value="">Selecione o cliente</option>
                {supplierList.success &&
                  supplierList?.data.map((fornecedor) => (
                    <option key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.nome}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-4 col-sm-4">
              <Form.Label htmlFor="estado">Data de Entrega</Form.Label>
              <Form.Control as={Form.Label}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
              </Form.Control>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3 col-5 col-sm-5">
              <Form.Label htmlFor="logradouro">Logradouro</Form.Label>
              <Form.Control
                id="logradouro"
                placeholder="Endereço completo"
                value={data.logradouro}
                onChange={(e) =>
                  setData({ ...data, logradouro: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-1 col-sm-1">
              <Form.Label htmlFor="numero">Número</Form.Label>
              <Form.Control
                id="numero"
                value={data.numero}
                onChange={(e) => setData({ ...data, numero: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
              <Form.Label htmlFor="bairro">Bairro</Form.Label>
              <Form.Control
                id="bairro"
                placeholder="Bairro"
                value={data.bairro}
                onChange={(e) =>
                  setData({
                    ...data,
                    bairro: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
              <Form.Label htmlFor="cep">CEP</Form.Label>
              <Form.Control
                id="cep"
                type="number"
                placeholder="CEP"
                value={data.cep}
                onChange={(e) => {
                  if (e.target.value.length > 8) return;

                  setData({
                    ...data,
                    cep: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
              <Form.Label htmlFor="estado">Estado</Form.Label>
              <Form.Select
                id="estado"
                value={UF.find((x) => x.sigla === data.estado)?.sigla || ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    estado: e.target.value,
                  });
                }}
              >
                <option value="">Selecione o estado</option>
                {UF.map((uf) => (
                  <option key={uf.sigla} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3 col-12 col-sm-12">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Informações adicionais"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Informações adicionais"
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      informacoesAdicionais: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          {data.detalhes.map((product, i) => {
            return (
              <ProductComponent
                index={i}
                productList={productList}
                product={product}
                onChangeProduct={onChangeProduct}
                removeProduct={removeProduct}
              />
            );
          })}

          <button
            variant="primary"
            className="btn-blue me-4"
            type="button"
            onClick={newProduct}
          >
            Adicionar Produto
          </button>

          <Row>
            <Col className="text-sm-center py-4">
              <button
                variant="primary"
                className="btn-blue me-4"
                type="button"
                onClick={() => navigate("/")}
              >
                Voltar
              </button>

              <button
                variant="primary"
                className="btn-green"
                type="submit"
                disabled={registerState.loading}
              >
                {registerState.loading ? "Enviando..." : "Enviar"}
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </MainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    registerState: state.orders.register,
    orders: state.orders.orderById,
    supplierList: state.suppliers.list,
    productList: state.products.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerOrderRequest: (data, navigate) => {
      dispatch(ordersActions.registerOrderRequest(data, navigate));
    },
    editOrderRequest: (id, data, navigate) => {
      dispatch(ordersActions.editOrderRequest(id, data, navigate));
    },
    getOrderByIdRequest: (id) => {
      dispatch(ordersActions.getOrderByIdRequest(id));
    },
    getOrderByIdClean: () => {
      dispatch(ordersActions.getOrderByIdClean());
    },
    getSupplierListRequest: () => {
      dispatch(suppliersActions.getSupplierListRequest());
    },
    getProductListRequest: () => {
      dispatch(productsActions.getProductListRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormOrder);
