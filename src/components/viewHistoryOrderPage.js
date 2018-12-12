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
    getListItem = () => {
        
      if(this.state.data.length > 0) {
          return (<List className={this.props.root}>
            {this.state.data.map(each => (
                <div>
              <ListItem key={each} button style={{background: "white"}}>
                <ListItemAvatar>
                  <Avatar
                    src={require('../icon/likeicon.png')}
                  />
                </ListItemAvatar>
                <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={"ID: " + each.id + " / Car No.: " + each.carNumber } />
                {/* <div>停車時間: 17:00</div> */}
              </ListItem>
              <Divider />
              </div>
            ))}
          </List>);
      }
      else {
          return (<div style={{background:"#F5F4F9", verticalAlign: "baseline", textAlign: "center", fontSize: '15px', padding: "5px"}}>你沒有任何已完成的訂單</div>);
      }
    }
    render() {
  
      return (
        <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h4 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>歷史訂單</h4>
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
            <div style={{background:"#F5F4F9", background:"#F5F4F9", height: "100vh"}}>
            {this.getListItem()}
            </div>
            </PullToRefresh>
        </div>
      );
    }
  }