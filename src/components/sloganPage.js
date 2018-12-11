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
        data: ['全國最大的首家線上泊車系統上線啦', '過千個泊車仔女任你揀選', '由偉大的Master JOE親自研發'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (<div><h4>{val}</h4></div>))}
        </Carousel>
      </WingBlank>
    );
  }
}

