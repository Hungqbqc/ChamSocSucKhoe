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
import { LAY_MON_AN } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachMonAnComponent from '../../components/admin/DanhSachMonAnComponent';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ThemMonAnModal from './ThemMonAnModal';
import Loader from '../../components/Loader';


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
    console.log(1233,this.props.monAn);
    
  }

  constructor(props) {
    super(props);
    this.state = {
      idDanhMuc: this.props.navigation.getParam('idDanhMuc'),
    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }

  _onPressAdd() {
    this.child.showAddMemberModal(1);
  }

  _onPressEdit(id, uri, tenDanhMuc) {
    this.child.showAddMemberModal(2, id, uri, tenDanhMuc);
  }

  _onPressDelete(id, tenDanhMuc) {
    Alert.alert(
      'Bạn có chắc chắn không? ',
      'Danh mục ' + tenDanhMuc + ' sẽ bị xóa!',
      [
        {
          text: 'Hủy',
          style: 'login',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            let danhMucMonAn = JSON.stringify(
              {
                loai: XOA_DANH_MUC_MON_AN,
                idDanhMuc: id
              }
            );
            this.props.monAnAsync(danhMucMonAn);
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
          backgroundColor: 'tomato',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 64
        }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 28, color: 'white' }}>Quản lý món ăn</Text>
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
              <TouchableOpacity onPress={() => this.chonDanhMuc(item)}>
                <DanhSachMonAnComponent parentFlatList={this} key={item.Id} item={item} />
              </TouchableOpacity>
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
  }
}

export default connect(
  mapStateToProps,
  actions
)(QuanLyMonAnActivity)
