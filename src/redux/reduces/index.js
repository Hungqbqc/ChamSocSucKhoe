import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import TaiKhoanReducer from './TaiKhoanReducer'
import NavigationReducer from './NavigationReducer'
import ThanhVienReducer from './ThanhVienReducer'
import CaloReducer from './CaloReducer'

export default combineReducers({
  counter: counterReducer,
  taiKhoan: TaiKhoanReducer,
  thanhVien: ThanhVienReducer,
  myNavigation: NavigationReducer,
  quanLyCalo: CaloReducer
})
