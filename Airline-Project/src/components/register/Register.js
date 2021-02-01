import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom';
import './Register.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;
const nameValidator= /^[a-zA-Z ]{3,20}$/;
const phoneValidator= /^[6-9]{1}[0-9]{9}$/;

const initialState =
{
    title:"",
    firstname :"",
    lastname:"",
    dateofbirth:"",
    country:"",
    nation:"",
    email:"",
    cemail:"",
    phno:"",
    password:"",
    cpassword:"",

    titleError:"",
    firstnameError :"",
    lastnameError:"",
    dateofbirthError:"",
    countryError:"",
    nationError:"",
    emailError:"",
    cemailError:"",
    phnoError:"",
    passwordError:"",
    cpasswordError:"",
}


export default class Register extends Component {

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
      title:'',
      firstname:'',
      lastname:'',
      dateofbirth:'',
      nation:'',
      country:'',
      email:'',
      phno:'',
      password:''
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




  validate = () => {
    let titleError="";
    let firstnameError ="";
    let lastnameError="";
    let dateofbirthError="";
    let countryError="";
    let nationError="";
    let emailError="";
    let cemailError="";
    let phnoError="";
    let passwordError="";
    let cpasswordError="";

    if(!this.state.title){
        titleError = "must select the title"
    }
   
    if(!nameValidator.test(this.state.firstname))
    {
      firstnameError = 'enter valid name ';
    }

    if(!(this.state.firstname)) {
      firstnameError = 'enter your name';
    }

    if(!this.state.dateofbirth) {
        dateofbirthError = "select date of birth";
    }

    if(!this.state.country) {
        countryError = "must select your country";
    }

    if(!this.state.nation) {
        nationError = "must select your state";
    }

    if(!emailValidator.test(this.state.email))
    {
      emailError = 'enter valid email';
    }

    if(!(this.state.email)) {
      emailError = 'enter your email';
    }

    if(!(this.state.cemail=== this.state.email)) {
        cemailError = 'email must match';
    }

    if(!(this.state.cemail)) {
      cemailError = 're enter your email';
    }

    if(!phoneValidator.test(this.state.phno))
    {
      phnoError = 'enter valid phone number';
    }

    if(!(this.state.phno)) {
      phnoError = 'enter your phone number';
    }

    if(!passwordValidator.test(this.state.password))
    {
      passwordError = 'password at least 6 characters, 1 number, 1 upper and 1 lowercase'
    }

    if(!(this.state.cpassword === this.state.password)){
        cpasswordError = 'password must match'
    }

    if(!passwordValidator.test(this.state.cpassword)){
      cpasswordError = 'password at least 6 characters, 1 number, 1 upper and 1 lowercase'
    }

    if(!(this.state.cpassword)) {
      cpasswordError = 're enter your passsword';
    }

    if(!(this.state.password)) {
      passwordError = 'enter your password';
    }


    if( titleError || firstnameError || lastnameError || dateofbirthError || countryError || nationError || emailError || cemailError
        || phnoError || passwordError || cpasswordError){
      this.setState({titleError, firstnameError, lastnameError, dateofbirthError, countryError, nationError, emailError, cemailError,
         phnoError, passwordError, cpasswordError});
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
    
      console.log(this.state);


      axios.post(`https://localhost:44341/api/register`,this.state)
      .then(response=>{
        window.alert("Registration Success .... Thank You.")
        window.location.href="/home";
      })
      .catch(error=>{
        window.alert("Some Internal Error... Sorry For Inconvenience.")
        window.location.href="/home";
      })

    
    this.setState(initialState);
    }
  };



    render() {
      const {title, firstname, lastname, dateofbirth,nation,country,email,phno,password}=this.state
      if(this.state.loggedIn===false){
        return <Redirect to="/" />
      }
        return (
            <div>
                <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link id="hover"exact to="/" class="nav-link " href="#" style={{ marginLeft:"55px"}}>Home</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
              <Link id="hover" class="nav-link active" href="#">Register</Link>
              <Link to="/home" id="hover" class="nav-link" href="#" style={{marginLeft:"950px"}}>Logout</Link>
             </div>
          </div>
            </nav>
                <form id="formreg" class="rounded" onSubmit={this.handleSubmit}>
                <h3 id="reghead"><span><img id="kq1" src="\Images\kq.png" alt=""></img></span>Kartik Membership Registration</h3>
                <div id="firstline">
                      <div class="col"> 
                      <label for="select">Title*</label>
                        <select class="form-control col-md-15" name="title" value={this.state.title} value={title} onChange={this.handleChange}>
                            <option>Title</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Miss.</option>
                        </select>
                        <div style={{color:"red", fontSize:12}}>{this.state.titleError}</div>
                      </div>

                    <div class="col">
                    <label for="exampleInputEmail1">First Name*</label>
                        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="-- enter your first name --" name="firstname" value={this.state.firstname} value={firstname} onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.firstnameError}</div>
                    </div>

                    <div class="col">
                        <label for="inputEmail4">Last Name</label>
                        <input type="text" class="form-control col-md-15" placeholder="-- enter your last name --" name="lastname" value={this.state.lastname} value={lastname} onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.lastnameError}</div>
                    </div>
             </div>

             <div id="secondline">
             <div class="col">
                    <label for="exampleInputEmail1">Date of Birth*</label>
                        <input id="rdate" type="date" class="form-control "  placeholder="-- enter your first name --" name="dateofbirth" value={this.state.dateofbirth} value={dateofbirth}  onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.dateofbirthError}</div>
                    </div>

                    <div class="col"> 
                      <label for="select">Nationality*</label>
                        <select class="form-control col-md-15" name="nation" value={this.state.nation} value={nation}  onChange={this.handleChange}>
                            <option>-- Select Country of Origin --</option>
                                <option>Afghanistan</option>
                                <option>Armenia	</option>
                                <option>Australia</option>
                                <option>Bangladesh</option>
                                <option>India</option>
                        </select>
                        <div style={{color:"red", fontSize:12}}>{this.state.nationError}</div>
                      </div>

                      <div class="col"> 
                      <label for="select">Residence State*</label>
                        <select class="form-control col-md-15" name="country" value={this.state.country} value={country} onChange={this.handleChange}>
                            <option>-- Select Stste of Residence --</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chhattisgarh</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                        </select>
                        <div style={{color:"red", fontSize:12}}>{this.state.countryError}</div>
                      </div>
                </div>


                <div id="thirdline">
             <div class="col">
             <label for="exampleInputEmail1">Email address*</label>
             <input type="text" class="form-control " aria-describedby="emailHelp" placeholder="-- enter your E-mail --" name="email" value={this.state.email} value={email} onChange={this.handleChange}/>
             <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
                    </div>
                    <div class="col">
                    <label for="exampleInputEmail1">Confirm Email address*</label>
                        <input type="text" class="form-control " aria-describedby="emailHelp" placeholder="-- re-enter your E-mail --" name="cemail" value={this.state.cemail}  onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.cemailError}</div>
                    </div>
                    <div class="col">
                    <label for="inputEmail4">Phone Number*</label>
                        <input type="text" class="form-control col-md-15"  placeholder="-- enter your phoneNumber --" name="phno" value={this.state.phno} value={phno} onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.phnoError}</div>
                    </div>
                </div>


                <div id="fourthline">
             <div class="col">
                    <label for="inputEmail4">Password*</label>
                        <input type="password" class="form-control col-md-13" placeholder="-- enter your password --" name="password" value={this.state.password} value={password} onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.passwordError}</div>
                    </div>
                    
                    <div class="col">
                    <label for="inputEmail4">Confirm Password*</label>
                        <input type="password" class="form-control col-md-13" placeholder="-- re-enter your password --" name="cpassword" value={this.state.cpassword} onChange={this.handleChange}/>
                        <div style={{color:"red", fontSize:12}}>{this.state.cpasswordError}</div>
                    </div>
                </div>

                <div id="button1">
                <button id="btn1" type="submit" class="btn btn-outline-secondary">Register</button>
                    </div>
            </form>
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



