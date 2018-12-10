import React, { Component } from 'react'
import { connect } from "react-redux"
import requestFormPage from '../components/requestFormPage'

const mapDispatchToProps =(dispatch) => ({
    addNewOrderRequest: newOrderRequest => {
      const newOrderRequestItem ={
        carNumber: newOrderRequest
        
      }
      console.log(newOrderRequestItem)
     console.log(JSON.stringify(newOrderRequestItem))
     fetch("https://parkingsystem.herokuapp.com/orders", {
       method: 'POST', 
       headers: new Headers({
       'Content-Type': 'application/json'
     }), 
     mode: 'cors', 
     body: JSON.stringify(newOrderRequestItem)
   }).then(res => res.json())
   .then(res => {
    alert("成功申請")
     dispatch({
       type: "ADD_NEW_ORDER_REQUEST",
       payload: {
         id: res.id,
         carNumber: res.carNumber,
         requestType: res.requestType,
         status: res.status
       }
     })
   }) 
   },
   addNewFetchRequest: newOrderRequest => {
    const newOrderRequestItem ={
      carNumber: newOrderRequest,
      status: 'pendingFetching'
    }
    console.log(newOrderRequestItem)
    fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+newOrderRequest, {
    mode: 'cors', 
  }).then(res => res.json())
  .then(resp => {
    console.log(resp[0].status)
    if(resp.length>0 && resp[0].status=='parked'){
    fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
     method: 'PATCH', 
     headers: new Headers({
     'Content-Type': 'application/json'
   }), 
   mode: 'cors', 
   body: JSON.stringify(newOrderRequestItem)
 }).then(res => res.json())
 .then(res => {
  alert("成功申請")
   dispatch({
     type: "ADD_NEW_ORDER_REQUEST",
     payload: {
       id: res.id,
       carNumber: res.carNumber,
       requestType: res.requestType,
       status: res.status
     }
   })
 })
}
else{
  alert("車子不在停車場")
}
})
   }
  })
   
 export default connect(null, mapDispatchToProps)(requestFormPage)