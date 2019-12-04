import { LAY_THUC_DON, DANG_KY } from '../actions/type';
import moment from 'moment';

const initialState = {
    thucDon: {
        Email: '',
        NgayTao: moment().format('DD/MM/YYYY'),
        TongNangLuong: '0',
        DanhSachMon: [
            { LoaiBua: '1', Mon: [] },
            { LoaiBua: '2', Mon: [] },
            { LoaiBua: '3', Mon: [] },
            { LoaiBua: '4', Mon: [] },
        ],
    },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LAY_THUC_DON:
            return {
                thucDon: action.thucDon
            };
        default:
            return state;
    }
}
