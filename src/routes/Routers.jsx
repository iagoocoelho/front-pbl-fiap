import { Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import RegisterOrder from "pages/RegisterOrder/RegisterOrder";
import Toast from "components/toast/Toast";
// import OrderKanbanList from "components/orderKanbanList/orderKanbanList";
import FormSupplier from "components/FormSupplier/FormSupplier";

const Routers = () => (
  <>
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/cadastro-fornecedor"} element={<FormSupplier />} />
      <Route
        path={"/editar-fornecedor/:id"}
        element={<FormSupplier editMode />}
      />
    </Routes>
    <Toast />
  </>
);

export default Routers;
