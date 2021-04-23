import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/home";
import Workflow from "./Components/workflow";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workflow" component={Workflow} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
