import React from 'react';
import PropTypes from 'prop-types';
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

function ListDividers(props) {
  const { classes } = props;
  return (
    <div>
        <div class="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}>停車地點</h1></span></div>
        <List component="nav" className={classes.root}>
        <ListItem button>
            <ListItemText primary="停車場A (10)" />
        </ListItem>
        <Divider />
        <ListItem button divider>
            <ListItemText primary="停車場B (10)" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="停車場C (10)" />
        </ListItem>
        <Divider light />
        </List>
    </div> 
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers)
