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

export default class viewHistoryOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=completed')
        .then(results => results.json())
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
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
        </div>
      );
    }
  }