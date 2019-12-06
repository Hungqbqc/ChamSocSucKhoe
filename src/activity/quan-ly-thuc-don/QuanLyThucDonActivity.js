import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {
  COLOR_DEEPSKY_BLUE,
} from '../../asset/MyColor';
import {
  IP_SERVER,
  LAY_THUC_DON,
  DATE_FORMAT,
  DATE_FORMAT_COMPARE,
} from '../../asset/MyConst';
import DanhSachBuaAnComponent from '../../components/quan-ly-thuc-don/DanhSachBuaAnComponent';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Loader from '../../components/Loader';

class QuanLyThucDonActivity extends Component {
  menuList = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      progress: 0.1,
      btnSelected: moment().format('DD'),
      dayOfWeek: this.taoLich(moment().format(DATE_FORMAT)),
      totalCalo: 0,
      isLoading: false
    };
  }

  // sau khi màn hình hiển thị lên thì lấy dữ liệu thực đơn từ trên server về
  async componentDidMount() {
    await this.layDuLieu(moment().format(DATE_FORMAT));
  }

  // Nếu có dữ liệu thì cấp nhật lại giao diện
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isLoading === nextState.isLoading) {
      return false;
    }
    return true
  }

  // Khi chọn ngày từ nút bấm
  async onPress(item) {
    // Gán ngày đã chọn trong tuần
    await this.props.chonNgayThucDon(moment(item, DATE_FORMAT).format(DATE_FORMAT_COMPARE));
    await this.setStateAsync({
      btnSelected: moment(item, DATE_FORMAT).format('DD'),
      ngayChon:item,
    });
    // Lấy dữ liệu
    await this.layDuLieu(item);
  }

  // Lấy dữ liệu từ trên server về
  async layDuLieu(ngayChon) {
    this.setState({ isLoading: true })
    await this.props.layThucDonAsync(LAY_THUC_DON, {
      email: this.props.email,
      ngayAn: moment(ngayChon, DATE_FORMAT).format(DATE_FORMAT_COMPARE),
    }).then(async () => {
      await this.tinhCaloCacDaChon();
      await this.setState({ isLoading: false })
    });
  }

  // Tính toán lượng calo mà người dùng đã chọn
  async tinhCaloCacDaChon() {
    let totalCalo = 0;
    // if (this.props.thucDon !== null) 
    {
      this.props.thucDon.DanhSachMon.forEach((element) => {
        element.Mon.map(w => {
          totalCalo += w.SoLuong * w.Calo;
        });
      });
      await this.setStateAsync({
        totalCalo: totalCalo,
        progress:
          this.props.thucDon.TongNangLuong !== null
            ? totalCalo / this.props.thucDon.TongNangLuong > 1
              ? 1
              : totalCalo / this.props.thucDon.TongNangLuong
            : 0,
      });
    }
  }

  // Chọn ngày ở lịch
  async chonNgay(date) {
    await this.props.chonNgayThucDon(moment(date, DATE_FORMAT).format(DATE_FORMAT_COMPARE));
    await this.setStateAsync({
      ngayChon: moment(date, DATE_FORMAT).format(DATE_FORMAT), // lưu lại ngày đã chọn
      btnSelected: moment(date, DATE_FORMAT).format('DD'), // lưu lại ngày chọn để sáng nút
      dayOfWeek: this.taoLich(date), // tạo mảng các nút ngày trong tuần
    });
    await this.layDuLieu(date);
  }

  // Tạo ra các button ngày trong tuần
  taoLich(date) {
    // Lấy ngày đầu tuần của ngày đã chọn
    let start = moment(date, DATE_FORMAT).startOf('isoWeek');
    // Lấy ngày cuối tuần của ngày đã chọn
    let end = moment(date, DATE_FORMAT).endOf('isoWeek');
    // Tạo mảng các ngày trong tuần đã chọn
    let dayOfWeek = [];
    for (let index = start; index <= end; index.add(1, 'day')) {
      dayOfWeek.push(index.format(DATE_FORMAT));
    }
    return dayOfWeek;
  }

  tinhSoTuan() {
    return (
      moment(this.props.ngayChon, DATE_FORMAT).weeks() -
      moment(this.props.thucDon.NgayTao, 'YYYYMMDD').weeks() +
      1
    );
  }


  render() {


    const items = this.state.dayOfWeek.map(item => {
      return (
        <TouchableOpacity
          key={item}
          style={[
            this.state.btnSelected === moment(item, DATE_FORMAT).format('DD')
              ? styles.btnSelected
              : styles.btnNotSelected,
            {
              alignItems: 'center',
              width: 30,
              height: 30,
              borderRadius: 100,
              borderWidth: 2,
            },
          ]}
          onPress={() => this.onPress(item)}>
          <Text
            style={[
              this.state.btnSelected === moment(item, DATE_FORMAT).format('DD')
                ? styles.btnSelected
                : styles.btnNotSelected,
              { marginTop: 3 },
              { backgroundColor: 'transparent' },
            ]}>
            {moment(item, DATE_FORMAT).format('DD')}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.calendar}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View >
              {
                this.state.isLoading ? <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                  <Loader />
                </View> : null
              }
            </View>
            <View style={{ flex: 7 }}>
              <Progress.Bar
                progress={this.state.progress}
                width={300}
                height={25}
              />
            </View>
            <View style={{ flex: 1 }}>
              <DatePicker
                // minDate={this.props.thucDon.NgayTao}
                mode="date"
                format={DATE_FORMAT}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{ width: 25, height: 25 }}
                customStyles={{
                  dateIcon: {
                    width: 25,
                    height: 30,
                    marginTop: -15,
                    marginLeft: 15,
                  },
                  dateInput: {
                    marginTop: -20,
                    height: 0,
                    width: 0,
                  },
                }}
                onDateChange={date => {
                  this.chonNgay(date);
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
            <Text>
              Tuần {this.tinhSoTuan()} - {' '}
              {moment(this.props.ngayChon, DATE_FORMAT).format('DD/MM/YYYY')}{' '}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            {items}
          </View>
        </View>
        <View style={styles.calo}>
          <View style={styles.caloTop}>
            <Text style={styles.caloTopText}>
              {this.props.thucDon === null || this.props.thucDon.TongNangLuong === null
                ? 0
                : this.props.thucDon.TongNangLuong}
            </Text>
            <Text style={styles.caloTopText}> - </Text>
            <Text style={styles.caloTopText}>
              {this.props.thucDon === null ? 0 : this.state.totalCalo}
            </Text>
            <Text style={styles.caloTopText}> = </Text>
            <Text style={styles.caloTopText}>
              {this.props.thucDon === null
                ? 0
                : this.props.thucDon.TongNangLuong - this.state.totalCalo}
            </Text>
          </View>
          <View style={styles.caloMid}>
            <Text>Mục tiêu</Text>
            <Text> </Text>
            <Text>Thức ăn</Text>
            <Text> </Text>
            <Text>Còn lại</Text>
          </View>
          <View style={styles.caloBottom}>
            <TouchableOpacity
              onPress={() => {
                this.props.myNavigation.navigate('BaoCaoActivity', {
                  ngayChon: moment(this.props.ngayChon, DATE_FORMAT).format(
                    DATE_FORMAT,
                  ),
                  email: this.state.email,
                });
              }}
              style={styles.loginButton}>
              <Text style={styles.lableTitle}>CHI TIẾT </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuFood}>
          {this.renderFood()}
        </View>

      </View>
    );
  }

  renderFood() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.menuList.map(item => item)}
        renderItem={({ item, index }) => {
          return (
            <DanhSachBuaAnComponent
              key={item.id}
              buaAnId={item.id}
              // ngayAn={this.props.ngayChon}
              // email={this.state.email}
              // navigation={this.state.navigation}
              // caloTarget={this.props.thucDon.TongNangLuong}
              listFood={this.props.thucDon.DanhSachMon.find(
                (w) => w.LoaiBua === item.id,
              )}
              parentFlatList={this}
            />
          );
        }}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    myNavigation: state.myNavigation,
    thucDon: state.thucDon.thucDon,
    ngayChon: state.thucDon.ngayChon,
    email: state.taiKhoan.email
  }
}

export default connect(
  mapStateToProps,
  actions
)(QuanLyThucDonActivity)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  calendar: { flex: 2, borderBottomWidth: 2, marginBottom: 5 },
  calo: {
    flex: 3,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 3,
  },
  caloTop: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  caloTopText: {
    marginTop: 10,
    fontSize: 25,
  },
  caloMid: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  caloBottom: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -5,
  },
  menuFood: { flex: 10 },
  lableTitle: {
    color: COLOR_DEEPSKY_BLUE,
    fontSize: 30,
  },
  borderAll: {
    borderWidth: 2,
    borderColor: 'black',
  },
  btnSelected: {
    backgroundColor: 'blue',
    color: 'white',
  },
  btnNotSelected: {},
});
