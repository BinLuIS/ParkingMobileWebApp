import { TabBar, ListView,List } from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';


export default class viewAcceptedOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getOrder();
    }

    getOrder=()=>{
        fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=accepted,parked,pendingFetching')
        .then(results => results.json())
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
        });
    }

    fetchCar=(order) => {
        const fetchCarItem ={
          carNumber: order.carNumber,
          status: 'completed'
        }
        console.log(fetchCarItem)
        fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+order.carNumber, {
        mode: 'cors', 
      }).then(res => res.json())
      .then(resp => {
        console.log(resp[0].status)
        if(resp.length>0 && resp[0].status=='pendingFetching'){
        fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
         method: 'PATCH', 
         headers: new Headers({
         'Content-Type': 'application/json'
       }), 
       mode: 'cors', 
       body: JSON.stringify(fetchCarItem)
     }).then(res => res.json())
     .then(res => {
      alert("訂單完成")
      this.getOrder();
     })
    }
    })

       }    
    // renderComponent(comp) {
    //     return {comp}
    // }

    // renderPage = () => {

    //     renderComponent(this.props.showPage)
    // }
    getAction=(order)=>{
        if(order.status=='accepted'){
            return <div style={{marginTop: '40px', fontSize: '20px'}} onClick={()=>{this.props.onChangePage("pickAcceptedOrderCarPage");this.props.onChangeOrderID(order.id);}}>泊車 <Icon type="right" width ="20px" height ="20px" /></div>
        }else if(order.status=='pendingFetching'){
            return <div style={{marginTop: '40px', fontSize: '20px'}} onClick={()=>this.fetchCar(order)}>取車 <Icon type="right" width ="20px" height ="20px" /></div>
        }
    }

    render() {
  
      return (
          <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>處理訂單</h1></span>}>
            {this.state.data.map(each=>
            <List.Item>
                <div style={{ padding: '0 15px', display: "flex", justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', padding: '15px 0' }}>
                <img style={{ width:'54px', height: '64px', marginRight: '15px' }} src={require('../icon/caricon.png')} alt="" />
                <div style={{ lineHeight: 1, padding: '10px 0'}}>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{each.carNumber}</div>
                    {/* <div>停車時間: 17:00</div> */}
                </div>
                </div>
                {this.getAction(each)}
            </div>
            </List.Item>
            )}
          </List>
      );
    }
  }