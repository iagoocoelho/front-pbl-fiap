import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import { useEffect } from "react";

const privateHeaders = [
  {
    lista_fornecedor: (
      <Nav.Link href="/listagem-fornecedor">Listagem de Fornecedores</Nav.Link>
    ),
  },
  {
    edit_fornecedor: (
      <Nav.Link href="/cadastro-fornecedor">Cadastrar Fornecedor</Nav.Link>
    ),
  },
  {
    lista_cliente: (
      <Nav.Link href="/listagem-cliente">Listagem de Clientes</Nav.Link>
    ),
  },
  {
    edit_cliente: (
      <>
        <Nav.Link href="/cadastro-cliente">Cadastrar Clientes</Nav.Link>
      </>
    ),
  },
  {
    lista_material: (
      <Nav.Link href="/listagem-material">Listagem de Materiais</Nav.Link>
    ),
  },
  {
    edit_material: (
      <Nav.Link href="/cadastro-material">Cadastrar Material</Nav.Link>
    ),
  },
  {
    lista_produto: (
      <Nav.Link href="/listagem-produto">Listagem de Produtos</Nav.Link>
    ),
  },
  {
    edit_produto: (
      <Nav.Link href="/cadastro-produto">Cadastrar Produto</Nav.Link>
    ),
  },
  {
    lista_pedido: (
      <Nav.Item>
        <Nav.Link href="/lista-pedidos">Listagem de Pedidos</Nav.Link>
      </Nav.Item>
    ),
  },
  {
    edit_pedido: (
      <>
        <Nav.Item>
          <Nav.Link href="/cadastro-pedido">Cadastrar Pedido</Nav.Link>
        </Nav.Item>
      </>
    ),
  },
];

export const Header = ({ auth_state }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate("/");

  const allowedNavBars = privateHeaders
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

  useEffect(() => {
    if (pathname) {
      let allowedPaths = allowedNavBars.find((x) => x.props.href === pathname);

      if (!allowedPaths) navigate("/");
    }
  }, [pathname, allowedNavBars, navigate]);

  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm p-0 navbar navbar-expand-lg navbar-light d-flex flex-column"
      >
        <div className="p-4 w-100">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="text-center">
            <Nav activeKey={pathname} className="w-100 justify-content-end">
              {allowedNavBars}

              <div className="btn-container">
                <Button>Deslogar</Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth_state: state.auth,
  };
};

export default connect(mapStateToProps, null)(Header);
