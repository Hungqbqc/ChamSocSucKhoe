import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IP_SERVER } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachDanhMucMonAnComponent from '../../components/quan-ly-thuc-don/DanhSachDanhMucMonAnComponent';

class DanhSachDanhMucMonAnActivity extends Component {
  flatListDanhMucMonAn = [];
  URLLayDanhMucMonAn = IP_SERVER + 'MonAn.php?loai=1';

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  componentDidMount() {
    this.layDanhMucMonAn();
  }

  layDanhMucMonAn() {
    return fetch(this.URLLayDanhMucMonAn)
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

  constructor(props) {
    super(props);
    this.state = {
      flatListDanhMucMonAn: [],
      email: this.props.navigation.getParam('email'),
      buaAnId: this.props.navigation.getParam('buaAnId'),
      ngayAn: this.props.navigation.getParam('ngayAn'),
    };
  }

  chonDanhMuc(idDanhMuc) {
    this.props.myNavigation.navigate('DanhSachMonAnActivity', {
      idDanhMuc: idDanhMuc,
      email: this.state.email,
      buaAnId: this.state.buaAnId,
      ngayAn: this.state.ngayAn,
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
              <TouchableOpacity onPress={() => this.chonDanhMuc(item.id)}>
                <DanhSachDanhMucMonAnComponent key={item.Id} item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
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
)(DanhSachDanhMucMonAnActivity)
