import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Button } from 'react-native-elements';
import {
  COLOR_FIREBRICK,
} from '../../asset/MyColor';
import {
  IP_SERVER,
  LAY_THUC_DON,
  COLOR_WHITE,
  DATE_FORMAT_COMPARE,
  URLThucDon,
} from '../../asset/MyConst';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
class ChiTietMonAnActivity extends Component {
  static navigationOptions = {
    title: 'Bông cải xào',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      soLuong: 1,
      monAn: this.props.navigation.getParam('monAn'),
    };
  }


  // Lưu lại số người
  numericInputOnchange(value) {
    this.setState({ soLuong: value < 0 ? 0 : value });
  }

  async _onPress() {
    // this.props.themMonAnAsync(
    //   JSON.stringify({
    //     loai: 1,
    //     ChuTaiKhoanId: this.props.email,
    //     BuaAnId: this.props.buaAn.loaiBua,
    //     MonAnId: this.state.monAn.Id,
    //     NgayAn: this.props.ngayChon,
    //     SoLuong: this.state.soLuong,
    //   }));
    // await this.props.layThucDonAsync(LAY_THUC_DON, {
    //   email: this.props.email,
    //   ngayAn: this.props.ngayChon
    // }).then(async () => {
    //   this.props.myNavigation.navigate('ManHinhChinhActivity');
    // });

    fetch(URLThucDon, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loai: 1,
        ChuTaiKhoanId: this.props.email,
        BuaAnId: this.props.buaAn.loaiBua,
        MonAnId: this.state.monAn.Id,
        NgayAn: this.props.ngayChon,
        SoLuong: this.state.soLuong,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Thêm món ăn thành công
        if (responseJson !== 0) {
          this.props.layThucDonAsync(LAY_THUC_DON, {
            email: this.props.email,
            ngayAn: this.props.ngayChon
          }).then(async () => {
            // this.props.taiLaiTrang(true)
            this.props.myNavigation.navigate('ManHinhChinhActivity');
          });
        } else {
          alert('Thêm món ăn thất bại!');
        }
      })
      .catch(error => {
        console.error(error);
      });

    console.log(this.props.ngayChon);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.avatarLogin}
            source={{
              uri: this.state.monAn.AnhMonAn,
            }}
          />
        </View>
        <View style={styles.mid}>
          <View style={styles.calo}>
            <Text style={styles.tieuDe}>Năng lượng (Kcal) </Text>
            <Text style={styles.tieuDe}>{this.state.monAn.Calo}</Text>
          </View>
          <View style={styles.xo}>
            <Text style={styles.tieuDe}>Xơ (g) </Text>
            <Text style={styles.tieuDe}>{this.state.monAn.Xo}</Text>
          </View>
          <View style={styles.beo}>
            <Text style={styles.tieuDe}>Béo (g) </Text>
            <Text style={styles.tieuDe}>{this.state.monAn.Beo}</Text>
          </View>
          <View style={styles.dam}>
            <Text style={styles.tieuDe}>Đạm (g) </Text>
            <Text style={styles.tieuDe}>{this.state.monAn.Dam}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.soLuong}>
            <NumericInput
              style={styles.numberUpDown}
              type="up-down"
              value={this.state.soLuong}
              onChange={value => this.numericInputOnchange(value)}
              totalWidth={100}
              totalHeight={40}
              initValue={this.state.soLuong}
            />
            <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 16 }}>
              {this.state.monAn.DonViTinh.split(' ')[1].trim()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this._onPress()} style={styles.buttonluu}>
            <Text style={{ fontSize: 20 }}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myNavigation: state.myNavigation,
    buaAn: state.thucDon.buaAn,
    ngayChon: state.thucDon.ngayChon,
    email: state.taiKhoan.email
  }
}

export default connect(
  mapStateToProps,
  actions
)(ChiTietMonAnActivity)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  top: {
    flex: 4,
    borderBottomWidth: 2,
  },
  mid: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 5,
  },
  bottom: {
    flex: 5,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLogin: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  calo: {
    flex: 2,
  },
  xo: {
    flex: 1,
  },
  beo: {
    flex: 1,
  },
  dam: {
    flex: 1,
  },
  tieuDe: {
    fontSize: 16,
    marginTop: 5,
  },
  soLuong: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberUpDown: {
    textAlign: 'center',
    fontSize: 14,
    margin: 150,
  },
  buttonluu: {
    width: 200,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_FIREBRICK,
    marginTop: 10,
  },
  luu: {
    color: COLOR_WHITE,
  },
});
