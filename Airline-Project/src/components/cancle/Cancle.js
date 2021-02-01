import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
import './Cancle.css' ;
import axios from 'axios';


const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;


const initialState = {
    ticketnumber:"",
    email:"",
    password:"",
    ticketnumberError:"",
    emailError:"",
    passwordError:""

}

export default class Cancle extends Component {
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
      newInfoModel:false ,
        email:'',
        password:''
      
    }

    this.state={
      offset:0,
      tableData:[],
      orgatableBata:[],
      perPage:2,
      currentPage:0,
      loggedIn,
      persons: []

    }
    this.handlePageClick=this.handlePageClick.bind(this);
  }

  handlePageClick=(e)=>{
    const selectedPage=e.selected;
    const offset=selectedPage*this.state.perPage;
    this.setState({
      currentPage:selectedPage,
      offset: offset
    },()=>{
      this.loadMoreData()
    })

    this.setState({
      currentPage: selectedPage,
      offset: offset
    },()=>{
      this.loadMoreData()
    });
  };

  loadMoreData(){
    const data = this.state.orgatableData;

    const slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
    this.setState({
      pageCount:Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  }

componentDidMount(){
this.getData();
}

getData(){

}

  home=(e)=>
  {
    localStorage.removeItem("token")
  }


    state = initialState;
    handleChange = (event) => {
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
      let emailError="";
      let passwordError="";
  
      if(!emailValidator.test(this.state.email))
    {
      emailError = 'enter valid email';
    }

    if(!(this.state.email)) {
      emailError = 'enter your email';
    }

    if(!passwordValidator.test(this.state.password))
    {
      passwordError = 'Password at least 6 characters, 1 number, 1 upper and 1 lowercase'
    }

    if(!(this.state.password)) {
      passwordError = 'enter your password';
    }
  
      if(emailError || passwordError){
        this.setState({emailError, passwordError});
        return false;
      }
      return true;
    }
  
    handleSubmit = (event,id) => {
      event.preventDefault();
      const isValid = this.validate();
      if(isValid){
      console.log(this.state);
      //window.location.href="/Cancle";
      //console.log(this.state);
      

      axios.get(`https://localhost:44341/api/book?mail=${this.state.email}`)
      .then(res => {
        const data=res.data;
        const slice=data.slice(this.state.offset, this.state.offset+this.state.perPage)
    
        this.setState({
          pageCount: Math.ceil(data.length/this.state.perPage),
          orgatableData:res.data,
          tableData:slice
        })
          this.setState(initialState);
      })


      }
    };
    
    render() {
      const {email, password}=this.state

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
              <Link id="hover" to="/flightschedule" class="nav-link" href="#" style={{ marginLeft:"60px"}}>Flight Schedule </Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
              <Link id="hover"class="nav-link active" href="#">Cancle Ticket</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span> 
              <Link to="/ContactUs" id="hover" className="hover" class="nav-link" href="#">Contact Us</Link>
              <Link to="/home" onClick={this.home} id="hover"class="nav-link " href="#" style={{marginLeft:"750px"}}>Logout</Link>
             </div>
            </div>
              </nav>
                <form id="loginform" class="rounded" onSubmit={this.handleSubmit}>
                <h3 id="logidhead"><span><img id="kqcan" src="\Images\kq.png" alt=""/></span>Ticket Cancellation form</h3>
                    <div class="form-group ">
                        <label for="exampleInputEmail1">Email*</label>
                        <input type="text" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="-- enter your  Email  --"
                        name="email" value={this.state.email} onChange={this.handleChange} value={email}/>
                         <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
                    </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password*</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"placeholder="-- enter your password --" style={{background:"transparent"}}
                    name="password" value={this.state.password} onChange={this.handleChange} value={password}/>
                    <div style={{color:"red", fontSize:12}}>{this.state.passwordError}</div>
                </div>
                <button id="loginbtn" type="submit" className="btn btn-light btn-outline-secondary">Cancel Ticket</button>
            </form>

            
                      <div id="table3">
                      <h4 id="ticcan">Ticket Details</h4>
<table class="table table-hover" >

<thead>
<tr>
<th scope="col" >Ticket_Number</th>
<th scope="col" >Email</th>
  <th scope="col" >Flight_Id</th>
  <th scope="col" >Flight_Name</th>
  <th scope="col" >Flying_From</th>
  <th scope="col" >Flight_To</th>
  <th scope="col" >Delete</th>
  {/* <th scope="col" >Details</th> */}
</tr>
</thead>
<tbody>
{this.state.tableData.map(item=>{
    return <tr key={item.ticketnumber}>
       <td>{item.ticketnumber}</td>
       <td>{item.email}</td>
      <td>{item.flightid}</td>
        <td>{item.flightname}</td>
        <td>{item.ffrom}</td>
        <td>{item.fto}</td>  
                  <td><Link type="Submit" onClick={ this. clickButton=()=>{
                                 
      window.confirm("Cancle Your ticket??")
      fetch('https://localhost:44341/api/Book/'+item.ticketnumber,{
        method:'DELETE',
        headers:{'Accept':'application/json',
        'Content-Type':'application/json'
      }
      })

  axios.post('https://localhost:44341/api/tcancle/Post', {
                                                          ticketnumber:item.ticketnumber,
                                                          email:item.email,
                                                          flightid:item.flightid,
                                                          flightname:item.flightname,
                                                          ffrom:item.ffrom,
                                                          fto:item.fto,
                                                        })  
                                                          .then(json => {  
                                                           window.alert("Your Ticket is Cancled..")
                                                           window.location.href="/cancle";
                                                          })  
                                                        }} class="btn btn-outline-success btn-sm">Delete</Link></td>                                                                          
          </tr>
        })}
          
</tbody>
</table> 
          </div>

            <nav id="navbar4" className="navbar navbar-light bg-danger">
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



