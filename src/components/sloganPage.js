import { Carousel, WingBlank, NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import '../css/sloganPage.css';

export default class SloganPage extends React.Component {

  render() {
    return (
        <div>
            <WhiteSpace size="lg" />
            <NoticeBar marqueeProps={{ loop: true, leading: 800, trailing: 800, fps: 40}} icon={null}>
            <span style={{color: "red"}}>全國最大的線上泊車系統上線啦   </span>
            <span style={{color: "orange"}}>過千位部泊車機器供你使用    </span>
            <span style={{color: "green"}}>為你提供獨一無二的泊車服務 </span>    
            <span style={{color: "blue"}}>讓你享受泊車服務    </span>
            </NoticeBar>
            <WhiteSpace size="lg" />
        </div>
    );
  }
}

