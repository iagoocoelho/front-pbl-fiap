import { Routes, Route } from "react-router-dom";
import Home from "pages/home/home";
import FormSupplier from "components/formSupplier/formSupplier";
import OrderList from "pages/orderList/orderList";
import FormCustomer from "components/formCustomer/formCustomer";
import FormMaterial from "components/formMaterial/formMaterial";
import FormProduct from "components/formProduct/formProduct";
import SupplierList from "pages/supplierList/supplierList";
import MaterialList from "pages/materialList/materialList";
import CustomerList from "pages/customerList/customerList";
import ProductList from "pages/productList/productList";
import FormOrder from "components/formOrder/formOrder";
import { connect } from "react-redux";

const privateRoutes = [
  {
    lista_fornecedor: (
      <Route path={"/listagem-fornecedor"} element={<SupplierList />} />
    ),
  },
  {
    edit_fornecedor: (
      <>
        <Route path={"/cadastro-fornecedor"} element={<FormSupplier />} />
        <Route
          path={"/editar-fornecedor/:id"}
          element={<FormSupplier editMode />}
        />
      </>
    ),
  },
  {
    lista_cliente: (
      <Route path={"/listagem-cliente"} element={<CustomerList />} />
    ),
  },
  {
    edit_cliente: (
      <>
        <Route path={"/cadastro-cliente"} element={<FormCustomer />} />
        <Route
          path={"/editar-cliente/:id"}
          element={<FormCustomer editMode />}
        />
      </>
    ),
  },
  {
    lista_material: (
      <Route path={"/listagem-material"} element={<MaterialList />} />
    ),
  },
  {
    edit_material: (
      <>
        <Route path={"/cadastro-material"} element={<FormMaterial />} />
        <Route
          path={"/editar-material/:id"}
          element={<FormMaterial editMode />}
        />
      </>
    ),
  },
  {
    lista_produto: (
      <Route path={"/listagem-produto"} element={<ProductList />} />
    ),
  },
  {
    edit_produto: (
      <>
        <Route path={"/cadastro-produto"} element={<FormProduct />} />
        <Route
          path={"/editar-produto/:id"}
          element={<FormProduct editMode />}
        />
      </>
    ),
  },
  {
    lista_pedido: <Route path={"/lista-pedidos"} element={<OrderList />} />,
  },
  {
    edit_pedido: (
      <>
        <Route path={"/cadastro-pedido"} element={<FormOrder />} />,
        <Route path={"/editar-pedido/:id"} element={<FormOrder editMode />} />
        <Route
          path={"/visualizar-pedido/:id"}
          element={<FormOrder viewMode />}
        />
      </>
    ),
  },
];

const PrivateRoute = ({ auth_state }) => {
  const allowedRoutes = privateRoutes
    .map((route) => {
      let auth_perm = auth_state.data.permissoes.find((alo) => {
        return Object.keys(route).pop() === Object.keys(alo).pop();
      });

      if (auth_perm[Object.keys(route).pop()]) {
        return route[Object.keys(route)];
      } else {
        return false;
      }
    })
    .filter((allowed) => allowed);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      {allowedRoutes}
    </Routes>
  );
};

const mapStateToProps = (state) => {
  return {
    auth_token: state.auth.data?.token,
    auth_state: state.auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
