import React, { Component } from 'react'

const dataSource = [{
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  }, {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }];
  
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }];
  
 
export default class requestFormPage extends Component {
    
  render() {
    return (
      <div>
        <p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Request Form Page Page</p>
      </div>
    )
  }
}
