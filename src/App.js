import './App.css';
import Login from './Component/Login/Login';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Registration from './Component/Registration/Registration';
import Dashboard from './Pages/Dashboard/Dashboard';

const Routing = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Registration}></Route>
          <Route path = "/login" component={Login}></Route> 
          <Route exact path="/dashboard" component={Dashboard}></Route>        
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

