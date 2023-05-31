import React, { useEffect, useMemo, useState } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { MainContainer } from "components/container/MainContainer";
import { connect } from "react-redux";
import * as suppliersActions from "store/suppliers/actions";
import { AiOutlineInfoCircle, AiFillPlayCircle } from "react-icons/ai";
import "./register.scss";

export const StartOrder = ({ registerState, registerReset }) => {
  const [data, setData] = useState({
    item_name: "Lorem, ipsum dolor.",
    item_unity: "Pçs",
    client_name: "Lorem, ipsum.",
    value: 0,
    infos:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, ullam? Modi quos, facere explicabo rem libero id sunt suscipit quis corporis maxime necessitatibus iste voluptatem quia sint ex aut velit natus expedita eveniet. Sed sequi magni quisquam, ad dignissimos officia eligendi qui fugiat nemo mollitia, beatae quasi odit autem quas!",
  });

  return (
    <MainContainer>
      <Col className="py-4 title">
        <h3 className="py-2">Lista de pedidos</h3>
      </Col>

      <Row className="mb-3">
        <Col className="col-8">Produção de Pedido 00001</Col>
        <Col className="col-4 text-sm-end">
          <Button type="button" className="mx-3">
            <AiOutlineInfoCircle size={"20px"} />
          </Button>
          <Button type="button">
            <AiFillPlayCircle className="me-2" size={"20px"} />
            Iniciar produção
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3 col-10 col-sm-10" controlId="unit">
          <Form.Control disabled placeholder="Produto" value={data.item_name} />
        </Form.Group>

        <Form.Group as={Col} className="mb-3 col-2 col-sm-2" controlId="unit">
          <Form.Control
            disabled
            placeholder="Unidade"
            value={data.item_unity}
          />
        </Form.Group>
      </Row>

      <Row>
        <FloatingLabel
          controlId="infos-adicionais"
          label="Informações adicionais"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            className="h-auto"
            disabled
            placeholder="Obserções"
            value={data.infos}
          />
        </FloatingLabel>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartOrder);
