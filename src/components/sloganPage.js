import { Carousel, WingBlank, NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import '../css/sloganPage.css';

export default class SloganPage extends React.Component {

  render() {
    return (
        <div>
            <WhiteSpace size="lg" />
            <NoticeBar marqueeProps={{ loop: true, leading: 800, trailing: 800, fps: 40}} icon={null}>
            <span style={{color: "red"}}>全國最大的首家線上泊車系統上線啦   </span>
            <span style={{color: "orange"}}>過千位泊車美女任你選擇    </span>
            <span style={{color: "green"}}>由BinLuIS - MasterJOE親自研發 </span>    
            <span style={{color: "blue"}}>包你一試難忘:P    </span>
            </NoticeBar>
            <WhiteSpace size="lg" />
        </div>
    );
  }
}

