import { DANG_NHAP, DEM_THANH_VIEN } from '../actions/type'

const initialState = {
  email: '',
  password: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DANG_NHAP:
      return { email: action.email, password: action.password }
    default:
      return state
  }
}
