import { List, InputItem, WhiteSpace, Button,Toast,Carousel, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';
import  { Router } from 'react-router';
import SloganPage from './sloganPage';
import Sound from 'react-sound';
import soundfile from '../music/welcome_customer.mp3';

export default class requestFormPage extends Component {
  
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 2,
  }
  onAdded = () => {
    const {captcha,carnum} = this.refs
    console.log(carnum)
    console.log(captcha)
    this.props.addNewOrderRequest(carnum.state.value)
    carnum.setState({value: ''});
    captcha.setState({value: ''});
    
  }
  onFetch = () => {
    const {captcha,carnum} = this.refs
    console.log(carnum)
    console.log(captcha)
    this.props.addNewFetchRequest(carnum.state.value)
    carnum.setState({value: ''});
    captcha.setState({value: ''});
  }
  onInquire = () => {
    const {captcha,carnum} = this.refs
    console.log(carnum)
    console.log(captcha)
    if(carnum == "") {
      Toast.info("請先輸入車牌號碼",3);
    }
    this.props.getStatusRequest(carnum.state.value)
    carnum.setState({value: ''});
    captcha.setState({value: ''});
  }
  onVoice = () => {
    return (<Sound
        url={soundfile}
        playStatus={Sound.status.PLAYING}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
        volume={100}
        autoLoad={true}
        // loop ={true}
      />);
  }
  componentDidMount() {
    // simulate img loading
    // this.onVoice()
    setTimeout(() => {
      this.setState({
        data: ['https://holland.pk/uptow/i4/570d4c6cdf6ec2d403a36614e55ebae2.jpg', 'https://holland.pk/uptow/i4/2cf8023e2fec3b0b679efb01794f7810.jpg'],
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
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
          autoplayInterval={5000}
        >
          {this.state.data.map((val, index) => (
            
            <div
              key={val + index}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, float:"right", maxWidth: '100%' }}
            >
            {/* https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png */}
            {/* require('../icon/caricon.png') */}
            
              <img
                src={val}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: "contain", verticalAlign: 'top'}}
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
          {this.onVoice()}
          {/* <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          /> */}
          <SloganPage />
          <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>冰露泊車</h1></span>}>
            <InputItem ref='carnum' style={{ padding: "50px" }}>
            <p>車牌號碼 </p>
            </InputItem>
            <InputItem ref='captcha' style={{ padding: "50px" }}>
            <p>個人驗證碼 </p>
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

