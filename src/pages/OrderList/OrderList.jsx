import React from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";
import { MainContainer } from "components/Container/MainContainer";
import StartOrder from "pages/StartOrder/StartOrder";

export const OrderList = () => {
  // TO DO: Request API de lita de pedidos para iniciar

  return (
    <MainContainer>
      <Col className="py-4 title">
        <h3>Lista de pedidos</h3>
      </Col>

      <StartOrder />
      <StartOrder />
      <StartOrder />
    </MainContainer>
  );
};

export default OrderList;
