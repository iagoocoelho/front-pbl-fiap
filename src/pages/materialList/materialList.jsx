import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import * as materialsActions from "store/materials/actions";
import { useNavigate } from "react-router-dom";

export const MaterialList = ({ getMaterialListRequest, materialsList }) => {
  let navigate = useNavigate();
  useEffect(() => {
    getMaterialListRequest();
  }, [getMaterialListRequest]);

  return (
    <>
      {!materialsList.loading && materialsList.success && (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {materialsList.data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.fornecedor.nome}</td>
                    <td>{item.codigoFabricante}</td>
                    <td>{item.descricao}</td>
                    <td>{item.custo}</td>
                    <td>
                      <button
                        className="btn-blue"
                        onClick={() =>
                          navigate(`/editar-material/${item.id}`)
                        }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    supplierList: state.suppliers.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSupplierListRequest: () => {
      dispatch(materialsActions.getMaterialListRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);