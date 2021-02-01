import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
import './FlightSchedule.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate'



const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const flightidValidator=/^[0-9]{2,5}$/;
const flightnameValidator=/^[a-zA-Z ]{3,25}$/;

const initialState = {
      from :"",
      to:"",
      depature:"",
      fromError:"",
      toError:"",
      depatureError:""
}


const initialStates = {
  email :"",
  flightid:"",
  flightname:"",
  ffrom:"",
  fto:"",
  emailError:"",
  flightidError:"",
  flightnameError:"",
  ffromError:"",
  ttoError:"",
  
}
export default class FlightSchedule extends Component {

  constructor(props)
  {
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
      from:'',
      to:'',
      depature:'',
      arrival:''
    }

    this.state={
      ffrom:'',
      fto:'',
      email:'',
      flightid:'',
      flightname:''
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
    let fromError= "";
    let toError="";
    let depatureError=""

    if(!this.state.from){
      fromError = 'select from feald'
    }

    if(!this.state.to){
      toError = 'select to feald'
    }

    if(!this.state.to){
      depatureError = 'select to feald'
    }

    if(fromError || toError || depatureError){
      this.setState({fromError, toError, depatureError});
      return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
      //window.location.href="/fdetails";
      console.log(this.state);
    //clear form

    axios.get(`https://localhost:44341/api/flight?from=${this.state.from}&to=${this.state.to}`)
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
  //   axios.post(`https://localhost:44341/api/Journey`,this.state)
  //   .then(response=>{
  //     window.location.href="/FDetails";
  //     })
  //   .catch(error=>{
  //     window.alert("Some Internal Error... Sorry For Inconvenience.")
  //   })
  //  this.setState(initialState);
    }
  };



  state = initialStates;
  handleChanges = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
      ? event.target.checked
      :event.target.value
    });
  };

  validates = () => {
    let emailError="";
    let flightidError="";
    let flightnameError="";
    let ffromError= "";
    let ftoError="";


    if(!flightidValidator.test(this.state.flightid))
    {
      flightidError = 'enter valid flightId';
    }

    if(!this.state.flightid){
      flightidError = 'enter flightId '
    }

    if(!flightnameValidator.test(this.state.flightname))
    {
      flightnameError = 'enter valid flightName';
    }

    if(!this.state.flightname){
      flightnameError= 'enter flightName'
    }

    if(!this.state.ffrom){
      ffromError = 'select from feald'
    }

    if(!this.state.fto){
      ftoError = 'select to feald'
    }

    if(!emailValidator.test(this.state.email))
    {
      emailError = 'enter valid email';
    }

    if(!(this.state.email)) {
      emailError = 'enter your email';
    }

    if(ffromError || ftoError || flightidError || flightnameError || emailError ){
      this.setState({ffromError, ftoError, emailError, flightidError,flightnameError});
      return false;
    }
    return true;
  }

  handleSubmits = event => {
    event.preventDefault();
    const isValids = this.validates();
    if(isValids){
      //window.location.href="/fdetails";
      console.log(this.state);
    //clear form 
    axios.post(`https://localhost:44341/api/book`,this.state)
    .then(response=>{
      window.alert("Your Flight Successfully Booked.... Thank You.")
      window.location.href="/payment";
    })
    .catch(error=>{
      window.alert("Some Internal Error... Sorry For Inconvenience.")
    })
    this.setState(initialStates);
    }
  };

    render() {
      const {ffrom , fto, email, flightid, flightname}=this.state

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
                    <Link to="/flightschedule" id="hover" class="nav-link active" href="#" style={{ marginLeft:"60px"}}>Flight Schedule  </Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
                    <Link to="/cancle" id="hover" class="nav-link " href="#" tabindex="-1" aria-disabled="true">Cancle Ticket</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
                    <Link to="/ContactUs" id="hover" className="hover" class="nav-link" href="#">Contact Us</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span> 
                    <Link to="/payment" id="hover" class="nav-link " href="#">Make Payment </Link>
                    <Link to="/home" id="hover" onClick={this.home} class="nav-link" href="#" style={{marginLeft:"530px"}}>Logout</Link>
                  </div>
                </div>
                </nav>
                <div id="flex2">
                    <div>
                      <form id="flightform" Class="rounded"  onSubmit={this.handleSubmit}>
                      <h4 id="flight"><span><img id="kq1" src="\Images\kq.png" alt="" ></img></span>Search your Flight</h4>
                          <div>
                          <label>Flying From*</label>
                          <select className="form-control" name="from" value={this.state.from}  onChange={this.handleChange}>
                          <option selected>Choose...</option>
                                <option>Kerala</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Lucknow</option>
                                <option>Goa</option>
                                <option>Jaipur</option>
                                <option>Chennai</option>
                                <option>Ranchi</option>
                                <option>Hydrabad</option>
                                <option>Varanasi</option>
                                <option>Kolkata</option>
                                <option>Gandhinagar</option>
                                <option>Delhi</option>
                                <option>Lucknow</option>
                                <option>Nagapur</option>
                            </select>
                            <div style={{color:"red", fontSize:12}}>{this.state.fromError}</div>
                          </div>

                          <div>
                          <label>Flying To*</label> 
                            <select className="form-control" name="to" value={this.state.to} onChange={this.handleChange}>
                            <option selected>Choose...</option>
                                <option>Kerala</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Lucknow</option>
                                <option>Goa</option>
                                <option>Jaipur</option>
                                <option>Chennai</option>
                                <option>Ranchi</option>
                                <option>Hydrabad</option>
                                <option>Varanasi</option>
                                <option>Kolkata</option>
                                <option>Gandhinagar</option>
                                <option>Delhi</option>
                                <option>Lucknow</option>
                                <option>Nagapur</option>
                            </select>
                            <div style={{color:"red", fontSize:12}}>{this.state.toError}</div>
                          </div>
                          <div>
                            <lable >Depature Date*</lable>
                              <input style={{marginTop:"9px"}} id="depature" className="form-control " type="text" name="depature" value={this.state.depature} onChange={this.handleChange}/>
                              <div style={{color:"red", fontSize:12}}>{this.state.depatureError}</div>
                          </div>
                          <div>
                            <lable>Return Date</lable>
                            <input style={{marginTop:"9px"}} id="return" className="form-control" name="return" type="text" />
                          </div>
                          <button id="hbtn" type="submit" className="btn btn-light btn-outline-secondary" onClick={this.getData()}>Search</button>
                       </form>
                        </div>
                      <div>
                      <div id="table5">

<table class="table table-hover" >
<thead>
<tr>
<th scope="col" >Flight_ID</th>
  <th scope="col" >Flight_Name</th>
  <th scope="col" >Flying_From</th>
  <th scope="col" >Flying_To</th>
  <th scope="col" >From_Time</th>
  <th scope="col" >To_Time</th>
  <th scope="col" >Ticket_Price</th>
</tr>
</thead>
<tbody>
{this.state.tableData.map(item=>{
    return <tr key={item.flightid}>
      <td>{item.flightid}</td>
        <td>{item.flightname}</td>
        <td>{item.ffrom}</td>
        <td>{item.fto}</td>
          <td>{item.ftime}</td>
          <td>{item.ttime}</td>
          <td>{item.tprice}</td>                                                                           
          </tr>
        })}
          
</tbody>
</table> 

         <div id="Pagination" style={{color:"red", margin:"10px 30px 0px 250px", padding:"20px"}}>
         <ReactPaginate 
            PreviousLable={"prev"}
            nextLable={"next"}
            breakLable={"...."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={20}
            pageRangeDisplayed={51}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
               />
            </div>
          </div>
<div>
          <div class="card bg-white text-white" id="bookform">
  <div class="card-img-overlay">
  <form id="formbook" onSubmit={this.handleSubmits}>
  <h4 id="flight"><span><img id="kq1" src="\Images\kq.png" alt="" ></img></span>Book your Flight</h4>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputEmail4">Email*</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Email" name="email" value={this.state.email} value={email} onChange={this.handleChanges}/>
      <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
    </div>
    <div class="form-group col-md-4">
      <label for="inputPassword4">Flight_ID*</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Flight_Id" name="flightid" value={this.state.flightid} value={flightid} onChange={this.handleChanges}/>
      <div style={{color:"red", fontSize:12}}>{this.state.flightidError}</div>
    </div>
    <div class="form-group col-md-4">
      <label for="inputPassword4">Flight_Name*</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Flight_Name" name="flightname" value={this.state.flightname} value={flightname} onChange={this.handleChanges}/>
      <div style={{color:"red", fontSize:12}}>{this.state.flightnameError}</div>
    </div>
  </div>

  <div class="form-row">
  <div class="form-group col-md-4">
      <label for="inputState">Flying_From*</label>
      <select id="inputState" class="form-control" name="ffrom" value={this.state.ffrom} value={ffrom} onChange={this.handleChanges}>
        <option selected>Choose...</option>
        <option>Kerala</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Lucknow</option>
                                <option>Goa</option>
                                <option>Jaipur</option>
                                <option>Chennai</option>
                                <option>Ranchi</option>
                                <option>Hydrabad</option>
                                <option>Varanasi</option>
                                <option>Kolkata</option>
                                <option>Gandhinagar</option>
                                <option>Delhi</option>
                                <option>Lucknow</option>
                                <option>Nagapur</option>
        <option>...</option>
      </select>
      <div style={{color:"red", fontSize:12}}>{this.state.ffromError}</div>
    </div>

    <div class="form-group col-md-4">
      <label for="inputState">Flying_To*</label>
      <select  class="form-control" name="fto" value={this.state.fto} value={fto} onChange={this.handleChanges}>
        <option selected>Choose...</option>
        <option>Kerala</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Lucknow</option>
                                <option>Goa</option>
                                <option>Jaipur</option>
                                <option>Chennai</option>
                                <option>Ranchi</option>
                                <option>Hydrabad</option>
                                <option>Varanasi</option>
                                <option>Kolkata</option>
                                <option>Gandhinagar</option>
                                <option>Delhi</option>
                                <option>Lucknow</option>
                                <option>Nagapur</option>
        <option>...</option>
      </select>
      <div style={{color:"red", fontSize:12}}>{this.state.ftoError}</div>
    </div>
    <div class="form-group col-md-4">
      <button id="bbtn" type="submit" className="btn btn-light btn-outline-secondary">Book Flight</button>
    </div>
  </div>
</form> 
  </div>
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


