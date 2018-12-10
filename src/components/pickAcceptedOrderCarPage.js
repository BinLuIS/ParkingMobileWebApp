// import React, { Component } from 'react';
import {WhiteSpace, Button } from 'antd-mobile';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Route, Link,Switch} from 'react-router-dom';
import '../css/pickAcceptedOrderCarPage.css';
// const styles = theme => ({
//     root: {
//       backgroundColor: theme.palette.background.paper,
//     },
//   });
  
//   function ListDividers(props) {
//     const { classes } = props;
//     return (
//     <div>
//         <div class="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}>停車地點</h1></span></div>
// 	    <List>
//             <List component="nav" className={classes.root}>
//                 <ListItem button>
//                     if(this.props.lotID != "")
//                         <ListItemText primary={this.props.match.params.lotID} />
//                     else
//                         <ListItemText primary="選擇停車場" />
//                 </ListItem>
//             </List>
//         </List>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <div>
//             <Button type="primary" >完成訂單</Button><WhiteSpace />
//         </div>
//     </div>
//     );
//   }
  
//   ListDividers.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
//   export default withStyles(styles)(ListDividers)

  const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  });
  class pickAcceptedOrderCarPage extends React.Component {
    state = {
      data: []
    
    }
    routeChange = (user) => {
          this.props.history.push('/pickAcceptedOrderParkingLocationPage');
      }
    render() {
      
      let listItem;
      console.log("****" + this.props.match.params.id);
      let data = this.props.match.params.id;
      if(data != undefined) {
        listItem = <ListItemText primary={"選擇了: " + data} />
        }
        else {
        listItem =<ListItemText primary="選擇停車場" />
        }
      return (
        <div>
        <div className="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}>停車地點</h1></span></div>
        {/* <Layout>
        <Content>
          <Switch>
            <Route path="/" exact component={pickAcceptedOrderCarPage}></Route>
            <Route path="/pickAcceptedOrderParkingLocationPage" component={pickAcceptedOrderParkingLocationPage}></Route>
          </Switch>
        </Content>
      </Layout> */}

	    <List>
            <List component="nav" className={this.props.classes.root}>
                <ListItem button onClick={this.routeChange} >
                    {listItem}
                </ListItem>
            </List>
        </List>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
            <Button type="primary" >完成訂單</Button><WhiteSpace />
        </div>
        </div>
      );
    }
  }
  
  
  export default withStyles(styles)(pickAcceptedOrderCarPage)
  
  
  
  
  