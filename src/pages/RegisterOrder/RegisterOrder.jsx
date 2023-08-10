import React, { useEffect, useMemo, useState } from "react";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { MainContainer } from "components/container/mainContainer";
import { connect } from "react-redux";
import * as suppliersActions from "store/suppliers/actions";
import CurrencyInput from "react-currency-input-field";
import "./register.scss";

export const RegisterOrder = ({ registerState, registerReset }) => {
  const [data, setData] = useState({
    item_name: "",
    item_unity: "",
    client_name: "",
    value: 0,
    infos: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <div>
        <div className="col py-4 title">
          <h3 className="p-2">Cadastrar Pedido</h3>
          <p className="p-2">
            Insira os detalhes do pedido e envie para produção
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="mb-3 col-10 col-sm-10"
              controlId="item_name"
            >
              <Form.Select
                className="col-10 col-sm-10"
                onChange={(e) =>
                  setData({ ...data, item_name: e.target.value })
                }
              >
                <option>Selecionar item...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3 col-2 col-sm-2"
              controlId="unit"
            >
              <Form.Control
                disabled
                placeholder="Unidade"
                onChange={(e) =>
                  setData({ ...data, item_unity: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              as={Col}
              className="mb-3 col-5 col-sm-5"
              controlId="item"
            >
              <Form.Select
                onChange={(e) =>
                  setData({ ...data, client_name: e.target.value })
                }
              >
                <option>Selecionar cliente...</option>
                <option value="1">Ciente 1</option>
                <option value="2">Ciente 2</option>
                <option value="3">Ciente 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3 col-7 col-sm-7"
              controlId="mobile_number"
            >
              <CurrencyInput
                className="form-control"
                prefix="R$"
                name="valor-pedido"
                placeholder="Informe o valor do pedido"
                decimalsLimit={2}
                onValueChange={(value, name) => {
                  setData({ ...data, value: value });
                  console.log(value, name);
                }}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
              />
            </Form.Group>
          </Row>
          <Row>
            <FloatingLabel
              controlId="infos-adicionais"
              label="Informações adicionais"
              className="mb-3"
            >
              <Form.Control as="textarea" placeholder="Obserções" />
            </FloatingLabel>
          </Row>

          <Row>
            <Col className="text-sm-center py-4">
              <button variant="primary" className="btn-red mx-4" type="button">
                Cancelar
              </button>

              <button variant="primary" className="btn-green" type="submit">
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
    registerState: state.suppliers.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerSupplierRequest: (data) => {
      dispatch(suppliersActions.registerSupplierRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrder);
