import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Loading from "./Components/Loading/Loading";
import React from "react";

function App() {
  return (
    <div className="App">
        <Router>
            <Loading />
            <NavBar/>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <p>This is home page!</p>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
