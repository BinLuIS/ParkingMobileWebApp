import { TabBar, ListView } from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../css/clerkPage.css';
import ListViewExample from './viewAllOrderPage';
import ViewAcceptedOrderPage from './viewAcceptedOrderPage';
import ViewHistoryOrderPage from './viewHistoryOrderPage';
import ViewPersonalPage from './viewPersonalPage';


export default class clerkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
    
  }
  

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="搶單"
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
            selected={this.state.selectedTab === 'blueTab'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <ListViewExample />
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
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
          <ViewAcceptedOrderPage />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon type="clock-circle"/>
            }
            selectedIcon={
              <Icon type="clock-circle" theme="filled"/>
            }
            title="歷史"
            key="history"
            // dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
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
            title="個人"
            key="personal"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
          <ViewPersonalPage />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
