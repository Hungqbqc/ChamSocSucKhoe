import { CHON_TAB_THANH_VIEN, LAY_THONG_TIN_CALO_THANH_VIEN } from '../actions/type'

const initialState = {
  index: 0,
  routes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHON_TAB_THANH_VIEN:
      return { ...state, index: action.index }
    case LAY_THONG_TIN_CALO_THANH_VIEN: {
      return { ...state, routes: action.routes }
    }
    default:
      return state
  }
}
