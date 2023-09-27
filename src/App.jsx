import Routers from "routes/routers";
import "./app.scss";
import Header from "components/header/header";
// import Login from "pages/login/login";

function App() {
  // TO DO: Login auth
  return (
    <>
      {/* <Login /> */}

      <Header />
      <Routers />
    </>
  );
}

export default App;
