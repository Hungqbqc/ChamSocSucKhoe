import { DANG_NHAP, DEM_THANH_VIEN } from '../actions/type'

const initialState = 0

export default function (state = initialState, action) {
  switch (action.type) {
    case DEM_THANH_VIEN:
      return action.soThanhVien
    default:
      return state
  }
}
