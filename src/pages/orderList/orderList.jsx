import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import * as ordersActions from "store/orders/actions";
import { useNavigate } from "react-router-dom";

export const OrderList = ({ getOrderListRequest, ordersList }) => {
  let navigate = useNavigate();
  useEffect(() => {
    getOrderListRequest();
  }, [getOrderListRequest]);

  return (
    <>
      {!ordersList.loading && ordersList.success && (
        <Table>
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Codigo do Fabricante</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.clienteFornecedor.nome}</td>
                    <td>{item.dataEntrega}</td>
                    <td>
                      <button
                        className="btn-blue"
                        onClick={() => navigate(`/editar-produto/${item.id}`)}
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
    ordersList: state.orders.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderListRequest: () => {
      dispatch(ordersActions.getOrderListRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
