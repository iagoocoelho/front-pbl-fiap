import { Routes, Route } from "react-router-dom";
import Home from "pages/home/home";
import Toast from "components/toast/toast";
import FormSupplier from "components/formSupplier/formSupplier";
import OrderList from "pages/orderList/orderList";
import FormCustomer from "components/formCustomer/formCustomer";
import FormMaterial from "components/formMaterial/formMaterial";
import FormProduct from "components/formProduct/formProduct";
import SupplierList from "pages/supplierList/supplierList";
import MaterialList from "pages/materialList/materialList";
import CustomerList from "pages/customerList/customerList";
import ProductList from "pages/productList/productList";

const Routers = () => (
  <>
    <Routes>
      <Route path={"/"} element={<Home />} />

      <Route path={"/listagem-fornecedor"} element={<SupplierList />} />
      <Route path={"/cadastro-fornecedor"} element={<FormSupplier />} />
      <Route
        path={"/editar-fornecedor/:id"}
        element={<FormSupplier editMode />}
      />

      <Route path={"/listagem-cliente"} element={<CustomerList />} />
      <Route path={"/cadastro-cliente"} element={<FormCustomer />} />
      <Route path={"/editar-cliente/:id"} element={<FormCustomer editMode />} />

      <Route path={"/listagem-material"} element={<MaterialList />} />
      <Route path={"/cadastro-material"} element={<FormMaterial />} />
      <Route
        path={"/editar-material/:id"}
        element={<FormMaterial editMode />}
      />

      <Route path={"/listagem-produto"} element={<ProductList />} />
      <Route path={"/cadastro-produto"} element={<FormProduct />} />
      <Route path={"/editar-produto/:id"} element={<FormProduct editMode />} />

      <Route path={"/lista-pedidos"} element={<OrderList />} />
    </Routes>
    <Toast />
  </>
);

export default Routers;
