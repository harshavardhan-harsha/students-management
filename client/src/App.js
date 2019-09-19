import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import About from "./components/layouts/About";
// import Students from "./components/students/Students";
// import EditStudent from "./components/students/EditStudent";
// import AddStudent from "./components/students/AddStudent";
import Students from "./components/students-redux/Students";
import EditStudent from "./components/students-redux/EditStudent";
import AddStudent from "./components/students-redux/AddStudent";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Students} />
              <Route exact path="/about" component={About} />
              <Route exact path="/students/add" component={AddStudent} />
              <Route exact path="/students/edit/:id" component={EditStudent} />
            </Switch>
            <div className="fixed-action-btn">
              <NavLink to="/students/add" className="btn-floating btn-large red">
                <i className="fas fa-plus"> </i>
              </NavLink>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
