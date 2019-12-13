import React, { Component } from 'react';
import {
  FlatList,
  TouchableHighlight,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LAY_MON_AN, XOA_MON_AN } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachMonAnComponent from '../../components/admin/DanhSachMonAnComponent';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ThemMonAnModal from './ThemMonAnModal';
import Loader from '../../components/Loader';
import {
  COLOR_HEADER,
} from '../../asset/MyColor';

class QuanLyMonAnActivity extends Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.layMonAn();
  }

  async  layMonAn() {
    await this.props.layMonAnAsync(JSON.stringify({
      loai: LAY_MON_AN,
      idDanhMuc: this.state.idDanhMuc
    }))
  }

  constructor(props) {
    super(props);
    this.state = {
      idDanhMuc: this.props.navigation.getParam('idDanhMuc'),
      tenDanhMuc: this.props.navigation.getParam('tenDanhMuc'),
    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }

  componentWillMount() {
    this.props.loadingMonAn(false);
  }

  _onPressAdd() {
    this.child.showAddMemberModal(1);
  }

  _onPressEdit(monAn) {
    this.child.showAddMemberModal(2, monAn);
  }

  _onPressDelete(id, tenMonAn) {
    Alert.alert(
      'Bạn có chắc chắn không? ',
      'Danh mục ' + tenMonAn + ' sẽ bị xóa!',
      [
        {
          text: 'Hủy',
          style: 'login',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            let monAn = JSON.stringify(
              {
                loai: XOA_MON_AN,
                idMonAn: id
              }
            );
            this.props.monAnAsync(monAn, this.props.danhMucDaChon);
          }
        }
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View >
          {
            this.props.isLoading ? <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
              <Loader />
            </View> : null
          }
        </View>
        <View style={{
          backgroundColor: COLOR_HEADER,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 64
        }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 28, color: 'white' }}>Quản lý món ăn</Text>
            <Text style={{ fontSize: 18, color: 'white' }}>Danh mục: {this.state.tenDanhMuc} </Text>
          </View>
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor='tomato'
            onPress={this._onPressAdd}
          >
            <IconAntDesign
              style={{ color: 'white' }}
              name="pluscircleo"
              size={35}
            />
          </TouchableHighlight>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.monAn}
          renderItem={({ item, index }) => {
            return (
              <DanhSachMonAnComponent parentFlatList={this} key={item.Id} item={item} />
            );
          }}
        />
        <ThemMonAnModal onRef={ref => (this.child = ref)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myNavigation: state.myNavigation,
    monAn: state.monAn.monAn,
    isLoading: state.monAn.isLoading,
    danhMucDaChon: state.monAn.danhMucDaChon,
  }
}

export default connect(
  mapStateToProps,
  actions
)(QuanLyMonAnActivity)
