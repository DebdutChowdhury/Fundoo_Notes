import './App.css';
import Login from './Component/Login/Login';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Registration from './Component/Registration/Registration';
import Dashboard from './Pages/Dashboard/Dashboard';
import GetNote from './Component/GetNote/GetNote';
import Archive from './Component/ArchiveNotes/Archive';
import ReminderPop from './Component/ReminderPop/ReminderPop';

const Routing = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Registration}></Route>
          <Route path = "/login" component={Login}></Route> 
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route path="/dashboard/notes" component={GetNote}></Route>
          <Route exact path="/dashboard/archive" component={Archive}></Route>
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <BrowserRouter> <Routing/> </BrowserRouter>
    // <ReminderPop/>
  );
}

export default App;

