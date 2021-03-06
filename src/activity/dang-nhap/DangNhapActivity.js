import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert
} from 'react-native'
import {
  COLOR_PINK,
  COLOR_PINK_LIGHT,
  COLOR_PINK_MEDIUM,
  IP_SERVER,
  URLThongTinThanhVien
} from '../../asset/MyColor'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
  class DangNhapActivity extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      email: 'hung',
      password: '1',
      errorMessage: null
    }
  }
  URLDangNhap = IP_SERVER + 'DangNhap.php'
  URLLaySoThanhVien = IP_SERVER + URLThongTinThanhVien

  handleLogin = () => {
    const { email, password } = this.state
    if (email.trim() !== '' && password.trim() !== '') {
      fetch(this.URLDangNhap, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // Nếu đúng tài khoản và mật khẩu
          if (responseJson === 0) {
            Alert.alert('Thông báo', 'Đăng nhập thất bại')
          } else {
            this.props.dangNhap(email, password)
            this.props.khoiDongApp(this.props.navigation)
            fetch(this.URLLaySoThanhVien, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: this.state.email,
                loai: '1'
              })
            })
              .then(response => response.json())
              .then(json => {
                if (json !== 0) {
                  this.props.demSoThanhVien(Number(json))
                  this.props.myNavigation.navigate('ManHinhChinhActivity')
                } else {
                  this.props.demSoThanhVien(0)
                  this.props.myNavigation.navigate('NhapSoThanhVienActivity')
                }
              })
              .catch(error => {
                console.error(error)
              })
          }
        })

        .catch(error => {
          console.error(error)
        })
    } else {
      Alert.alert('Chú ý!', 'Email hoặc mật khẩu không được để trống', {
        cancelable: true
      })
    }
  }

  render () {
    return (
      // Donot dismis Keyboard when click outside of TextInput
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <Image style={styles.avatarLogin} source={require('./Login.png')} />
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: 'blue'
              }}
            >
              We are created because of your health
            </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType='emailAddress'
                keyboardType='email-address'
                placeholder='Enter your email'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='Enter your password'
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            <TouchableOpacity
              onPress={this.handleLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonTitle}>Đăng nhập</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 15 }}>
              {' '}
              Chưa có tài khoản?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('DangKyActivity')}
                style={{ color: '#e93766', fontSize: 18, marginTop: 10 }}
              >
                {' '}
                Đăng ký{' '}
              </Text>
            </Text>
            <Text style={{ color: 'blue', fontSize: 18 }}>Quên mật khẩu?</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

function mapStateToProps (state) {
  return {
    myNavigation: state.myNavigation,
  }
}

export default connect(
  mapStateToProps,
  actions
)(DangNhapActivity)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: COLOR_PINK_LIGHT
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    // marginTop: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 40
  },
  down: {
    flex: 7, // 70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: COLOR_PINK_MEDIUM,
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)' // a = alpha = opacity
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center'
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarLogin: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  }
})
