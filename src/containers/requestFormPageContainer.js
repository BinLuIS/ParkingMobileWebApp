import React from 'react'
import { connect } from "react-redux"
import requestFormPage from '../components/requestFormPage'
import { addParkOrder, getOrderByCarNumber, changeOrderStatus } from '../util/APIUtils';
import { Modal, Toast } from 'antd-mobile';

const alert = Modal.alert;
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
    // Toast.success("成功申請泊車",3);
    alert('Successfully to request car parking', <div>Order Number: <b>{res.id}</b> <br/>Car Number: <b>{res.carNumber}</b><br/><br/>***Please keep this receipt***<br/>***You need to pick up this car with this recepit***</div>, [
      {
        text: 'Confirm',
        onPress: () =>
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
      },
    ])
     dispatch({
       type: "ADD_NEW_ORDER_REQUEST",
       payload: {
        //  id: res.id,
        //  carNumber: res.carNumber,
        //  requestType: res.requestType,
        //  status: res.status
       }
     })
   })
   .catch((error) => {
    if(error.status === 409) {
      Toast.fail("You have requested to park this car before.",3);                    
    } else {
      Toast.fail("Fail to park this car. Please contact technical support.",3);                         
    }
    
  }); 
   },
   addNewFetchRequest: (newOrderRequestCarNum,newOrderRequestOrderId) => {
    const newOrderRequestItem ={
      carNumber: newOrderRequestCarNum,
      orderId: newOrderRequestOrderId,
      status: 'pendingFetching'
    }
  //   fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+newOrderRequest, {
  //   mode: 'cors', 
  // }).then(res => res.json())
  getOrderByCarNumber(newOrderRequestCarNum)
  .then(resp => {
    // console.log(resp[0].status)
    if(resp.length==0){
      Toast.fail("No related order number or car number is found",3);
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
    changeOrderStatus(newOrderRequestOrderId,newOrderRequestItem)
    .then(res => {
      Toast.success("Your car pick up request is received",4);
      dispatch({
        type: "ADD_NEW_ORDER_REQUEST",
        payload: {
          // id: res.id,
          // carNumber: res.carNumber,
          // requestType: res.requestType,
          // status: res.status
        }
      })
    }).catch((error) => {
      if(error.status === 404) {
        Toast.fail("No related order number or car number is found",3);                    
      } else {
        Toast.fail("Pick up failed. Please contact technical support",3);                         
      }
       })
  }else{
      Toast.fail("This car is not in parking lot.",3);
  }
}
})
   },
    getStatusRequest: getOrderRequest => {
    const newOrderRequestItem ={
      carNumber: getOrderRequest,
    }
    getOrderByCarNumber(getOrderRequest)
    .then(resp => {
      if(resp.length==0){
        Toast.fail("No request is found",3);
      }else{
        let order=getLatestCarOrderOfCar(resp);
      // console.log(resp[0].status)
      if(order.status=='pendingParking')
        Toast.success("Waiting for car parking request to be received.",3);
      else if(order.status=='accepted')
        Toast.success("Car parking request is received",3);
      else if(order.status=='parked')
        Toast.success("Your car is now in parking lot.",3);
      else if(order.status=='pendingFetching')
        Toast.success("Parking Clerk is picking up your car.",3);
      else if(order.status=='completed')
        Toast.success("Your car has been picked up",3);
    }
  })
    .catch((error) => {
      Toast.fail("Please contact technical support.",3);
     
    });
  }
  })
   
  const printReceipt = () => (
    alert('Delete', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Ok',
        onPress: () =>
          new Promise((resolve) => {
            Toast.info('onPress Promise', 1);
            setTimeout(resolve, 1000);
          }),
      },
    ])
  );
 export default connect(null, mapDispatchToProps)(requestFormPage)