import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import '../css/pickAcceptedOrderParkingLocationPage.css';
import Typography from '@material-ui/core/Typography';
import {getParkingClerksParkinglot} from '../util/APIUtils'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});
class pickAcceptedOrderParkingLocationPage extends React.Component {
  state = {
    data: []

  }


  passLotID = (lotID,name)=>{
    // this.props.history.push('/pickAcceptedOrderCarPage/'+lotID);
    this.props.onChangePage("pickAcceptedOrderCarPage");
    this.props.onChangeLotID(lotID,name);
  }
  componentDidMount(){
    // fetch('https://parkingsystem.herokuapp.com/parkingclerks/'+"1"+"/parkinglots")
		// .then(results => results.json())
    getParkingClerksParkinglot("1")
		.then(res => {
      console.log(res);
      let lots=res.filter(each=> each.availableCapacity>0)
      this.setState({data:lots});
    });

  }
  getListItem = () => {
       
    if(this.state.data.length > 0) {
        return (<List>
          {
            this.state.data.map(each=><div>
            <ListItem style={{background: "white"}} button onClick={()=>this.passLotID(each.id,each.name)}> 
                <ListItemText primary= {each.name + " (現有空位: " + each.availableCapacity + ")" }/>
            </ListItem>
            <Divider />
            </div>)
          }
          </List>);
    }
    else {
        return (<div style={{background:"#F5F4F9", verticalAlign: "baseline", textAlign: "center", fontSize: '15px', padding: "5px"}}>沒有可供選擇的停車場</div>);
    }
}
  render() {
    console.log(this.state.data);
    return (
      <div>
          <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
              <h4 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}><Icon type="left" style={{float: "left", fontSize: "20px", paddingTop: "5px"}} onClick={()=>this.passLotID(this.props.lotID,this.props.lotName)}/>停車地點</h4>
          </Typography>
            {this.getListItem()}
        </div>
    );
  }
}

export default withStyles(styles)(pickAcceptedOrderParkingLocationPage)




