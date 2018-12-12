import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import { connect } from "react-redux"
import requestFormPage from '../components/requestFormPage'
import { addParkOrder, getOrderByCarNumber, changeOrderStatus } from '../util/APIUtils';

const mapDispatchToProps =(dispatch) => ({
    addNewOrderRequest: newOrderRequest => {
      const newOrderRequestItem ={
        carNumber: newOrderRequest
        
      }
      console.log(newOrderRequestItem)
     console.log(JSON.stringify(newOrderRequestItem))
  //    fetch("https://parkingsystem.herokuapp.com/orders", {
  //      method: 'POST', 
  //      headers: new Headers({
  //      'Content-Type': 'application/json'
  //    }), 
  //    mode: 'cors', 
  //    body: JSON.stringify(newOrderRequestItem)
  //  })
  // .then(res => res.json())
   addParkOrder(newOrderRequestItem)
   .then(res => {
    Toast.success("成功申請泊車",3);
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
   .catch((error) => {
    console.log('error: ' + error);
    Toast.fail("未能申請泊車, 請向管理員查詢",3);
  }); 
   },
   addNewFetchRequest: newOrderRequest => {
    const newOrderRequestItem ={
      carNumber: newOrderRequest,
      status: 'pendingFetching'
    }
    console.log(newOrderRequestItem)
  //   fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+newOrderRequest, {
  //   mode: 'cors', 
  // }).then(res => res.json())
  getOrderByCarNumber(newOrderRequest)
  .then(resp => {
        console.log(resp[0].status)
        if(resp.length>0 && resp[0].status=='parked'){
    //     fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
    //      method: 'PATCH', 
    //      headers: new Headers({
    //      'Content-Type': 'application/json'
    //    }), 
    //    mode: 'cors', 
    //    body: JSON.stringify(newOrderRequestItem)
    //  }).then(res => res.json())
    changeOrderStatus(resp[0].id,newOrderRequestItem)
    .then(res => {
      Toast.success("成功申請取車",3);
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
      Toast.fail("車子不在停車場",3);
    }
    })
   },
    getStatusRequest: getOrderRequest => {
    const newOrderRequestItem ={
      carNumber: getOrderRequest,
    }
    console.log(newOrderRequestItem)
    getOrderByCarNumber(getOrderRequest)
    .then(resp => {
      console.log(resp[0].status)
      if(resp.length>0 && resp[0].status=='pendingParking')
        Toast.success("你的車子正等待服務員處理",3);
      else if(resp.length>0 && resp[0].status=='accepted')
        Toast.success("你的泊車申請已被接納",3);
      else if(resp.length>0 && resp[0].status=='parked')
        Toast.success("你的車子已進入停車場",3);
      else if(resp.length>0 && resp[0].status=='pendingFetching')
        Toast.success("你的車子正等待被提取, 請耐心等候",3);
      else if(resp.length>0 && resp[0].status=='completed')
        Toast.success("你的車子已被提取",3);
      else
        Toast.fail("你的車子不在停車場",3);
    })
    .catch((error) => {
      console.log('error: ' + error);
      Toast.info("請先輸入車牌號碼",3);
    });
  }
  })
   
 export default connect(null, mapDispatchToProps)(requestFormPage)