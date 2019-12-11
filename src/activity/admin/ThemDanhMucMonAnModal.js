import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import { TITLE_FONT_SIZE, URL_UPLOAD } from '../../asset/MyConst';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
class ThemDanhMucMonAnModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      tenDanhMuc: '',
      imageEmpty: 'https://nameproscdn.com/a/2018/05/106343_82907bfea9fe97e84861e2ee7c5b4f5b.png',
      uri: null
    };

    this.onClose = this.onClose.bind(this);
    // this.save = this.save.bind(this);
  }

  handleChoosePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          uri: response.uri,
          data: response.data
        });
      }
    });
  };

  // uploadImageToServer = () => {

  //   RNFetchBlob.fetch('POST', URL_UPLOAD, {
  //     Authorization: "Bearer access-token",
  //     otherHeader: "foo",
  //     'Content-Type': 'multipart/form-data',
  //   }, [
  //       { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data }
  //     ]).then((resp) => {

  //       var tempMSG = resp.data;

  //       tempMSG = tempMSG.replace(/^"|"$/g, '');

  //       Alert.alert(tempMSG);

  //     }).catch((err) => {
  //       alert(err)
  //       // ...
  //     })

  // }

  onClose() {
    this.setState({
      uri: null
    })
  }

  uploadImageToServer = () => {
    debugger;
    
    RNFetchBlob.fetch('POST', URL_UPLOAD, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data }
      ]).then((resp) => {
        console.log(1, JSON.stringify(resp) );
        
        var tempMSG = resp.data;

        tempMSG = tempMSG.replace(/^"|"$/g, '');

        // Alert.alert(tempMSG);

      }).catch((err) => {
        console.log(2,err);

        // ...
      })

  }


  showAddMemberModal = () => {
    this.refs.modal1.open();
  };

  componentDidMount() {
    this.props.onRef(this)
  }

  render() {
    const { photo } = this.state;
    return (
      <Modal
        style={[styles.modal, styles.modal1]}
        onClosed={this.onClose}
        position={'center'}
        ref={'modal1'}
        isDisabled={this.state.isDisabled} >
        <Text style={styles.title}>Thêm danh mục món ăn</Text>
        <View style={styles.textInputContainer}>
          <Text>Tên danh mục</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Tên danh mục'
            onChangeText={tenDanhMuc => this.setState({ tenDanhMuc })}
            value={this.state.tenDanhMuc}
          />
          <Text>Ảnh mô tả </Text>
          <TouchableOpacity
            onPress={this.handleChoosePhoto}
          >
            <Image
              source={{ uri: this.state.uri !== null ? this.state.uri : this.state.imageEmpty }}
              style={{ width: 150, height: 150, marginBottom: 15, marginTop: 10, }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.uploadImageToServer}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonTitle}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.taiKhoan.email,
  }
}

export default connect(
  mapStateToProps,
  actions
)(ThemDanhMucMonAnModal)

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
  },

  modal: {
    // justifyContent: 'center',
    alignItems: 'center',
  },

  modal1: {
    height: 400,
    width: 400,
    marginTop: -30,
    borderRadius: 20
  },
  title: {
    fontSize: TITLE_FONT_SIZE,
    margin: 10

  },
  textInputContainer: {
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.2)', // a = alpha = opacity
  },
  textInput: {
    height: 45,
    borderBottomColor: 'black',
    borderWidth: 2,
    marginTop: 10,
    padding: 8,
    marginBottom: 10
  },
  loginButton: {
    width: 80,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  loginButtonTitle: {
    margin: 10,
    fontSize: 18,
    color: 'white'
  },
});
