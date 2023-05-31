import React from "react";
import { connect } from "react-redux";
import { MainContainer } from "components/container/MainContainer";
import Header from "components/header/Header";
import OrderList from "pages/OrderList/OrderList";

export const Home = () => {
  return (
    <>
      <Header />

      {/* <MainContainer>
        <OrderList />
      </MainContainer> */}
    </>
  );
};

export default Home;
