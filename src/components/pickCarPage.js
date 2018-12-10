import React, { Component } from 'react';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';


export default class pickCarPage extends Component {
    render() {
        return (
            <div>
                <List renderHeader={() => <span><h1 style={{ textAlign: "center", color: "white" }}>停車地點</h1></span>}>
                    <div style={{ padding: '0 15px', display: "flex", justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', padding: '20px 0' }}>
                            <div><h2>選擇停車場</h2></div>
                        </div>
                        <Button type="primary" inline size="medium" style={{ marginRight: '4px', marginTop: '25px' }}>選擇</Button>
                    </div>
                </List>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                    <Button type="primary" >完成訂單</Button><WhiteSpace />
                </div>
            </div>


        );
    }
}
