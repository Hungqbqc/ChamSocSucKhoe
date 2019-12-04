import { LAY_THUC_DON, CHON_NGAY_THUC_DON, CHON_BUA_AN } from '../actions/type';
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
    ngayChon: '',
    buaAn: {
        loaiBua: 1,
        tenBua: 'Breakfast'
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LAY_THUC_DON:
            return {
                ...state, thucDon: action.thucDon
            };
        case CHON_NGAY_THUC_DON:
            return {
                ...state, ngayChon: action.ngayChon
            };
        case CHON_BUA_AN:
            return {
                ...state, buaAn: action.buaAn
            };
        default:
            return state;
    }
}
