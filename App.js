import {BrowserRouter as Router, Route} from "react-router-dom";
import CategoryInterface from './Component/CategoryInterface';
import SubCategory from './Component/SubCategory';
import DisplayAllCategories from './Component/DisplayAllCategories';
import DisplayAllSubCategories from './Component/DisplayAllSubCategories';
import AdminDashBoard from './Component/AdminDashBoard';
import AdminSignup from "./Component/AdminSignup";
import AdminLogin from "./Component/AdminLogin";
import Home from "./Component/ClientView/Home";
import ConsoleList from "./Component/ClientView/ConsoleList";
import ProductView from "./Component/ClientView/ProductView";
import ConsoleProductView from "./Component/ClientView/ConsoleProductView";
import SubConsolePicture from "./Component/SubConsolePicture";


function App(props) {
  return (
    <div>
    <Router>
      <Route
      strict
      exact
      component={CategoryInterface}
      path="/categoryinterface"
      history={props.history}
      >      
      </Route>
      <Route
      strict
      exact
      component={SubCategory}
      path="/subcategory"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={DisplayAllCategories}
      path="/displayallcategory"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={DisplayAllSubCategories}
      path="/displayallsubcategory"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={AdminDashBoard}
      path="/admindashboard"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={AdminSignup}
      path="/adminsignup"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={AdminLogin}
      path="/adminlogin"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={Home}
      path="/home"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={ConsoleList}
      path="/consolelist"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={ProductView}
      path="/productview"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={ConsoleProductView}
      path="/consoleproductview"
      history={props.history}
      ></Route>
      <Route
      strict
      exact
      component={SubConsolePicture}
      path="/subconsolepicture"
      history={props.history}
      ></Route>
    </Router>
    </div>
   
  );
}

export default App;
