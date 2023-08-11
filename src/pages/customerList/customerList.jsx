import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import * as customersActions from "store/customers/actions";
import { useNavigate } from "react-router-dom";

export const CustomerList = ({ getCustomerListRequest, customerList }) => {
  let navigate = useNavigate();
  useEffect(() => {
    getCustomerListRequest();
  }, [getCustomerListRequest]);

  return (
    <>
      {!customerList.loading && customerList.success && (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customerList.data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.nome}</td>
                    <td>{item.cpfCnpj}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn-blue"
                        onClick={() =>
                          navigate(`/editar-cliente/${item.id}`)
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
    customerList: state.customers.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerListRequest: () => {
      dispatch(customersActions.getCustomerListRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
