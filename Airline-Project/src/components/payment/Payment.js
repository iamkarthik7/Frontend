import React, { Component } from 'react'
import { Link ,Redirect} from 'react-router-dom'
import './Payment.css'
import axios from 'axios'

const nameValidator= /^[a-zA-Z ]{3,50}$/;
const cardValidator= /^[0-9]{16}$/;
const cvvValidator= /^[0-9]{3,4}$/;
const monthValidator= /^[0-9]{1,2}$/;
const yearValidator= /^[0-9]{4}$/;

const initialState = {
  name :"",
  card:"",
  cvc:"",
  month:"", 
  year:"",
  nameError:"",
  cardError:"",
  cvcError:"",
  monthError:"",
  yearError:""

}


export default class Payment extends Component {

  constructor(props)
  {
    super(props)
    const token =localStorage.getItem("token")

    let loggedIn = true
    if(token==null){
      loggedIn=false
    }
    this.state={
      loggedIn,

      name:'',
      card:'',
      cvc:'',
      month:'',
      year:''
    }
  }

  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
      ? event.target.checked
      :event.target.value
    });
  };


  home=(e)=>
  {
    localStorage.removeItem("token")
  }

  validate = () => {
    let nameError= "";
    let cardError="";
    let cvcError="";
    let monthError="";
    let yearError="";

    if(!nameValidator.test( this.state.name)) {
      nameError = "enter valid card name";
    }

    if(!(this.state.name)) {
      nameError = 'enter your name';
    }

    if(!cardValidator.test(this.state.card)) {
      cardError = "enter valid card number";
    }

    if(!(this.state.card)) {
      cardError = 'enter your card number';
    }

    if(!cvvValidator.test( this.state.cvc)) {
      cvcError = "enter valid cvc";
    }

    if(!(this.state.cvc)) {
      cvcError = 'enter your cvc';
    }

    if(!monthValidator.test(this.state.month)) {
      monthError = "enter valid month";
    }

    if(!(this.state.month<=12 )) {
      monthError = 'month must 1 - 12';
    }
    
    if(!yearValidator.test(this.state.year)) {
      yearError = "enter valid year";
    }

    if(!(this.state.year)) {
      yearError = 'enter year';
    }

    if(cardError || nameError || cvcError || monthError || yearError){
      this.setState({cardError, nameError, cvcError, monthError, yearError});
      return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
    console.log(this.state);
    //clear form
    axios.post(`https://localhost:44341/api/Payment`,this.state)
    .then(response=>{
      window.alert("Payment Successfully Completed.... Thank You.")
      window.location.href="/Payment";
    })
    .catch(error=>{
      window.alert("Some Internal Error... Sorry For Inconvenience.")
    })
    
    this.setState(initialState);
    }
  };


    render() {
      const {name,card, cvc,month, year}=this.state
      if(this.state.loggedIn===false){
        return <Redirect to="/payment" />
      }
        return (
            <div>
          <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link exact to="/flightschedule" id="hover" class="nav-link " href="#" style={{ marginLeft:"60px"}}>Flight Schedule</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
                <Link to="/cancle" id="hover" class="nav-link " href="#" tabindex="-1" aria-disabled="true">Cancle Ticket</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
                <Link to="/ContactUs" id="hover" className="hover" class="nav-link" href="#">Contact Us</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span> 
                <Link to="/payment" id="hover" class="nav-link active" href="#" >Make Payment </Link>
                <Link to="/home" onClick={this.home} id="hover"class="nav-link " href="#" style={{marginLeft:"600px"}}>Logout</Link>
              </div>
            </div>
          </nav>

          <div id="payflex">
            <div>
             <form id="Paymentform" Class="rounded" onSubmit={this.handleSubmit}>
                 <h3 id="paymenthead"><span><img id="kq1" src="\Images\kq.png" alt=""></img></span>Make Payment Here</h3>
             <div class='form-row'>
            <div class='col-xs-12 form-group required'>
                <label>Name on Card</label>
                <input type="text" class="form-control" name="name" value={this.state.name} value={name} onChange={this.handleChange}/>
                <div style={{color:"red", fontSize:12}}>{this.state.nameError}</div>
            </div>
            </div>
            <div class='form-row'>
            <div class='col-xs-12 form-group required'>
                <label>Card Number</label>
                <input type="text" class="form-control" name="card" value={this.state.card} value={card} onChange={this.handleChange}/>
                <div style={{color:"red", fontSize:12}}>{this.state.cardError}</div>
            </div>
            </div>
            <div id="flexpayment">
            <div style={{marginRight:"10px"}}>
            <label >CVC</label>
                <input class='form-control'placeholder='ex. 311' style={{marginRight:"55px"}} type='text' name="cvc" value={this.state.cvc} value={cvc} onChange={this.handleChange}/>
                <div style={{color:"red", fontSize:12}}>{this.state.cvcError}</div>
            </div>
            <div style={{marginRight:"10px"}}>
            <label >Expiration</label>
                <input class='form-control'placeholder='MM' style={{marginRight:"95px"}} type='text' name="month" value={this.state.month} value={month} onChange={this.handleChange}/>
                <div style={{color:"red", fontSize:12}}>{this.state.monthError}</div>
            </div>
            <div style={{marginTop:"7px"}}>
                <label>  </label>
                <input class='form-control'placeholder='YYYY' style={{marginRight:"125px"}}  type='text' name="year" value={this.state.year} value={year} onChange={this.handleChange}/>
                <div style={{color:"red", fontSize:12}}>{this.state.yearError}</div>
            </div>
            </div>
            <div class='form-row'>
              <div class='col-md-12 form-group' >
                <div class='form-control btn btn-info' style={{marginTop:"20px",color:"black",border:"1px solid darkgray"}}>
                  <span class='amount'>So Glad to see you here... Thank You</span>
                </div>
              </div>
            </div>
            <div class='form-row'>
              <div class='col-md-12 form-group'>
                <button class='form-control btn btn-primary submit-button'style={{color:"black",border:"1px solid darkgray"}} type='submit'>Pay » ClickHere</button>
              </div>
            </div>
             </form>
          </div>
          <div>
            <img id="payimg" src="\Images\image12.webp" class="card-img" alt="..."/>
          </div>
          </div>

             <nav id="navbar3" className="navbar navbar-light bg-danger">
                <small>
                <span id="navtext"style={{color:"black"}}  className="navbar-text">
                    Copyright 2020 Kartik Airways. All rights reserved
                </span>
                </small>
                <small>
                <span style={{color:"black"}} id="navtext" className="navbar-text">
                    Layout by <span id="karthik" >Karthik.C</span>
                </span>
                </small>
            </nav> 
            </div>
        )
    }
}
