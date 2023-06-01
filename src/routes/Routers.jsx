import { Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Toast from "components/toast/Toast";
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
