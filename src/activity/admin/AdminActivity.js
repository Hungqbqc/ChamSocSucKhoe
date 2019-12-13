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
import { IP_SERVER, LAY_DANH_MUC_MON_AN, XOA_DANH_MUC_MON_AN } from '../../asset/MyConst';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import DanhSachDanhMucMonAnComponent from '../../components/admin/DanhSachDanhMucMonAnComponent';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ThemDanhMucMonAnModal from './ThemDanhMucMonAnModal';
import Loader from '../../components/Loader';
import {
    COLOR_HEADER,
} from '../../asset/MyColor';

class AdminActivity extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    componentWillMount() {
        this.props.loadingDanhMucMonAn(false);
    }

    componentDidMount() {
        this.layDanhMucMonAn();
    }

    async  layDanhMucMonAn() {
        await this.props.layDanhMucMonAnAsync(JSON.stringify({
            loai: LAY_DANH_MUC_MON_AN
        }))
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
                        this.props.danhMucMonAnAsync(danhMucMonAn);
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
                    data={this.props.danhMucMonAn}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.chonDanhMuc(item)}>
                                <DanhSachDanhMucMonAnComponent parentFlatList={this} key={item.Id} item={item} />
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
        danhMucMonAn: state.monAn.danhMucMonAn,
        isLoading: state.monAn.isLoading,
    }
}

export default connect(
    mapStateToProps,
    actions
)(AdminActivity)