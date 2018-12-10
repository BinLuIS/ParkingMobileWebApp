import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import 'antd/dist/antd.css';
 
export default class selectParkingLot extends Component {
	state = {
	data: []
	}
	
	componentDidMount(){
		fetch('https://parkingsystem.herokuapp.com/parkingclerks/'+"1"+"/parkinglots")
		.then(results => results.json())
		.then(res => {
			this.setState({data:res});
		});
	}
	
	render() {
		{console.log(this.props)}
		const columns = [
		{title: 'Id',dataIndex: 'id',key: 'id'},
		{title: 'Name',dataIndex: 'name',key: 'name'},
	{title: 'Capacity',dataIndex: 'capacity',key: 'capacity'},
	{title: 'AvailableCapacity',dataIndex: 'availableCapacity',key: 'availableCapacity'}];
	console.log(this.state.data)
	return (
	<div>
	<Table columns={columns} dataSource={this.state.data} rowKey="id" />
	</div>
	);
	}
}