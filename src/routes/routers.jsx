import Toast from "components/toast/toast";
import * as authActions from "store/auth/actions";
import Header from "components/header/header";
import { connect } from "react-redux";
import Login from "pages/login/login";
import { useEffect, useRef } from "react";
import PrivateRoutes from "./privateRoutes";
import { useNavigate } from "react-router-dom";

const Routers = ({ verifyTokenRequest, auth_token }) => {
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (auth_token) {
        verifyTokenRequest();
      } else {
        navigate("/");
      }
    }
  }, [auth_token, verifyTokenRequest, navigate]);

  return (
    <>
      {auth_token ? (
        <>
          <Header />

          <PrivateRoutes />
        </>
      ) : (
        <Login />
      )}
      <Toast />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth_token: state.auth.data?.token,
    auth_state: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyTokenRequest: () => {
      dispatch(authActions.verifyTokenRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
