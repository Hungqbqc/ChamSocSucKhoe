import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../redux/actions';
class DemoActivity extends Component {
  constructor(props) {
    super(props);
  }

  handleIncrease = () => {
    this.props.counterIncrease();
  };

  handleDecrease = () => {
    this.props.counterDecrease();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          padding: 50,
        }}>
        <TouchableOpacity onPress={this.handleIncrease}>
          <Text>+</Text>
        </TouchableOpacity>
        <Text>{this.props.counter}</Text>
        <TouchableOpacity onPress={this.handleDecrease}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

export default connect(mapStateToProps,actions)(DemoActivity);
