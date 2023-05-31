import React from "react";
import { MainContainer } from "components/container/MainContainer";
import Header from "components/header/Header";
import SupplierList from "pages/SupplierList/SupplierList";

export const Home = () => {
  return (
    <>
      <Header />

      <MainContainer>
        <SupplierList />
      </MainContainer>
    </>
  );
};

export default Home;
