import { TabBar } from 'antd-mobile';
import {Icon } from 'antd';
import React, { Component } from 'react'
import '../css/clerkPage.css';
import ViewAllOrderPage from './viewAllOrderPage';
import ViewAcceptedOrderPage from './viewAcceptedOrderPage';
import ViewHistoryOrderPage from './viewHistoryOrderPage';
import ViewPersonalPage from './viewPersonalPage';
import PickAcceptedOrderParkingLocationPage from './pickAcceptedOrderParkingLocationPage';
import PickAcceptedOrderCarPage from './pickAcceptedOrderCarPage';
import { CLERK_ID } from '../constants';


export default class clerkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'viewAllOrderPage',
      hidden: false,
      secondTabSelectedPage: "viewAcceptedOrderPage",
      lotID: -1,
      orderID: -1,
      lotName: ""
    };
  }

  handleLogout=()=>{
    this.props.onLogout(this.props.history)
  }
  
  renderContent(pageName) {
    switch (pageName) {
      case "viewAcceptedOrderPage":
        return <ViewAcceptedOrderPage onChangeOrderID={(id) => {this.setState({orderID: id})}} onChangePage={(page) => {this.setState({secondTabSelectedPage: page})}}/>
      case "pickAcceptedOrderCarPage":
        return <PickAcceptedOrderCarPage lotName={this.state.lotName} lotID={this.state.lotID} orderID={this.state.orderID} onChangePage={(page) => {this.setState({secondTabSelectedPage: page})}}/>
      case "pickAcceptedOrderParkingLocationPage":
        return <PickAcceptedOrderParkingLocationPage onChangeLotID={(id,name) => {this.setState({lotID: id,lotName:name})}} onChangePage={(page) => {this.setState({secondTabSelectedPage: page})}}/>
    }
  }
  render() {
    console.log(`IDnew ${localStorage.getItem(CLERK_ID)}`);
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={Infinity}
        >
          <TabBar.Item
            title="Compete for car parking order"
            key="gradOrder"
            icon={
              <Icon type="profile"  />
            }
            // icon={<div style={{
            //   width: '22px',
            //   height: '22px',
            //   background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            // />
            // }
            selectedIcon={
              <Icon type="profile" theme="filled" />
            }
            selected={this.state.selectedPage === 'viewAllOrderPage'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedPage: 'viewAllOrderPage',
              });
            }}
            data-seed="logId"
          >
            <ViewAllOrderPage />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon type="car"/>
            }
            selectedIcon={
              <Icon type="car"  theme="twoTone"/>
            }
            title="停取"
            key="getOrder"
            // badge={'123'}
            selected={this.state.selectedPage === 'viewAcceptedOrderPage'}
            onPress={() => {
              this.setState({
                selectedPage: 'viewAcceptedOrderPage',
              });
            }}
            data-seed="logId1"
          >
          
          {this.renderContent(this.state.secondTabSelectedPage)}

          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon type="clock-circle"/>
            }
            selectedIcon={
              <Icon type="clock-circle" theme="filled"/>
            }
            title="History"
            key="history"
            // dot
            selected={this.state.selectedPage === 'viewHistoryOrderPage'}
            onPress={() => {
              this.setState({
                selectedPage: 'viewHistoryOrderPage',
              });
            }}
          >
          <ViewHistoryOrderPage />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon type="user" />
            }
            selectedIcon={
              <Icon type="user" theme="outlined"/>
            }
            title="My Profile"
            key="personal"
            selected={this.state.selectedPage === 'viewPersonalPage'}
            onPress={() => {
              this.setState({
                selectedPage: 'viewPersonalPage',
              });
            }}
          >
          <ViewPersonalPage onLogout={this.handleLogout} parkingClerkId={this.props.parkingClerkId}/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
