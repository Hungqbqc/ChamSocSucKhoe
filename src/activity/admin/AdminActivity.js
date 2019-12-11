import React, { Component } from 'react';
import {
    FlatList,
    TouchableHighlight,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { IP_SERVER } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachDanhMucMonAnComponent from '../../components/quan-ly-thuc-don/DanhSachDanhMucMonAnComponent';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ThemDanhMucMonAnModal from './ThemDanhMucMonAnModal';
class AdminActivity extends Component {
    flatListDanhMucMonAn = [];
    URLLayDanhMucMonAn = IP_SERVER + 'MonAn.php?loai=1';

    // static navigationOptions = ({ navigation }) => ({
    //     title: `Quản lý danh mục món ăn`,
    //     headerStyle: {
    //         backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //     },
    // });

    static navigationOptions = {
        header: null
    }

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
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    chonDanhMuc(danhMuc) {
        this.props.myNavigation.navigate('DanhSachMonAnActivity', {
            idDanhMuc: danhMuc.id,
            tenDanhMuc: danhMuc.tenDanhMucMonAn,
            email: this.state.email,
            buaAnId: this.state.buaAnId,
            ngayAn: this.state.ngayAn,
        });
    }

    _onPressAdd() {
        this.child.showAddMemberModal();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{
                    backgroundColor: 'tomato',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 28, color: 'white' }}>Quản lý danh mục món ăn</Text>
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
                    data={this.state.flatListDanhMucMonAn}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.chonDanhMuc(item)}>
                                <DanhSachDanhMucMonAnComponent key={item.Id} item={item} />
                            </TouchableOpacity>
                        );
                    }}
                />
                <ThemDanhMucMonAnModal onRef={ref => (this.child = ref)} />
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
)(AdminActivity)
