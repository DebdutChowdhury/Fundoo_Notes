import './App.css';
import Login from './Component/Login/Login';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Registration from './Component/Registration/Registration';
import Dashboard from './Pages/Dashboard/Dashboard';
import GetNote from './Component/GetNote/GetNote';
import Archive from './Component/ArchiveNotes/Archive';
import ReminderPop from './Component/ReminderPop/ReminderPop';
import ProtectedRoute from './ProtectedRoute';
import AuthRout from './AuthRout';

const Routing = () => {
  return (
    <Router>
      <div>
        <Switch>
        
          <AuthRout exact path="/" component={Registration}></AuthRout>
          <AuthRout path = "/login" component={Login}></AuthRout> 
          <ProtectedRoute path="/dashboard" component={Dashboard} />
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

