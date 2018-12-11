import { TabBar, ListView,List } from 'antd-mobile';
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
import {getCompletedOrder} from '../util/APIUtils';
export default class viewHistoryOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getHistoryOrder();
    }
    getHistoryOrder=()=>{
      // fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=completed')
      //   .then(results => results.json())
      getCompletedOrder("1")
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
        });
    }
    onPullList=()=> {
      return new Promise((resolve) => {
          setTimeout(this.getHistoryOrder(), 2000);
          resolve();
      });
    }
    render() {
  
      return (
        //   <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>歷史訂單</h1></span>}>
        //   {this.state.data.map(each=>
        //     <List.Item>
        //         <div style={{ padding: '0 15px', display: "flex", justifyContent: 'space-between'}}>
        //         <div style={{ display: 'flex', padding: '15px 0' }}>
        //         <img style={{ width:'54px', height: '64px', marginRight: '15px' }} src={require('../icon/caricon.png')} alt="" />
        //         <div style={{ lineHeight: 1, padding: '10px 0'}}>
        //             <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{each.carNumber}</div>
        //             {/* <div>停車時間: 17:00</div> */}
        //         </div>
        //         </div>
                
        //     </div>
        //     </List.Item>
        //     )}
            
        //   </List>
        <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>歷史訂單</h5>
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
              {this.state.data.map(each => (
                  <div>
                <ListItem key={each} button style={{background: "white"}}>
                  <ListItemAvatar>
                    <Avatar
                      src={require('../icon/likeicon.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={each.carNumber} />
                  {/* <div>停車時間: 17:00</div> */}
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