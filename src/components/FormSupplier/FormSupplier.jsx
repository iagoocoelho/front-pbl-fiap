import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "components/container/MainContainer";
import { connect } from "react-redux";
import * as suppliersActions from "store/suppliers/actions";
import { UF } from "Util/variables";
import Header from "components/header/Header";
import { useLocation } from "react-router-dom";
import "./formSupplier.scss";

export const FormSupplier = ({
  registerState,
  deleteSupplierRequest,
  registerSupplierRequest,
  editSupplierRequest,
  getSupplierByIdRequest,
  getSupplierListClean,
  editMode,
  supplier,
}) => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (editMode && isFirstRender.current) {
      isFirstRender.current = false;
      return getSupplierByIdRequest(pathname.split("/editar-fornecedor/")[1]);
    }

    return () => {
      getSupplierListClean();
    };
  }, [getSupplierByIdRequest, getSupplierListClean, editMode, pathname]);

  useEffect(() => {
    if (!supplier.loading && supplier.success) setData(supplier.data);
  }, [supplier]);

  const [data, setData] = useState({
    id: null,
    nome: "",
    documento: "",
    email: "",
    telefones: [
      {
        tipo: "COMERCIAL",
        numero: "",
      },
      {
        tipo: "CELULAR",
        numero: "",
      },
    ],
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      estado: "",
      cep: "",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      editSupplierRequest(data);
    }

    registerSupplierRequest(data);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    deleteSupplierRequest(data.id);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <div>
          <div className="col py-4 title">
            <h3 className="p-2">
              {editMode ? "Editar" : "Cadastrar"} Fornecedor
            </h3>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3 col-8 col-sm-8">
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Nome"
                  value={data.nome}
                  onChange={(e) => setData({ ...data, nome: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
                <Form.Label htmlFor="doc">Documento</Form.Label>
                <Form.Control
                  id="doc"
                  placeholder="Documento"
                  value={data.documento}
                  onChange={(e) =>
                    setData({ ...data, documento: e.target.value })
                  }
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
                <Form.Label htmlFor="tel">Telefone Comercial</Form.Label>
                <Form.Control
                  id="tel"
                  placeholder="Telefone Comercial"
                  type="number"
                  value={
                    data.telefones.find((item) => item.tipo === "COMERCIAL")
                      ?.numero
                  }
                  onChange={(e) => {
                    let newData = data.telefones.map((tel) => {
                      if (tel.tipo === "COMERCIAL") {
                        return { ...tel, numero: e.target.value };
                      }
                      return tel;
                    });

                    setData({
                      ...data,
                      telefones: newData,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
                <Form.Label htmlFor="cel">Celular</Form.Label>
                <Form.Control
                  id="cel"
                  placeholder="Celular"
                  value={
                    data.telefones.find((item) => item.tipo === "CELULAR")
                      ?.numero
                  }
                  onChange={(e) => {
                    let newData = data.telefones.map((tel) => {
                      if (tel.tipo === "CELULAR") {
                        return { ...tel, numero: e.target.value };
                      }
                      return tel;
                    });

                    setData({
                      ...data,
                      telefones: newData,
                    });
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
                <Form.Label htmlFor="logradouro">Logradouro</Form.Label>
                <Form.Control
                  id="logradouro"
                  placeholder="Logradouro"
                  value={data.endereco.logradouro}
                  onChange={(e) =>
                    setData({
                      ...data,
                      endereco: {
                        ...data.endereco,
                        logradouro: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
                <Form.Label htmlFor="bairro">Bairro</Form.Label>
                <Form.Control
                  id="bairro"
                  placeholder="Bairro"
                  value={data.endereco.bairro}
                  onChange={(e) =>
                    setData({
                      ...data,
                      endereco: {
                        ...data.endereco,
                        bairro: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
                <Form.Label htmlFor="numero">Número</Form.Label>
                <Form.Control
                  placeholder="Número"
                  id="numero"
                  value={data.endereco.numero}
                  type="number"
                  onChange={(e) =>
                    setData({
                      ...data,
                      endereco: {
                        ...data.endereco,
                        numero: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
                <Form.Label htmlFor="estado">Estado</Form.Label>
                <Form.Select
                  id="estado"
                  value={
                    UF.find((x) => x.sigla === data.endereco.estado)?.sigla ||
                    ""
                  }
                  onChange={(e) => {
                    setData({
                      ...data,
                      endereco: {
                        ...data.endereco,
                        estado: e.target.value,
                      },
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

              <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
                <Form.Label htmlFor="cep">CEP</Form.Label>
                <Form.Control
                  id="cep"
                  type="number"
                  placeholder="CEP"
                  value={data.endereco.cep}
                  onChange={(e) => {
                    if (e.target.value.length > 8) return;

                    setData({
                      ...data,
                      endereco: {
                        ...data.endereco,
                        cep: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col className="text-sm-center py-4">
                <button variant="primary" className="btn-blue me-4" type="button">
                  Voltar
                </button>

                {editMode && (
                  <button
                    variant="primary"
                    className="btn-red me-4"
                    type="button"
                    onClick={handleDelete}
                  >
                    Excluir
                  </button>
                )}

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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registerState: state.suppliers.register,
    supplier: state.suppliers.supplierById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerSupplierRequest: (data) => {
      dispatch(suppliersActions.registerSupplierRequest(data));
    },
    editSupplierRequest: (data) => {
      dispatch(suppliersActions.editSupplierRequest(data));
    },
    deleteSupplierRequest: (id) => {
      dispatch(suppliersActions.deleteSupplierRequest(id));
    },
    getSupplierByIdRequest: (id) => {
      dispatch(suppliersActions.getSupplierByIdRequest(id));
    },
    getSupplierListClean: () => {
      dispatch(suppliersActions.getSupplierListClean());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSupplier);
