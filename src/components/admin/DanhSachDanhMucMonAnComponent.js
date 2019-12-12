import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';
import ThemDanhMucMonAnModal from '../../activity/admin/ThemDanhMucMonAnModal';

export default class DanhSachDanhMucComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                // if (this.state.activeRowKey != null) {
                //   this.setState({activeRowKey: null});
                // }
            },
            onOpen: (sectId, rowId, direction) => {
                // this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () => {
                        console.log(123, this.props.item);
                        this.child.showAddMemberModal(2);
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        flatListData.splice(this.props.index, 1);
                                        //Refresh FlatList ! 
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                    }
                                },
                            ],
                            { cancelable: true }
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
        };

        return (
            <Swipeout  {...swipeSettings}>
                <View
                    key={this.props.item.Id}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                        <Image
                            source={{ uri: this.props.item.anhDanhMuc }}
                            style={{ width: 100, height: 100, margin: 5 }}
                        />
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                            }}>
                            <Text style={styles.flatListItem}>
                                {this.props.item.tenDanhMucMonAn}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 2,
                            backgroundColor: 'black',
                        }}
                    />
                </View>
                <ThemDanhMucMonAnModal onRef={ref => (this.child = ref)} />
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
});
