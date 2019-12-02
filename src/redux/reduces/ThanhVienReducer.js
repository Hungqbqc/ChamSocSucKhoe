import { LAY_THONG_TIN_THANH_VIEN, DEM_THANH_VIEN } from '../actions/type'

const initialState = {
  soThanhVien: 0,
  thongTinThanhVien: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DEM_THANH_VIEN:
      return { ...state, soThanhVien: action.soThanhVien }
    case DEM_THANH_VIEN:
      return { ...state, thongTinThanhVien: action.thongTinThanhVien }
    default:
      return state
  }
}
