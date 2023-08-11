import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm p-0 navbar navbar-expand-lg navbar-light d-flex flex-column"
      >
        <Container className="p-4">
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end text-center">
            <Nav activeKey={pathname}>
              {/* <NavDropdown title="Pedidos" >
                <NavDropdown.Item>
                  <Nav.Link href="/cadastrar-pedido">Listagem de Pedidos</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link href="/lista-pedidos">Listagem de Pedidos</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown> */}

              <NavDropdown title="Fornecedor">
                <Nav.Link href="/cadastro-fornecedor">
                  Cadastrar Fornecedor
                </Nav.Link>

                <Nav.Link href="/listagem-fornecedor">
                  Listagem de Fornecedores
                </Nav.Link>
              </NavDropdown>

              <NavDropdown title="Cliente">
                <Nav.Link href="/cadastro-cliente">Cadastrar Clientes</Nav.Link>

                <Nav.Link href="/listagem-cliente">
                  Listagem de Clientes
                </Nav.Link>
              </NavDropdown>

              <NavDropdown title="Material">
                <Nav.Link href="/cadastro-material">
                  Cadastrar Material
                </Nav.Link>

                <Nav.Link href="/listagem-material">
                  Listagem de Materiais
                </Nav.Link>
              </NavDropdown>

              <NavDropdown title="Produto">
                <Nav.Link href="/cadastro-produto">Cadastrar Produto</Nav.Link>

                <Nav.Link href="/listagem-produto">
                  Listagem de Produtos
                </Nav.Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
