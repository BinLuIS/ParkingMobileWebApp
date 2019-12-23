import { List, WhiteSpace, Button,Toast,Carousel, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';
import SloganPage from './sloganPage';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class requestFormPage extends Component {
  
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 2,
    voiceComponent: null,
    parkButtonStatus: false,
    fetchButtonStatus: false,
    queryButtonStatus: false,
    carnum: "",
    orderid: ""
  }
  handleparkButtonOpen = () => {
    this.setState({ parkButtonStatus: true });
  };

  handleparkButtonClose = () => {
    this.setState({ parkButtonStatus: false });
  };

  handlefetchButtonOpen = () => {
    this.setState({ fetchButtonStatus: true });
  };
  handlefetchButtonClose = () => {
    this.setState({ fetchButtonStatus: false });
  };

  handlequeryButtonOpen = () => {
    this.setState({ queryButtonStatus: true });
  };
  handlequeryButtonClose = () => {
    this.setState({ queryButtonStatus: false });
  };

  onAdded = () => {
  //   const {captcha,carnum} = this.refs
  //   console.log(carnum)
  //   console.log(captcha)
  //   this.props.addNewOrderRequest(carnum.state.value)
  //   carnum.setState({value: ''});
  //   captcha.setState({value: ''}); 
    const carnum = this.state.carnum;
    console.log(carnum);

    if(carnum == "") {
      Toast.info("Please type Car Number",3);
    } 
    else {
      this.props.addNewOrderRequest(carnum);
    }
    this.setState({carnum: ""});
    this.handleparkButtonClose();
  }
  onFetch = () => {
  //   const {captcha,carnum} = this.refs
  //   console.log(carnum)
  //   console.log(captcha)
  //   this.props.addNewFetchRequest(carnum.state.value)
  //   carnum.setState({value: ''});
  //   captcha.setState({value: ''});
    const carnum = this.state.carnum;
    const orderid = this.state.orderid;
    console.log(carnum);
    console.log(orderid);

    if(carnum == "" || orderid == "") {
      Toast.info("Please type order number and car number",3);
    }
    else {
      this.props.addNewFetchRequest(carnum, orderid);
    }
    this.setState({carnum: "", orderid: ""});
    this.handlefetchButtonClose();
  }
  onInquire = () => {
    const carnum = this.state.carnum;
    console.log(carnum);

    if(carnum == "") {
      Toast.info("Please type Car Number",3);
    }else {
      this.props.getStatusRequest(carnum);
    }
    this.setState({carnum: ""});
  }
  
  componentDidMount() {
    // simulate img loading

    // this.setState({ voiceComponent: (<Sound
    //   url={soundfile}
    //   playStatus={Sound.status.PLAYING}
    //   onLoading={this.handleSongLoading}
    //   onPlaying={this.handleSongPlaying}
    //   onFinishedPlaying={this.handleSongFinishedPlaying}
    //   volume={100}
    //   autoLoad={true}
    //   // loop ={true}
    // />) });
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
  getParkingDialog = () => {
    return (<Dialog
      open={this.state.parkButtonStatus}
      onClose={this.handleparkButtonClose}
      // fullScreen={fullScreen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Car Parking Request</DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          fullwidth={this.state.fullWidth}
          maxwidth={this.state.maxWidth}
          margin="dense"
          id="carnum"
          label="Car Number"
          type="carnum"
          value={this.state.carnum}
          onChange={e => this.setState({ carnum: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleparkButtonClose} type="secondary" size='small' >
        Cancel
        </Button>
        <Button onClick={this.onAdded} type="primary" size='small'  >
        Submit
        </Button>
      </DialogActions>
    </Dialog>);
  }
  getFetchingDialog = () => {
    return (<Dialog
      open={this.state.fetchButtonStatus}
      onClose={this.handlefetchButtonClose}
      // fullScreen={fullScreen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Car Picking Up Request</DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          fullwidth={this.state.fullWidth}
          maxwidth={this.state.maxWidth}
          margin="dense"
          id="orderid"
          label="Order Number"
          type="orderid"
          value={this.state.orderid}
          onChange={e => this.setState({ orderid: e.target.value })}
        />
        <TextField
          fullwidth={this.state.fullWidth}
          maxwidth={this.state.maxWidth}
          margin="dense"
          id="carnum"
          label="Car Number"
          type="carnum"
          value={this.state.carnum}
          onChange={e => this.setState({ carnum: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handlefetchButtonClose} type="secondary" size='small' >
        Cancel
        </Button>
        <Button onClick={this.onFetch} type="primary" size='small'  >
        Submit
        </Button>
      </DialogActions>
    </Dialog>);
  }
  getQueryDialog = () => {
    return (<Dialog
          open={this.state.queryButtonStatus}
          onClose={this.handlequeryButtonClose}
          // fullScreen={fullScreen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Check Car Status</DialogTitle>
          
          <DialogContent>
            <TextField
              autoFocus
              fullwidth={this.state.fullWidth}
              maxwidth={this.state.maxWidth}
              margin="dense"
              id="carnum"
              label="Car Number"
              type="carnum"
              value={this.state.carnum}
              onChange={e => this.setState({ carnum: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlequeryButtonClose} type="secondary" size='small' >
            Cancel
            </Button>
            <Button onClick={this.onInquire} type="primary" size='small'  >
            Search
            </Button>
          </DialogActions>
        </Dialog>);
  }
  render() {

    return (
        <div>
          {/* {this.state.voiceComponent} */}
          <SloganPage />
          <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>BinLu Parking System</h1></span>}>
            {/* <InputItem ref='carnum' style={{ padding: "50px" }}>
            <p>車牌號碼 </p>
            </InputItem>
            <InputItem ref='captcha' style={{ padding: "50px" }}>
            <p>個人驗證碼 </p>
            </InputItem> */}
          </List>
          <br />
          <div>
            <Button type="primary" onClick={this.handleparkButtonOpen}>Park car</Button><WhiteSpace />
            {this.getParkingDialog()}
            <Button type="primary" onClick={this.handlefetchButtonOpen}>Pick up car</Button><WhiteSpace />
            {this.getFetchingDialog()}
            <Button type="primary" onClick={this.handlequeryButtonOpen}>Search</Button><WhiteSpace />
            {this.getQueryDialog()}
          </div>
          {this.getAdvertisement()}
        </div>
    );
  }
}

