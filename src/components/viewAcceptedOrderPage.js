import { TabBar, ListView,List } from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';


export default class viewAcceptedOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=accepted,parked,pendingFetching')
        .then(results => results.json())
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
        });
    }

    getAction=(status)=>{
        if(status=='accepted'){
            return <div style={{marginTop: '40px', fontSize: '20px'}}>泊車 <Icon type="right" width ="20px" height ="20px" /></div>
        }else if(status=='pendingFetching'){
            return <div style={{marginTop: '40px', fontSize: '20px'}}>取車 <Icon type="right" width ="20px" height ="20px" /></div>
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
                {this.getAction}
            </div>
            </List.Item>
            )}
            
          </List>
      );
    }
  }