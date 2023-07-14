import React from "react";
import { MainContainer } from "components/Container/MainContainer";
import SupplierList from "pages/SupplierList/SupplierList";

export const Home = () => {
  return (
    <MainContainer>
      <SupplierList />
    </MainContainer>
  );
};

export default Home;
