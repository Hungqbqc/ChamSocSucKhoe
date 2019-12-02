import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ProfileActivity
} from 'react-native'
import { TabView, SceneMap, TabViewAnimated } from 'react-native-tab-view'
import { CaloComponent } from '../../components/quan-ly-calo/CaloComponent'
import { IP_SERVER, URL_THONG_TIN_THANH_VIEN } from '../../asset/MyColor'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
class QuanLyCaLoActivity extends React.Component {
  URLLayThongTinThanhVien = IP_SERVER + URL_THONG_TIN_THANH_VIEN

  static navigationOptions = {
    header: null
  }
  routes = []
  constructor (props) {
    super(props)
  }

  renderScene = ({ route }) => {
    return <CaloComponent key={route.key} data={route} />
  }

  async componentDidMount () {
    // this.LayDuLieu()
    // this.props.myNavigation.addListener('didFocus', () => {
    //   debugger
    //   console.log(5555)
    // })
  }

  URLLayThongTinThanhVien
  async LayDuLieu () {
    return fetch(this.URLLayThongTinThanhVien, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loai: '2',
        email: this.props.email,
        soNguoi: this.props.soThanhVien
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        for (let index = 0; index < responseJson.length; index++) {
          const element = responseJson[index]
          let title = ''
          if (element.chucDanh === 'Tôi') {
            title = 'Tôi'
          } else {
            title = 'Member ' + (index + 1).toString()
          }
          this.routes.push({
            key: element.id,
            title: title,
            info: element
          })
        }
        this.props.layThongTinCaloThanhVien(this.routes)
      })
      .catch(error => {
        console.error(error)
      })
  }
  _handleIndexChange = index => {
    this.props.chonTabThanhVien(index)
  }

  render () {
    return (
      <TabView
        navigationState={this.props.quanLyCalo}
        renderScene={this.renderScene}
        onIndexChange={this._handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    )
  }
}
function mapStateToProps (state) {
  return {
    email: state.taiKhoan.email,
    soThanhVien: state.soThanhVien,
    myNavigation: state.myNavigation,
    quanLyCalo: state.quanLyCalo
  }
}

export default connect(
  mapStateToProps,
  actions
)(QuanLyCaLoActivity)

const styles = StyleSheet.create({})
