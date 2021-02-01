import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
import './Home.css'
import axios from 'axios'


const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

const initialState = {
  email:"",
  password:"",
  emailError:"",
  passwordError:""

}

export default class Home extends Component {
  constructor(props){
    super(props)

    const token =localStorage.getItem("token")
    let loggedIn = true
    if(token==null){
      loggedIn=false
    }

    this.state = {
      Email:'',
       Password: '',
 loggedIn
         }

         this.Email = this.handleChange.bind(this);
         this.Password = this.handleChange.bind(this);
  }
  email(event) {

    this.setState({ Email: event.target.value })

}
password(event) {

    this.setState({ Password: event.target.value })

}
  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
      ? event.target.checked
      :event.target.value
    });
    this.setState({
      [event.target.name]:event.target.value
    })
  };
  
  validate = () => {
    let emailError="";
    let passwordError="";

    if(!emailValidator.test(this.state.email))
    {
      emailError = 'please enter valid email';
    }

    if(!passwordValidator.test(this.state.password))
    {
      passwordError = 'Password at least 6 characters, 1 number, 1 upper and 1 lowercase'
    }

    if(!(this.state.email)) {
      emailError = 'enter your email';
    }

    if(!(this.state.password)) {
      passwordError = 'enter your passsword';
    }

    if(emailError  || passwordError){
      this.setState({emailError, passwordError});
      return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
     //window.location.href="/flightschedule";
      console.log(this.state);
    //clear form

    debugger;
    fetch('https://localhost:44341/api/register/Login', {
    method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Email: this.state.email,
            Password: this.state.password
        })
    }).then((Response) => Response.json())
        .then((result) => {
            console.log(result);
            if (result.Status == 'Invalid')
                alert('Invalid email or password');
            else{
              localStorage.setItem("token","qwertyuiopasdfghjkl")
      this.setState({
        loggedIn:true
      })
      this.setState(initialState);
            }
        })
    }
  };

    render() {
      if(this.state.loggedIn){
        return <Redirect to="/flightschedule"/>
      }
        return (
                <div>
                  <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <span>< img style={{ marginLeft:"60px"}} id="kq1" src="\Images\kq.png" alt="" /></span>
                      <Link className="hover" id="hover" exact to="/" class="nav-link active" href="#" >Home</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
                      <Link to="/Register" id="hover" class="nav-link" href="#">Register <span style={{marginLeft:"7px"}}></span></Link>                    </div>
                    </div>
                  </nav>
                  <h1 id="head1"><span><img id="kq" src="\Images\kq.png" alt="" ></img></span><b>Book Your Flight With Us</b></h1>
                <div id="flex1">
                  <div>

                  <div class="card w-135" id="homepara">
                    <div class="card-body">
                      <h5 class="card-title" style={{color:"red"}}><span><img id="kq1" src="\Images\kq.png" alt=""></img></span>Kartik Airlines</h5>
                      <p class="card-text" >Kartik Airlines is aimed at bringing the best in air travels to you. Our outstanding
                        records among airlines makes us achieve this. Our staff members are adequate and loyal. We are aimed at giving you best services</p>
                    </div>
                  </div>
                    <div id="imgflex">
                        <img id="himage" src="\Images\image4.jpg" alt=""></img>
                    </div>
                </div>
                <form id="hform" className="rounded" onSubmit={this.handleSubmit} >
                    <h4 className="card-title1" style={{color:"red", textAlign:"center",marginBottom:"30px"}}><span><img id="kq1" src="\Images\kq.png" alt="" /></span>Login page </h4>
                      <label>E-mail</label>
                      <input className="form-control " type="text" placeholder="-- enter  email --" name="email" value={this.state.email} onChange={this.Email} onChange={this.handleChange}   />
                      {/* onChange={(e)=>{this.setState({email:e.target.value})}}/> */}
                      <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
                      <label>Password</label>
                      <input  className="form-control " type="password" placeholder="-- enter password --" name="password" value={this.state.password} onChange={this.Password} onChange={this.handleChange}  />
                       {/* onChange={(e)=>{this.setState({password:e.target.value})}}/> */}
                      <div style={{color:"red", fontSize:12}}>{this.state.passwordError}</div>

                      <button id="hbtn" type="submit" className="btn btn-light btn-outline-secondary" >Login</button>
                      {/* onClick={()=>this.login()} */}

                      <p id="link1">Registration Page?:<Link to="register" id="linkkk"> Click Here</Link> </p>
                </form> 
              </div>

              <section id="our">
                <div class="container my-3 py-5 text-center" >
                <div>
                <div id="display">
                  <div class="col-lg-3 col-md-6">
                    <div class="card">
                      <div class="card-body">
                        <img src="\Images\economy.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
                        <h5>Economy Class</h5>
                        <p>
                        Standard Economy Class fares offer the best value for money and often include benefits
                         such as complimentary meals and beverages. 
                        </p>
                      </div>
                    </div>
                  </div>
                
                  <div class="col-lg-3 col-md-6">
                    <div class="card">
                      <div class="card-body">
                        <img src="\Images\premium.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
                        <h5>Premium Economy</h5>
                        <p>
                        Premium Economy flights bridge the gap between Economy cabins and Business Class comforts, 
                        with premium seating and various other benefits.
                        </p>
                      </div>
                    </div>
                  </div>
                          
                  <div class="col-lg-3 col-md-6">
                    <div class="card">
                      <div class="card-body">
                        <img src="\Images\business.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
                        <h5>Business Class</h5>
                        <p>
                        Space and convenience are at the forefront of Business Class cabins,
                         allowing passengers to continue working while on board.
                        </p>
                      </div>
                    </div>
                  </div>

                <div class="col-lg-3 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <img src="\Images\first.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
                      <h5>First Class</h5>
                        <p>
                        First Class travel offers more space,
                         premium menus and larger seats that generally convert to fully flat beds for optimal comfort.
                        </p>
                      </div>
                  </div>
                </div>
              </div>              
              </div>
            </div>
          </section>

           <div>
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
          </div>
        )
    }
}




















//-------------------------- Second Hkome---------------------






// import React, { Component } from 'react'
// import { Link,Redirect } from 'react-router-dom'
// import './Home.css'
// import axios from 'axios'


// const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

// const initialState = {
//   email:"",
//   password:"",
//   emailError:"",
//   passwordError:""

// }

// export default class Home extends Component {
//   constructor(props){
//     super(props)

//     this.state = {
//       Email:'',
//        Password: ''
 
//          }

//          this.Email = this.handleChange.bind(this);
//          this.Password = this.handleChange.bind(this);
//   }
//   email(event) {

//     this.setState({ Email: event.target.value })

// }
// password(event) {

//     this.setState({ Password: event.target.value })

// }


//   state = initialState;
//   handleChange = event => {
//     const isCheckbox = event.target.type === "checkbox";
//     this.setState({
//       [event.target.name]: isCheckbox
//       ? event.target.checked
//       :event.target.value
//     });
//     this.setState({
//       [event.target.name]:event.target.value
//     })
//   };
  
//   validate = () => {
//     let emailError="";
//     let passwordError="";

//     if(!emailValidator.test(this.state.email))
//     {
//       emailError = 'please enter valid email';
//     }

//     if(!passwordValidator.test(this.state.password))
//     {
//       passwordError = 'Password at least 6 characters, 1 number, 1 upper and 1 lowercase'
//     }

//     if(!(this.state.email)) {
//       emailError = 'enter your email';
//     }

//     if(!(this.state.password)) {
//       passwordError = 'enter your passsword';
//     }

//     if(emailError  || passwordError){
//       this.setState({emailError, passwordError});
//       return false;
//     }
//     return true;
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const isValid = this.validate();
//     if(isValid){
//      //window.location.href="/flightschedule";
//       console.log(this.state);
//     //clear form

//     debugger;
//     fetch('https://localhost:44341/api/register/Login', {
//     method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             Email: this.state.email,
//             Password: this.state.password
//         })
//     }).then((Response) => Response.json())
//         .then((result) => {
//             console.log(result);
//             if (result.Status == 'Invalid')
//                 alert('Invalid User');
//             else
//                 this.props.history.push("/FlightSchedule");
//         })
//     }
//   };

//     render() {
//       if(this.state.loggedIn){
//         return <Redirect to="/flightschedule"/>
//       }
//         return (
//                 <div>
//                   <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
//                     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div className="navbar-nav">
//                     <span>< img style={{ marginLeft:"60px"}} id="kq1" src="\Images\kq.png" alt="" /></span>
//                       <Link className="hover" id="hover" exact to="/" class="nav-link active" href="#" >Home</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
//                       <Link to="/Register" id="hover" class="nav-link" href="#">Register <span style={{marginLeft:"7px"}}></span></Link>                    </div>
//                     </div>
//                   </nav>
//                   <h1 id="head1"><span><img id="kq" src="\Images\kq.png" alt="" ></img></span><b>Book Your Flight With Us</b></h1>
//                 <div id="flex1">
//                   <div>

//                   <div class="card w-135" id="homepara">
//                     <div class="card-body">
//                       <h5 class="card-title" style={{color:"red"}}><span><img id="kq1" src="\Images\kq.png" alt=""></img></span>Kartik Airlines</h5>
//                       <p class="card-text" >Kartik Airlines is aimed at bringing the best in air travels to you. Our outstanding
//                         records among airlines makes us achieve this. Our staff members are adequate and loyal. We are aimed at giving you best services</p>
//                     </div>
//                   </div>
//                     <div id="imgflex">
//                         <img id="himage" src="\Images\image4.jpg" alt=""></img>
//                     </div>
//                 </div>
//                 <form id="hform" className="rounded" onSubmit={this.handleSubmit} >
//                     <h4 className="card-title1" style={{color:"red", textAlign:"center",marginBottom:"30px"}}><span><img id="kq1" src="\Images\kq.png" alt="" /></span>Login page </h4>
//                       <label>E-mail</label>
//                       <input className="form-control " type="text" placeholder="-- enter  email --" name="email" value={this.state.email} onChange={this.Email} onChange={this.handleChange}   />
//                       {/* onChange={(e)=>{this.setState({email:e.target.value})}}/> */}
//                       <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
//                       <label>Password</label>
//                       <input  className="form-control " type="password" placeholder="-- enter password --" name="password" value={this.state.password} onChange={this.Password} onChange={this.handleChange}  />
//                        {/* onChange={(e)=>{this.setState({password:e.target.value})}}/> */}
//                       <div style={{color:"red", fontSize:12}}>{this.state.passwordError}</div>

//                       <button id="hbtn" type="submit" className="btn btn-light btn-outline-secondary" >Login</button>
//                       {/* onClick={()=>this.login()} */}

//                       <p id="link1">Registration Page?:<Link to="register"> Click Here</Link> </p>
//                 </form> 
//               </div>

//               <section id="our">
//                 <div class="container my-3 py-5 text-center" >
//                 <div>
//                 <div id="display">
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\economy.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Economy Class</h5>
//                         <p>
//                         Standard Economy Class fares offer the best value for money and often include benefits
//                          such as complimentary meals and beverages. 
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\premium.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Premium Economy</h5>
//                         <p>
//                         Premium Economy flights bridge the gap between Economy cabins and Business Class comforts, 
//                         with premium seating and various other benefits.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                          
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\business.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Business Class</h5>
//                         <p>
//                         Space and convenience are at the forefront of Business Class cabins,
//                          allowing passengers to continue working while on board.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                 <div class="col-lg-3 col-md-6">
//                   <div class="card">
//                     <div class="card-body">
//                       <img src="\Images\first.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                       <h5>First Class</h5>
//                         <p>
//                         First Class travel offers more space,
//                          premium menus and larger seats that generally convert to fully flat beds for optimal comfort.
//                         </p>
//                       </div>
//                   </div>
//                 </div>
//               </div>              
//               </div>
//             </div>
//           </section>

//            <div>
//            <nav id="navbar3" className="navbar navbar-light bg-danger">
//                 <small>
//                 <span id="navtext"style={{color:"black"}}  className="navbar-text">
//                     Copyright 2020 Kartik Airways. All rights reserved
//                 </span>
//                 </small>
//                 <small>
//                 <span style={{color:"black"}} id="navtext" className="navbar-text">
//                     Layout by <span id="karthik" >Karthik.C</span>
//                 </span>
//                 </small>
//             </nav> 
//            </div>
//           </div>
//         )
//     }
// }

























































































































//------------------------------FIRST Token HOME--------------------------




// import React, { Component } from 'react'
// import { Link,Redirect } from 'react-router-dom'
// import './Home.css'
// import axios from 'axios'


// const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

// const initialState = {
//   email:"",
//   password:"",
//   emailError:"",
//   passwordError:""

// }

// export default class Home extends Component {
//   constructor(props){
//     super(props)
//     const token =localStorage.getItem("token")
//     let loggedIn = true
//     if(token==null){
//       loggedIn=false
//     }
//     this.state={
//       email:'',
//       password:'',
//       loggedIn
//     }
//     this.handleChange=this.handleChange.bind(this)
//     this.handleSubmit=this.handleSubmit.bind(this)
//   }

 
//   state = {
//     persons: []
//   }

//   login() {
//     axios.post(`https://localhost:44341/api/register/Login`)
//       .then(res => {
//         const persons = res.data;
//         console.log(persons);
//         this.setState({ persons });
//       })
//   }


//   state = initialState;
//   handleChange = event => {
//     const isCheckbox = event.target.type === "checkbox";
//     this.setState({
//       [event.target.name]: isCheckbox
//       ? event.target.checked
//       :event.target.value
//     });
//     this.setState({
//       [event.target.name]:event.target.value
//     })
//   };
  
//   validate = () => {
//     let emailError="";
//     let passwordError="";

//     if(!emailValidator.test(this.state.email))
//     {
//       emailError = 'please enter valid email';
//     }

//     if(!passwordValidator.test(this.state.password))
//     {
//       passwordError = 'Password at least 6 characters, 1 number, 1 upper and 1 lowercase'
//     }

//     if(!(this.state.email)) {
//       emailError = 'enter your email';
//     }

//     if(!(this.state.password)) {
//       passwordError = 'enter your passsword';
//     }

//     if(emailError  || passwordError){
//       this.setState({emailError, passwordError});
//       return false;
//     }
//     return true;
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const isValid = this.validate();
//     if(isValid){
//      // window.location.href="/flightschedule";
//       console.log(this.state);
//     //clear form
    
//     const{email,password}=this.state

//     if((email==='karthik@gmail.com' && password==='Karthik7')||(email=== 'manoj@gmail.com' && password==='Manoj5' )||(email==='sreehari@gmail.com' && password==='Sreehari8')||(email=== 'bharathi@gmail.com' && password==='Bharathi8' )||(email==='kumar@gmail.com' && password==='Kumar5')||(email==='rahul@gmail.com' && password==='Rahul5'))
//     {
//       localStorage.setItem("token","qwertyuiopasdfghjkl")
//       this.setState({
//         loggedIn:true
//       })
//       this.setState(initialState);
//     }
//     else
//     {
//         alert("Invalid email or password!");
//     }

//     }
//   };

//     render() {
//       if(this.state.loggedIn){
//         return <Redirect to="/flightschedule"/>
//       }
//         return (
//                 <div>
//                   <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
//                     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div className="navbar-nav">
//                     <span>< img style={{ marginLeft:"60px"}} id="kq1" src="\Images\kq.png" alt="" /></span>
//                       <Link className="hover" id="hover" exact to="/" class="nav-link active" href="#" >Home</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
//                       <Link to="/Register" id="hover" class="nav-link" href="#">Register <span style={{marginLeft:"7px"}}></span></Link>                    </div>
//                     </div>
//                   </nav>
//                   <h1 id="head1"><span><img id="kq" src="\Images\kq.png" alt="" ></img></span><b>Book Your Flight With Us</b></h1>
//                 <div id="flex1">
//                   <div>

//                   <div class="card w-135" id="homepara">
//                     <div class="card-body">
//                       <h5 class="card-title" style={{color:"red"}}><span><img id="kq1" src="\Images\kq.png" alt=""></img></span>Kartik Airlines</h5>
//                       <p class="card-text" >Kartik Airlines is aimed at bringing the best in air travels to you. Our outstanding
//                         records among airlines makes us achieve this. Our staff members are adequate and loyal. We are aimed at giving you best services</p>
//                     </div>
//                   </div>
//                     <div id="imgflex">
//                         <img id="himage" src="\Images\image4.jpg" alt=""></img>
//                     </div>
//                 </div>
//                 <form id="hform" className="rounded" onSubmit={this.handleSubmit} >
//                     <h4 className="card-title1" style={{color:"red", textAlign:"center",marginBottom:"30px"}}><span><img id="kq1" src="\Images\kq.png" alt="" /></span>Login page </h4>
//                       <label>E-mail</label>
//                       <input className="form-control " type="text" placeholder="-- enter  email --" name="email" value={this.state.email} onChange={this.handleChange} />
//                       {/* onChange={(e)=>{this.setState({email:e.target.value})}}/> */}
//                       <div style={{color:"red", fontSize:12}}>{this.state.emailError}</div>
//                       <label>Password</label>
//                       <input  className="form-control " type="password" placeholder="-- enter password --" name="password" value={this.state.password} onChange={this.handleChange} />
//                        {/* onChange={(e)=>{this.setState({password:e.target.value})}}/> */}
//                       <div style={{color:"red", fontSize:12}}>{this.state.passwordError}</div>

//                       <button id="hbtn" type="submit" className="btn btn-light btn-outline-secondary" >Login</button>
//                       {/* onClick={()=>this.login()} */}

//                       <p id="link1">Registration Page?:<Link to="register"> Click Here</Link> </p>
//                 </form> 
//               </div>

//               <section id="our">
//                 <div class="container my-3 py-5 text-center" >
//                 <div>
//                 <div id="display">
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\economy.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Economy Class</h5>
//                         <p>
//                         Standard Economy Class fares offer the best value for money and often include benefits
//                          such as complimentary meals and beverages. 
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\premium.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Premium Economy</h5>
//                         <p>
//                         Premium Economy flights bridge the gap between Economy cabins and Business Class comforts, 
//                         with premium seating and various other benefits.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                          
//                   <div class="col-lg-3 col-md-6">
//                     <div class="card">
//                       <div class="card-body">
//                         <img src="\Images\business.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                         <h5>Business Class</h5>
//                         <p>
//                         Space and convenience are at the forefront of Business Class cabins,
//                          allowing passengers to continue working while on board.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                 <div class="col-lg-3 col-md-6">
//                   <div class="card">
//                     <div class="card-body">
//                       <img src="\Images\first.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3"/>
//                       <h5>First Class</h5>
//                         <p>
//                         First Class travel offers more space,
//                          premium menus and larger seats that generally convert to fully flat beds for optimal comfort.
//                         </p>
//                       </div>
//                   </div>
//                 </div>
//               </div>              
//               </div>
//             </div>
//           </section>

//            <div>
//            <nav id="navbar3" className="navbar navbar-light bg-danger">
//                 <small>
//                 <span id="navtext"style={{color:"black"}}  className="navbar-text">
//                     Copyright 2020 Kartik Airways. All rights reserved
//                 </span>
//                 </small>
//                 <small>
//                 <span style={{color:"black"}} id="navtext" className="navbar-text">
//                     Layout by <span id="karthik" >Karthik.C</span>
//                 </span>
//                 </small>
//             </nav> 
//            </div>
//           </div>
//         )
//     }
// }




