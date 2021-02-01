import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import './ContactUs.css'


const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneValidator= /^[6-9]{1}[0-9]{9}$/;
const nameValidator= /^[a-zA-Z ]{3,20}$/;

const initialState = {
  name :"",
  email:"",
  phonenumber:"",
  message:"",
  nameError:"",
  emailError:"",
  phonenumberError:"",
  messageError:""

}


export default class ContactUs extends Component {
  constructor(props){
    super(props)

    const token =localStorage.getItem("token")

    let loggedIn = true
    if(token==null){
      loggedIn=false
    }
    this.state={
      loggedIn
    }

    this.state={
      name:'',
      email:'',
      phonenumber:'',
      message:''
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
    this.setState({[event.target.name]: event.target.value})
  };


  home=(e)=>
  {
    localStorage.removeItem("token")
  }

  validate = () => {
    let nameError= "";
    let emailError="";
    let phonenumberError="";
    let messageError="";

    if(!nameValidator.test(this.state.name))
    {
      nameError = 'enter valid name';
    }

    if(!emailValidator.test(this.state.email))
    {
      emailError = 'enter valid email';
    }

    if(!phoneValidator.test(this.state.phonenumber))
    {
      phonenumberError = 'enter valid phone number';
    }

    if(!this.state.message)
    {
      messageError='enter your message';
    }

    if(!this.state.name)
    {
      nameError='enter your name';
    }

    if(!this.state.email)
    {
      emailError='enter your email';
    }

    if(!this.state.phonenumber)
    {
      phonenumberError='enter your phone number';
    }
    

    if(emailError || nameError || phonenumberError || messageError){
      this.setState({emailError, nameError, phonenumberError, messageError});
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
    axios.post(`https://localhost:44341/api/contactus`,this.state)
    .then(response=>{
      window.alert("Your Message Successfully Recorded.... Thank You.")
      window.location.href="/contactus";
    })
    .catch(error=>{
      window.alert("Some Internal Error... Sorry For Inconvenience.")
    })
    this.setState(initialState);
    }
  };


    render() {
      const {name, email, phonenumber, message}=this.state

      if(this.state.loggedIn===false){
        return <Redirect to="/flightschedule" />
      }
        return (
            <div>
                <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <Link to="/flightschedule" id="hover" class="nav-link " href="#" style={{ marginLeft:"60px"}}>Flight Schedule </Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
      <Link to="/cancle" id="hover" class="nav-link " href="#" tabindex="-1" aria-disabled="true">Cancle Ticket</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
      <Link to="/contactus" id="hover" class="nav-link active" href="#">Contact Us </Link>
      <Link to="/home" id="hover" onClick={this.home} class="nav-link " href="#" style={{marginLeft:"770px"}}>Logout</Link>
    </div>
  </div>
</nav>
  <div id="contactcard"class="card mb-3" style={{maxWidth: "1140px"}}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img id="verticalimg" src="\Images\image10.webp" class="card-img" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
                <form id="contactform" className="rounded" onSubmit={this.handleSubmit} >
                    <h4 className="card-title1" style={{color:"red", textAlign:"center"}}><span><img id="kq1" src="\Images\kq.png" alt=""/></span>Contact Us </h4>
                    <label>User Name*</label>
                      <input className="form-control " type="text" placeholder="-- enter username --" name="name" value={this.state.name} value={name}  onChange={this.handleChange}/>
                      <div style={{color:"red", fontSize:12}}>{this.state.nameError}</div>
                      <label>E-mail*</label>
                      <input className="form-control " type="text" placeholder="-- enter  email --" name="email" value={this.state.email} value={email} onChange={this.handleChange}/>
                      <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
                      <label>Phone Number*</label>
                      <input  className="form-control " type="text" placeholder="-- enter phone nimber --" name="phonenumber" value={this.state.phonenumber} value={phonenumber} onChange={this.handleChange} />
                      <div style={{color:"red", fontSize:12}}>{this.state.phonenumberError}</div>
                      
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Message*</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="message" placeholder="Enter Here:-" value={this.state.message} value={message} onChange={this.handleChange}></textarea>
                        <div style={{color:"red", fontSize:12}}>{this.state.messageError}</div>
                          </div>
                        <div id="contactbtn">
                   <button style={{color:"black", marginTop:"-10px"}} type="submit" class="btn btn-light btn-outline-secondary">Send Message</button>
                </div>
              </form> 
            </div>
          </div>
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
