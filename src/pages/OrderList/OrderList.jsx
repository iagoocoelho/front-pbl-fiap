import React from "react";
import { connect } from "react-redux";
import { MainContainer } from "components/container/MainContainer";
import StartOrder from "pages/StartOrder/StartOrder";

export const OrderList = () => {
  return (
    <MainContainer>
      <StartOrder />
      <StartOrder />
      <StartOrder />
    </MainContainer>
  );
};

export default OrderList;
