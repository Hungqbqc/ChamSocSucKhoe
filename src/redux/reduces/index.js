import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import TaiKhoanReducer from './TaiKhoanReducer'
import NavigationReducer from './NavigationReducer'
import ThanhVienReducer from './ThanhVienReducer'

export default combineReducers({
  counter: counterReducer,
  taiKhoan: TaiKhoanReducer,
  myNavigation: NavigationReducer,
  soThanhVien: ThanhVienReducer
})
