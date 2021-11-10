import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { enable, disable } from "./Redux/loading";
import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Loading from "./Components/Loading/Loading";
import React from "react";
import SettingsForm from "./Components/Settings/SettingsForm/SettingsForm";

function App() {
  const loading = useSelector(state => state.loading.value);
  const dispatch = useDispatch();

  const enableLoadingHandler = (enabled) => {
      dispatch(enabled ? enable() : disable());
  }

  return (
    <div className="App">
        <Router>
            { loading ? <Loading/> : null}
            <NavBar/>
            <Switch>
                <Route path="/login">
                    <Login enableLoading={ enableLoadingHandler }/>
                </Route>
                <Route exact path="/register">
                    <Register enableLoading={ enableLoadingHandler }/>
                </Route>
                <Route path="/settings">
                    <SettingsForm/>
                </Route>
                <Route exact path="/">
                    <p>This is home page!</p>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

App.propTypes = {

};

export default App;
