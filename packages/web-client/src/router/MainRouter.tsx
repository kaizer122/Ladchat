import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ApolloProvider from "../ApolloProvider";
import HomePage from "../pages/HomePage";
import Logout from "../pages/Logout";
import Register from "../pages/Register/Register";
import Signin from "../pages/Signin";
import { Path } from "./modules/constants";
import PrivateRoute from "./PrivateRoute";

const MainRouter: React.FC = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path={Path.SIGNIN} component={Signin} />
      <Route path={Path.REGISTER} component={Register} />

      <ApolloProvider>
        <PrivateRoute>
          <Route path={Path.HOME} component={HomePage} />
          <Route path={Path.SIGNOUT} component={Logout} />
        </PrivateRoute>
      </ApolloProvider>
    </Switch>
  </Router>
);

export default MainRouter;
