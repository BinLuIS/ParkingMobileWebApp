import { Carousel, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';

export default class SloganPage extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['全國最大的首家線上泊車系統上線啦', 
                '過千位泊車美女任你選擇', 
                '由BinLuIS - MasterJOE親自研發', 
                '包你一試難忘:P'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={20}
          slideWidth={1}
          autoplay
          dots={false}
          infinite
        //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (<div><h3 style={{textAlign:"center", color: "white"}}>{val}</h3></div>))}
        </Carousel>
      </WingBlank>
    );
  }
}

