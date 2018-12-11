import { List, Toast} from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import { getClerksprocessingOrders, getOrderByCarNumber, changeOrderStatus } from '../util/APIUtils';
export default class viewAcceptedOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getAcceptedOrder();
    }

    getAcceptedOrder=()=>{
        getClerksprocessingOrders("1")
        // fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=accepted,parked,pendingFetching')
        // .then(results => results.json())
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
        // fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+order.carNumber, {
        //     mode: 'cors', 
        // }).then(res => res.json())
        getOrderByCarNumber(order.carNumber)
            .then(resp => {
                console.log(resp[0].status)
                if(resp.length>0 && resp[0].status=='pendingFetching'){
            //     fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
            //     method: 'PATCH', 
            //     headers: new Headers({
            //     'Content-Type': 'application/json'
            // }), 
            // mode: 'cors', 
            // body: JSON.stringify(fetchCarItem)
            // }).then(res => res.json())
            changeOrderStatus(resp[0].id,fetchCarItem)
     .then(res => {
        Toast.success('完成訂單', 1.5);
      this.getAcceptedOrder();
     })
    }
    })

    } 
    onPullList=()=> {
        return new Promise((resolve) => {
            setTimeout(this.getAcceptedOrder(), 2000);
            resolve();
        });
    }
    getParkingLot=(order)=>{
        console.log(order)
        if(order.status=='pendingFetching'){
            return <div>停車場: {order.parkingLot.name}</div>
        }else{
            return <div></div>
        }

    }

    getAction=(order)=>{
        if(order.status=='accepted'){
            return <div onClick={()=>{this.props.onChangePage("pickAcceptedOrderCarPage");this.props.onChangeOrderID(order.id);}}><span style={{verticalAlign: "baseline", fontSize: '15px'}}>泊車 ></span></div>
        }else if(order.status=='pendingFetching'){
            return <div onClick={()=>this.fetchCar(order)}><span style={{verticalAlign: "baseline", fontSize: '15px'}}>取車 ></span></div>
        }
    }

    render() {
  
      return (
        //   <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>處理訂單</h1></span>}>
        //     {this.state.data.map(each=>
        //     <List.Item>
        //         <div style={{ padding: '0 15px', display: "flex", justifyContent: 'space-between'}}>
        //         <div style={{ display: 'flex', padding: '15px 0' }}>
        //         <img style={{ width:'54px', height: '64px', marginRight: '15px' }} src={require('../icon/caricon.png')} alt="" />
        //         <div style={{ lineHeight: 1, padding: '10px 0'}}>
        //             <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{each.carNumber}</div>
        //             {/* <div>停車時間: 17:00</div> */}
        //             {this.getParkingLot(each)}
        //         </div>
        //         </div>
        //         {this.getAction(each)}
        //     </div>
        //     </List.Item>
        //     )}
        //   </List>
        <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>處理訂單</h5>
            </Typography>
            <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={150}
                onRefresh={this.onPullList} 
                triggerHeight={300}
                backgroundColor='white'
                >
            <List dense className={this.props.root}>
              {this.state.data.map(each => (<div>
                <ListItem key={each} button style={{background: "white"}}>
                  <ListItemAvatar>
                    <Avatar
                      src={require('../icon/caricon.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={each.carNumber} />
                  {/* <div onClick={()=>this.grabOrder(each)}><span style={{verticalAlign: "baseline", fontSize: '15px'}}>搶單 ></span></div> */}
                  {/* <div>停車時間: 17:00</div> */}
                  {this.getParkingLot(each)}
                  {this.getAction(each)}
                </ListItem>
                <Divider />
                </div>
              ))}
            </List>
            </PullToRefresh>
        </div>
      );
    }
  }