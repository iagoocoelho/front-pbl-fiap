import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
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
          <Navbar.Brand href="#">
            {/* <img src={logo} className="img-fluid" alt="logo cartão saúde" /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end text-center"
          >
            <Nav
              activeKey={pathname}
              className="align-items-center"
            >
              {/* <Nav.Link href="/lista-pedidos">Lista pedidos</Nav.Link> */}
              <Nav.Link href="/cadastro-fornecedor">
                Cadastrar Fornecedor
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
