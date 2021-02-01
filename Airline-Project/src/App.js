import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/home/Home'
import ContactUs from './components/contactus/ContactUs';
import FlightSchedule from './components/flightschedule/FlightSchedule';
import Register from './components/register/Register';
//import FDetails from './components/fdetails/FDetails';
import Logout from './components/logout/Logout';
import Cancle from './components/cancle/Cancle';
import Payment from './components/payment/Payment';

function App() {
  return (
    <div>
     <Router>
      <nav id="navbar1"className="navbar navbar-light bg-danger">
        <span id="mainnavbar" className="navbar-brand mb-0 h1" style={{color:"white", fontSize:"25px",paddingLeft:"60px"}} ><b style={{color:"white", fontSize:"30px", paddingRight:"5px"}}>Kartik</b>Airlines</span>
      </nav>
      <Switch>
       <Route exact path="/" component={Home}/>
        <Route path="/contactus" component={ContactUs}/>
        <Route path="/flightschedule" component={FlightSchedule}/>
        <Route path="/register" component={Register}/>
        {/* <Route path="/fdetails" component={FDetails}/>  */}
        <Route path="/logout" component={Logout}/>
        <Route path="/cancle" component={Cancle}/>
        <Route path="/home" component={Home}/>
        <Route path="/payment" component={Payment}/>
      </Switch>
     </Router>
    </div>
  );
}

export default App;
