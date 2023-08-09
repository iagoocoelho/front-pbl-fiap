import { Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Toast from "components/Toast/Toast";
import FormSupplier from "components/FormSupplier/FormSupplier";
import OrderList from "pages/OrderList/OrderList";
import FormCustomer from "components/FormCustomer/FormCustomer";
import FormMaterial from "components/FormMaterial/FormMaterial";

const Routers = () => (
  <>
    <Routes>
      <Route path={"/"} element={<Home />} />

      <Route path={"/cadastro-fornecedor"} element={<FormSupplier />} />
      <Route
        path={"/editar-fornecedor/:id"}
        element={<FormSupplier editMode />}
      />

      <Route path={"/cadastro-cliente"} element={<FormCustomer />} />
      <Route path={"/editar-cliente/:id"} element={<FormCustomer editMode />} />

      <Route path={"/cadastro-material"} element={<FormMaterial />} />

      <Route path={"/lista-pedidos"} element={<OrderList />} />
    </Routes>
    <Toast />
  </>
);

export default Routers;
