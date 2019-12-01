import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'
import * as actions from '../redux/actions'
class DemoActivity extends Component {
  constructor (props) {
    super(props)
  }

  handleIncrease = () => {
    // this.props.counterIncrease()
    this.props.dangNhap('abc', 'xyz')
  }

  handleDecrease = () => {
    // this.props.counterDecrease()
    this.props.dangNhap('123', '567')

  }

  render () {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          padding: 50
        }}
      >
        <TouchableOpacity onPress={this.handleIncrease}>
          <Text>+</Text>
        </TouchableOpacity>
        <Text>{this.props.counter}</Text>
        <TouchableOpacity onPress={this.handleDecrease}>
          <Text>-</Text>
        </TouchableOpacity>

        <Text>{this.props.email}</Text>
        <Text>{this.props.password}</Text>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    counter: state.counter,
    email: state.taiKhoan.email,
    password: state.taiKhoan.password
  }
}

export default connect(
  mapStateToProps,
  actions
)(DemoActivity)
