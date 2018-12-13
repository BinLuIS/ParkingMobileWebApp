import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import { connect } from "react-redux"
import requestFormPage from '../components/requestFormPage'
import { addParkOrder, getOrderByCarNumber, changeOrderStatus } from '../util/APIUtils';

  const getLatestCarOrderOfCar=(carOrderList)=>{
    let largestId=0;  
    let result=null;
    for(let i=0;i<carOrderList.length;i++){
        if(carOrderList[i].id>largestId){
            largestId=carOrderList[i].id;
            result=carOrderList[i];
        }
      }
      return result
  }


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
    if(error.status === 409) {
      Toast.fail("你的車子已被申請，請勿重覆",3);                    
    } else {
      console.log('error: ' + error);
      Toast.fail("未能申請泊車, 請向管理員查詢",3);                         
    }
    
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
    // console.log(resp[0].status)
    if(resp.length==0){
      Toast.fail("沒有此車子的申請",3);
    }else {
        let order=getLatestCarOrderOfCar(resp)
        if(order.status=='parked'){
    //     fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
    //      method: 'PATCH', 
    //      headers: new Headers({
    //      'Content-Type': 'application/json'
    //    }), 
    //    mode: 'cors', 
    //    body: JSON.stringify(newOrderRequestItem)
    //  }).then(res => res.json())
    changeOrderStatus(order.id,newOrderRequestItem)
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
  }else{
      Toast.fail("車子不在停車場",3);
  }
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
      if(resp.length==0){
        Toast.fail("沒有此車子的申請",3);
      }else{
        let order=getLatestCarOrderOfCar(resp);
      // console.log(resp[0].status)
      if(order.status=='pendingParking')
        Toast.success("你的車子正等待服務員處理",3);
      else if(order.status=='accepted')
        Toast.success("你的泊車申請已被接納",3);
      else if(order.status=='parked')
        Toast.success("你的車子已進入停車場",3);
      else if(order.status=='pendingFetching')
        Toast.success("你的車子正等待被提取, 請耐心等候",3);
      else if(order.status=='completed')
        Toast.success("你的車子已被提取",3);
    }
  })
    .catch((error) => {
      console.log('error: ' + error);
      Toast.fail("請向管理員查詢",3);
     
    });
  }
  })
   
 export default connect(null, mapDispatchToProps)(requestFormPage)