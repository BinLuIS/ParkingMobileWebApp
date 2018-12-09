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
     fetch("http://localhost:8080/orders", {
       method: 'POST', 
       headers: new Headers({
       'Content-Type': 'application/json'
     }), 
     mode: 'cors', 
     body: JSON.stringify(newOrderRequestItem)
   }).then(res => res.json())
   .then(res => {
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
 })
 export default connect(null, mapDispatchToProps)(requestFormPage)