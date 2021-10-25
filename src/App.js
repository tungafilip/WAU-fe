import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/login">
                    <Login />
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
