import { List, InputItem, WhiteSpace, Button,Toast,Carousel, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';
import  { Router } from 'react-router';
import SloganPage from './sloganPage';

export default class requestFormPage extends Component {
  
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 2,
  }
  onAdded = () => {
    const {name,carnum} = this.refs
    console.log(carnum)
    console.log(name)
    this.props.addNewOrderRequest(carnum.state.value)
    carnum.setState({value: ''});
    name.setState({value: ''});
    
  }
  onFetch = () => {
    const {name,carnum} = this.refs
    console.log(carnum)
    console.log(name)
    this.props.addNewFetchRequest(carnum.state.value)
    carnum.setState({value: ''});
    name.setState({value: ''});
  }
  onInquire = () => {
    const {name,carnum} = this.refs
    console.log(carnum)
    console.log(name)
    this.props.getStatusRequest(carnum.state.value)
    carnum.setState({value: ''});
    name.setState({value: ''});
  }
  
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['https://holland.pk/uptow/i4/9c889af0fae008bac83a304525b4398b.jpg', 'https://holland.pk/uptow/i4/01ba5299072c7a0d9a19ebf4f151d65e.jpg'],
      });
    }, 100);
  }
  getAdvertisement = () => {
    return (
      <WingBlank>
        
        <WhiteSpace />
        <Carousel
          autoplay={true}
          dots={false}
          infinite
          selectedIndex={this.state.slideIndex}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          autoplayInterval={5000}
        >
          {this.state.data.map((val, index) => (
            
            <div
              key={val + index}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, float:"right"  }}
            >
            {/* https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png */}
            {/* require('../icon/caricon.png') */}
            
              <img
                src={val}
                alt=""
                style={{ width: '50%', verticalAlign: 'top'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </div>
          ))}
        </Carousel>
      </WingBlank>);
  }
  render() {

    return (
        <div>
          <SloganPage />
          <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>冰露泊車</h1></span>}>
            <InputItem ref='name' style={{ padding: "50px" }}>
            <p style={{ color: "#1890ff" }}>姓名 </p>
            </InputItem>
            <InputItem ref='carnum' style={{ padding: "50px" }}>
            <p style={{ color: "#1890ff" }}>車牌號碼 </p>
            </InputItem>
          </List>
          <br />
          <div>
            <Button type="primary" onClick={this.onAdded}>泊車</Button><WhiteSpace />
            <Button type="primary" onClick={this.onFetch}>取車</Button><WhiteSpace />
            <Button type="primary" onClick={this.onInquire}>查詢</Button><WhiteSpace />
          </div>
          {this.getAdvertisement()}
        </div>
    );
  }
}

