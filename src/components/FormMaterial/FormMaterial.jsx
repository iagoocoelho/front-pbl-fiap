import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "components/Container/MainContainer";
import { connect } from "react-redux";
import * as materialsActions from "store/materials/actions";
import { useLocation, redirect, useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import "./formMaterial.scss";

let mockSupplier = [
  {
    id: 32132,
    name: "Mercadinho Brutus",
  },
  {
    id: 321,
    name: "Testeee Nome",
  },
  {
    id: 365,
    name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, eaque.",
  },
  {
    id: 3,
    name: "Lorem ipsum dolor sit.",
  },
  {
    id: 975,
    name: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export const FormMaterial = ({
  registerState,
  registerMaterialRequest,
  editMaterialRequest,
  getMaterialByIdRequest,
  getMaterialByIdClean,
  editMode,
  material,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (editMode && isFirstRender.current) {
      isFirstRender.current = false;
      return getMaterialByIdRequest(pathname.split("/editar-material/")[1]);
    }

    return () => {
      getMaterialByIdClean();
    };
  }, [getMaterialByIdRequest, getMaterialByIdClean, editMode, pathname]);

  useEffect(() => {
    if (!material.loading && material.success) setData(material.data);
  }, [material]);

  const [data, setData] = useState({
    fornecedorId: null,
    descricao: "",
    unidade: "",
    codigo_fabricante: "",
    custo: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      editMaterialRequest(data.id, data, () => navigate("/"));
      return;
    }

    registerMaterialRequest(
      { ...data, custo: +data.custo.replace(",", ".") },
      () => navigate("/")
    );
  };

  return (
    <MainContainer>
      <div>
        <div className="col py-4 title">
          <h3 className="p-2">{editMode ? "Editar" : "Cadastrar"} Material</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-3 col-4 col-sm-4">
              <Form.Label htmlFor="estado">Fornecedor</Form.Label>
              <Form.Select
                id="fornecedor"
                value={data.fornecedorId}
                onChange={(e) => {
                  setData({
                    ...data,
                    fornecedorId: +e.target.value,
                  });
                }}
              >
                <option value="">Selecione o fornecedor</option>
                {mockSupplier.map((fornecedor) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-6 col-sm-6">
              <Form.Label htmlFor="descricao">Descrição</Form.Label>
              <Form.Control
                id="descricao"
                placeholder="Descreva a descrição do material"
                value={data.descricao}
                onChange={(e) =>
                  setData({ ...data, descricao: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-2 col-sm-2">
              <Form.Label htmlFor="unidade">Unidade</Form.Label>
              <Form.Control
                id="unidade"
                placeholder="Ex: Kg, m, cm, m2, ..."
                value={data.unidade}
                onChange={(e) => setData({ ...data, unidade: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3 col-9 col-sm-9">
              <Form.Label htmlFor="codigo_fabricante">
                Nome técnico do Material
              </Form.Label>
              <Form.Control
                id="codigo_fabricante"
                placeholder="Descreva o nome que o fornecedor usa para o material"
                value={data.codigo_fabricante}
                onChange={(e) =>
                  setData({ ...data, codigo_fabricante: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-3 col-sm-3">
              <Form.Label htmlFor="tel">Custo</Form.Label>
              <CurrencyInput
                className="form-control"
                prefix="R$"
                name="custo"
                placeholder="Informe o custo do material"
                decimalsLimit={2}
                onValueChange={(value, name) => {
                  setData({ ...data, custo: value });

                  console.log(value, name);
                }}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Col className="text-sm-center py-4">
              <button
                variant="primary"
                className="btn-blue me-4"
                type="button"
                onClick={() => navigate("/")}
              >
                Voltar
              </button>

              <button
                variant="primary"
                className="btn-green"
                type="submit"
                disabled={registerState.loading}
              >
                {registerState.loading ? "Enviando..." : "Enviar"}
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </MainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    registerState: state.materials.register,
    material: state.materials.materialById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerMaterialRequest: (data, navigate) => {
      dispatch(materialsActions.registerMaterialRequest(data, navigate));
    },
    editMaterialRequest: (id, data, navigate) => {
      dispatch(materialsActions.editMaterialRequest(id, data, navigate));
    },
    getMaterialByIdRequest: (id) => {
      dispatch(materialsActions.getMaterialByIdRequest(id));
    },
    getMaterialByIdClean: () => {
      dispatch(materialsActions.getMaterialByIdClean());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormMaterial);