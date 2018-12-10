// import React, { Component } from 'react';
import {WhiteSpace, Button } from 'antd-mobile';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../css/pickCarPage.css';
const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  });
  
  function ListDividers(props) {
    const { classes } = props;
    return (
    <div>
        <div class="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}>停車地點</h1></span></div>
	    <List>
            <List component="nav" className={classes.root}>
                <ListItem button>
                    <ListItemText primary="選擇停車場" />
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
  
  ListDividers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ListDividers)