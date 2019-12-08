import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IP_SERVER } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachMonAnComponent from '../../components/quan-ly-thuc-don/DanhSachMonAnComponent';

class DanhSachMonAnActivity extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.tenDanhMuc}`,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  URLLayMonAn = IP_SERVER + 'MonAn.php?loai=2&&idDanhMuc=';
  flatListDanhMucMonAn = [];

  constructor(props) {
    super(props);
    this.state = {
      idDanhMuc: this.props.navigation.getParam('idDanhMuc'),
      email: this.props.navigation.getParam('email'),
      buaAnId: this.props.navigation.getParam('buaAnId'),
      ngayAn: this.props.navigation.getParam('ngayAn'),
      selected: false,
    };
    console.log(this.props.navigation.getParam('tenDanhMuc'));

  }

  themMonAnThanhCong = data => {
    alert('come back status: ' + data);
  };

  componentDidMount() {
    this.layMonAn();
  }

  layMonAn() {
    return fetch(this.URLLayMonAn + this.state.idDanhMuc)
      .then(response => response.json())
      .then(json => {
        if (json !== 0) {
          this.flatListDanhMucMonAn = json;
          this.setState({
            flatListDanhMucMonAn: json,
          });
        }
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.flatListDanhMucMonAn}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.chonMonAn(item)}>
                <DanhSachMonAnComponent key={item.Id} item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  chonMonAn(monAn) {
    this.props.myNavigation.navigate('ChiTietMonAnActivity', {
      themMonAnThanhCong: this.themMonAnThanhCong,
      monAn: monAn,
      tenMonAn: monAn.TenMonAn,
      email: this.state.email,
      buaAnId: this.state.buaAnId,
      ngayAn: this.state.ngayAn,
    });
  }
}

function mapStateToProps(state) {
  return {
    myNavigation: state.myNavigation,
  }
}

export default connect(
  mapStateToProps,
  actions
)(DanhSachMonAnActivity)
