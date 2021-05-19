import './App.css';
import Login from './Component/Login/Login';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Registration from './Component/Registration/Registration';

const Routing = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path = "/Registration" component={Registration}></Route>         
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <BrowserRouter> <Routing/> </BrowserRouter>
  );
}

export default App;

