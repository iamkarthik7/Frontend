// import React, { Component } from 'react'
// import './FDetails.css'
// import { Link ,Redirect} from 'react-router-dom'
// import axios from 'axios'
// import ReactPaginate from 'react-paginate'
// import {Model, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// export default class FDetails extends Component {
//     constructor(props){
//       super(props);

//        const token =localStorage.getItem("token")
  
//       let loggedIn = true
//       if(token==null){
//         loggedIn=false
//       }
      
//       this.state={
//         offset:0,
//         tableData:[],
//         orgatableBata:[],
//         perPage:6,
//         currentPage:0,
//         loggedIn,
//         persons: []

//       }
//       this.handlePageClick=this.handlePageClick.bind(this);
//     }
//     handlePageClick=(e)=>{
//       const selectedPage=e.selected;
//       const offset=selectedPage*this.state.perPage;
//       this.setState({
//         currentPage:selectedPage,
//         offset: offset
//       },()=>{
//         this.loadMoreData()
//       })
  
//       this.setState({
//         currentPage: selectedPage,
//         offset: offset
//       },()=>{
//         this.loadMoreData()
//       });
//     };
  
//     loadMoreData(){
//       const data = this.state.orgatableData;
  
//       const slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
//       this.setState({
//         pageCount:Math.ceil(data.length / this.state.perPage),
//         tableData:slice
//       })
//     }
  
//   componentDidMount(){
//   this.getData();
//   }
  
//   getData(){
//     axios.get(`https://localhost:44341/api/booking`)
//     .then(res => {
//       const data=res.data;
//       const slice=data.slice(this.state.offset, this.state.offset+this.state.perPage)
  
//       this.setState({
//         pageCount: Math.ceil(data.length/this.state.perPage),
//         orgatableData:res.data,
//         tableData:slice
//       })
//     })
//   }
//   getelementById(id) {
//     axios.get(`https://localhost:44341/api/booking`+id)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })
//   }

//       // toggleInfo(){
//       //   this.setState({newInfoModel:true})
//       // }
      
//       // handleClose =()=>{
//       //   this.setState({newInfoModel:false})
//       // }

//   home=(e)=>
//   {
//     localStorage.removeItem("token")
//   }


//     render() {
 
//             if(this.state.loggedIn===false){
//             return <Redirect to="/" />
//           }
//         return (
//          <div>
//                          <nav id="navbar2" className="navbar navbar-expand-lg navbar-light bg-light" >
//               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//               </button>
//                 <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//                   <div class="navbar-nav">
//                     <Link to="/flightschedule" id="hover" class="nav-link " href="#" style={{ marginLeft:"60px"}}>Flight Schedule  </Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
//                     <Link to="/cancle" id="hover" class="nav-link " href="#" tabindex="-1" aria-disabled="true">Cancle Ticket</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span>
//                     <Link to="/ContactUs" id="hover" className="hover" class="nav-link active" href="#">Ticket Details</Link><span style={{marginLeft:"7px", marginTop:"7px",marginRight:"7px"}}>|</span> 
//                     <Link to="/payment" id="hover" class="nav-link " href="#">Make Payment </Link>
//                     <Link to="/home" id="hover" onClick={this.home} class="nav-link" href="#" style={{marginLeft:"530px"}}>Logout</Link>
//                   </div>
//                 </div>
//                 </nav>
//            <h1>Ticket Details</h1>
// <div id="table2">

//   <table class="table table-hover" >
// <thead>
//   <tr>
//   <th scope="col" >Ticket_Number</th>
//   <th scope="col" >Flight_ID</th>
//     <th scope="col" >Flight_Name</th>
//     <th scope="col" >Flight_From</th>
//     <th scope="col" >Flight_To</th>
//     <th scope="col" >From_Time</th>
//     <th scope="col" >To_Time</th>
//     <th scope="col" >Ticket_Price</th>
//     <th scope="col" >Conform</th>
//     {/* <th scope="col" >Details</th> */}
//   </tr>
// </thead>
// <tbody>
//   {this.state.tableData.map(item=>{
//       return <tr key={item.ticketnumber}>
//         <td>{item.ticketnumber}</td>
//         <td>{item.flightid}</td>
//           <td>{item.flightname}</td>
//           <td>{item.ffrom}</td>
//           <td>{item.fto}</td>
//             <td>{item.ftime}</td>
//             <td>{item.ttime}</td>
//             <td>{item.ticketprice}</td>
//             <td><Link type="Submit" to="/payment" class="btn btn-outline-success btn-sm">Conform</Link></td>  
//             </tr>
//           })}
            
//   </tbody>
//   </table> 
//           <div id="Pagination" style={{color:"red", margin:"10px 530px 0px 510px", padding:"20px"}}>
//           <ReactPaginate 
//               PreviousLable={"prev"}
//               nextLable={"next"}
//               breakLable={"...."}
//               breakClassName={"break-me"}
//               pageCount={this.state.pageCount}
//               marginPagesDisplayed={20}
//               pageRangeDisplayed={51}
//               onPageChange={this.handlePageClick}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"active"}
//                  />
//               </div>
//             </div>

//             <nav id="navbar7" className="navbar navbar-light bg-danger">
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
//     </div>  
//         )
//     }
// }
















































// import React, { Component } from 'react'
// import './FDetails.css'
// import { Link ,Redirect} from 'react-router-dom'
// import axios from 'axios'
// import ReactPaginate from 'react-paginate'
// import {Model, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// export default class FDetails extends Component {
//     constructor(props){
//       super(props);

//        const token =localStorage.getItem("token")
  
//       let loggedIn = true
//       if(token==null){
//         loggedIn=false
//       }
      
//       this.state={
//         offset:0,
//         tableData:[],
//         orgatableBata:[],
//         perPage:6,
//         currentPage:0,
//         loggedIn,
//         persons: []

//       }
//       this.handlePageClick=this.handlePageClick.bind(this);
//     }
//     handlePageClick=(e)=>{
//       const selectedPage=e.selected;
//       const offset=selectedPage*this.state.perPage;
//       this.setState({
//         currentPage:selectedPage,
//         offset: offset
//       },()=>{
//         this.loadMoreData()
//       })
  
//       this.setState({
//         currentPage: selectedPage,
//         offset: offset
//       },()=>{
//         this.loadMoreData()
//       });
//     };
  
//     loadMoreData(){
//       const data = this.state.orgatableData;
  
//       const slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
//       this.setState({
//         pageCount:Math.ceil(data.length / this.state.perPage),
//         tableData:slice
//       })
//     }
  
//   componentDidMount(){
//   this.getData();
//   this.getelementById();
//   }
  
//   getData(){
//     axios.get(`https://localhost:44341/api/flight?from=Bangalore&to=Mumbai`)
//     .then(res => {
//       const data=res.data;
//       const slice=data.slice(this.state.offset, this.state.offset+this.state.perPage)
  
//       this.setState({
//         pageCount: Math.ceil(data.length/this.state.perPage),
//         orgatableData:res.data,
//         tableData:slice
//       })
//     })
//   }
//   getelementById(id) {
//     axios.get(`https://localhost:44341/api/booking`+id)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })
//   }

//       // toggleInfo(){
//       //   this.setState({newInfoModel:true})
//       // }
      
//       // handleClose =()=>{
//       //   this.setState({newInfoModel:false})
//       // }


//     render() {
 
//             if(this.state.loggedIn===false){
//             return <Redirect to="/" />
//           }
//         return (
//          <div>
//            <h1>Select Your Best</h1>
// <div id="table2">

//   <table class="table table-hover" >
// <thead>
//   <tr>
//   <th scope="col" >Flight_ID</th>
//     <th scope="col" >Flight_Name</th>
//     <th scope="col" >From_Time</th>
//     <th scope="col" >To_Time</th>
//     <th scope="col" >Ticket_Price</th>
//     <th scope="col" >Select</th>
//     {/* <th scope="col" >Details</th> */}
//   </tr>
// </thead>
// <tbody>
//   {this.state.tableData.map(item=>{
//       return <tr key={item.flightid}>
//         <td>{item.flightid}</td>
//           <td>{item.flightname}</td>
//             <td>{item.ftime}</td>
//             <td>{item.ttime}</td>
//             <td>{item.tprice}</td>
//             <td><Link type="Submit" onClick={ this. Addstudent=()=>{  
//     axios.post('https://localhost:44341/api/booking/Post', {
//       flightid:item.flightid,flightname:item.flightname,
//                                                             ftime:item.ftime,  
//                                                             ttime:item.ttime, 
//                                                             ticketprice:item.tprice,
                                                            
//                                                           })  
//                                                             .then(json => {  
//                                                              window.alert("Your Flight is Booked... Check Your Details")
//                                                              window.location.href="/payment";
//                                                             })  
//                                                           }} class="btn btn-outline-success btn-sm">ClickMe</Link></td>                                                          
//             {/* <td>
//             <button type="Submit" onClick={this.toggleInfo.bind(this)} class="btn btn-outline-info btn-sm">Details</button>
//             <Modal isOpen={this.state.newInfoModel} size="lg">
// <ModalHeader>
//   Your Details
// </ModalHeader>
// <ModalBody>
// <div>
// <table class="table table-hover" >
// <thead>
//   <tr>
//   <th scope="col" >Ticketnumber</th>
//     <th scope="col" >Flight_Name</th>
//     <th scope="col" >From_Time</th>
//     <th scope="col" >To_Time</th>
//     <th scope="col" >Ticket_Price</th>
//   </tr>
// </thead>
// <tbody>
//   {this.state.persons.map(item=>{
//       return <tr key={item.ticketnumber}>
//         <td>{item.ticketnumber}</td>
//           <td>{item.flightname}</td>
//             <td>{item.ftime}</td>
//             <td>{item.ttime}</td>
//             <td>{item.ticketprice}</td> 
//             <td><Link type="Submit"  onclick={this.getelementById(item.ticketnumber)}
//   //           onClick={this.componentDidMount=()=> {
//   //   axios.get(`https://localhost:44341/api/booking/`+item.ticketnumber)
//   //     .then(res => {
//   //       const persons = res.data;
//   //       this.setState({ persons });
//   //     })
//   // } }
//     class="btn btn-outline-success btn-sm">ClickMe</Link></td>                                                          
//             </tr>
//           })}  
//   </tbody>
// </table>
  
// </div>
// </ModalBody>
// <ModalFooter>
// <Link type="submit" to="/payment" class = "btn btn-primary" onClick={this.handleClose}>Ok</Link>
// </ModalFooter>

//             </Modal>
//             </td>                                            */}
//             </tr>
//           })}
            
//   </tbody>
//   </table> 
//           <div id="Pagination" style={{color:"red", margin:"10px 530px 0px 510px", padding:"20px"}}>
//           <ReactPaginate 
//               PreviousLable={"prev"}
//               nextLable={"next"}
//               breakLable={"...."}
//               breakClassName={"break-me"}
//               pageCount={this.state.pageCount}
//               marginPagesDisplayed={20}
//               pageRangeDisplayed={51}
//               onPageChange={this.handlePageClick}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"active"}
//                  />
//               </div>
//             </div>

//             <nav id="navbar4" className="navbar navbar-light bg-danger">
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
//     </div>  
//         )
//     }
// }



