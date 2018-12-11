import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import '../css/pickAcceptedOrderParkingLocationPage.css';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});
class pickAcceptedOrderParkingLocationPage extends React.Component {
  state = {
    data: []

  }


  passLotID = (lotID)=>{
    // this.props.history.push('/pickAcceptedOrderCarPage/'+lotID);
    this.props.onChangePage("pickAcceptedOrderCarPage");
    this.props.onChangeLotID(lotID);
  }
  componentDidMount(){
		fetch('https://parkingsystem.herokuapp.com/parkingclerks/'+"1"+"/parkinglots")
		.then(results => results.json())
		.then(res => {
      let lots=res.filter(each=> each.availableCapacity>0)
      this.setState({data:lots});
    });

	}
  render() {
    console.log(this.state.data);
    return (
      <div>
          <div className="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}><Icon type="left" style={{float: "left", fontSize: "20px", paddingTop: "5px"}} onClick={()=>this.passLotID(this.props.lotID)}/>停車地點</h1></span></div>
          <List component="nav" className={this.props.classes.root}>
          {
            this.state.data.map(each=><div>
          <ListItem button onClick={()=>this.passLotID(each.id)}> 
              <ListItemText primary= {each.name + " (" + each.availableCapacity + ")" }/>
          </ListItem>
          <Divider />
          </div>)
          }
          <Divider light />
          </List>
      </div> 
    );
  }
}


export default withStyles(styles)(pickAcceptedOrderParkingLocationPage)




