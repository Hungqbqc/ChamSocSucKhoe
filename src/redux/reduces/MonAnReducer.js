import {
    LAY_DANH_MUC_MON_AN,
    LAY_MON_AN,
    LOADING_DANH_MUC_MON_AN
} from '../../asset/MyConst'

const initialState = {
    danhMucMonAn: [],
    monAn: [],
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LAY_DANH_MUC_MON_AN:
            return { ...state, danhMucMonAn: action.danhMucMonAn }
        case LAY_MON_AN:
            return { ...state, monAn: action.monAn }
        case LOADING_DANH_MUC_MON_AN:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}
