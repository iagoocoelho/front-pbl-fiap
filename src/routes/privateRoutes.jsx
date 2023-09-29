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
import { PermissionsByProfile } from "utils/variables";
import { Fragment } from "react";

const privateRoutes = [
  {
    lista_fornecedor: (
      <Route
        key="lista_fornecedor"
        path={"/listagem-fornecedor"}
        element={<SupplierList />}
      />
    ),
  },
  {
    edit_fornecedor: (
      <Fragment key="fornecedor">
        <Route
          key="cadastro_fornecedor"
          path={"/cadastro-fornecedor"}
          element={<FormSupplier />}
        />
        <Route
          key="edit_fornecedor"
          path={"/editar-fornecedor/:id"}
          element={<FormSupplier editMode />}
        />
      </Fragment>
    ),
  },
  {
    lista_cliente: (
      <Route
        key="lista_cliente"
        path={"/listagem-cliente"}
        element={<CustomerList />}
      />
    ),
  },
  {
    edit_cliente: (
      <Fragment key="cliente">
        <Route
          key="cadastro_cliente"
          path={"/cadastro-cliente"}
          element={<FormCustomer />}
        />
        <Route
          key="edit_cliente"
          path={"/editar-cliente/:id"}
          element={<FormCustomer editMode />}
        />
      </Fragment>
    ),
  },
  {
    lista_material: (
      <Route
        key="lista_material"
        path={"/listagem-material"}
        element={<MaterialList />}
      />
    ),
  },
  {
    edit_material: (
      <Fragment key="material">
        <Route
          key="cadastro_material"
          path={"/cadastro-material"}
          element={<FormMaterial />}
        />
        <Route
          key="edit_material"
          path={"/editar-material/:id"}
          element={<FormMaterial editMode />}
        />
      </Fragment>
    ),
  },
  {
    lista_produto: (
      <Route
        key="lista_produto"
        path={"/listagem-produto"}
        element={<ProductList />}
      />
    ),
  },
  {
    edit_produto: (
      <Fragment key="produto">
        <Route
          key="cadastro_produto"
          path={"/cadastro-produto"}
          element={<FormProduct />}
        />
        <Route
          key="edit_produto"
          path={"/editar-produto/:id"}
          element={<FormProduct editMode />}
        />
      </Fragment>
    ),
  },
  {
    lista_pedido: (
      <Route
        key="lista_pedido"
        path={"/lista-pedidos"}
        element={<OrderList />}
      />
    ),
  },
  {
    edit_pedido: (
      <Fragment key="pedido">
        <Route
          key="cadastro_pedido"
          path={"/cadastro-pedido"}
          element={<FormOrder />}
        />
        ,
        <Route
          key="edit_pedido"
          path={"/editar-pedido/:id"}
          element={<FormOrder editMode />}
        />
        <Route
          key="view_pedido"
          path={"/visualizar-pedido/:id"}
          element={<FormOrder viewMode />}
        />
      </Fragment>
    ),
  },
];

const PrivateRoute = ({ auth_state }) => {
  const allowedRoutes = privateRoutes
    .map((route) => {
      let hasPerm = PermissionsByProfile[auth_state.data.perfil].find((alo) => {
        return Object.keys(route).pop() === alo;
      });

      if (hasPerm) return route[Object.keys(route)];

      return false;
    })
    .filter((allowed) => allowed);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      {allowedRoutes.map(x => x)}
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
