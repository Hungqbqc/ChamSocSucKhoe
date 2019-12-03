import {
  DEM_THANH_VIEN,
  CHON_TAB_THANH_VIEN,
  DANG_NHAP,
  KHOI_DONG_APP,
  LAY_THONG_TIN_CALO_THANH_VIEN,
  THEM_THANH_VIEN
} from './type'
import { DANG_NHAP_ACTION, DANG_KY_ACTION, THEM_SO_THANH_VIEN_ACTION, DEM_SO_THANH_VIEN_ACTION } from "../../asset/MyConst";

// import * as thanhVien from './thanhVienAction'
import taiKhoan from '../../api/TaiKhoanAPI'
import thongTinThanhVien from '../../api/ThongTinThanhVienAPI'


// Đăng nhập
export const dangNhap = (email, password) => ({
  type: DANG_NHAP,
  email,
  password
})
export const khoiDongApp = navigation => ({ type: KHOI_DONG_APP, navigation })
export function dangNhapAsync(type, data) {
  return async dispatch => {
    await taiKhoan(type, data).then(async e => {
      if (e === 0) {
        dispatch(dangNhap('', ''))
        dispatch(demSoThanhVien(0))
      } else {
        dispatch(dangNhap(data.email, data.password))
        await thongTinThanhVien(DEM_SO_THANH_VIEN_ACTION, data).then(result => {
          console.log('thongTinThanhVien', result);
          dispatch(demSoThanhVien(result))
        })
      }
    })
  }
}

// Quản lý thành viên
// export const demSoThanhVien = soThanhVien => ({
//   type: DEM_THANH_VIEN,
//   soThanhVien
// })

// Quản lý calo
export const chonTabThanhVien = index => ({ type: CHON_TAB_THANH_VIEN, index })
export const layThongTinCaloThanhVien = routes => ({
  type: LAY_THONG_TIN_CALO_THANH_VIEN,
  routes
})


/* Quản lý thành viên */
export const demSoThanhVien = soThanhVien => ({
  type: DEM_THANH_VIEN,
  soThanhVien
})
export function demSoThanhVienAsync(type, data) {
  return async dispatch => {
    await thongTinThanhVien(type, data).then(result => {
      dispatch(demSoThanhVien(result))
    })
  }
}

// Thêm số thành viên
export const themSoThanhVien = (soThanhVien) => ({
  type: THEM_THANH_VIEN,
  soThanhVien,
})
export function themSoThanhVienAsync(type, data) {
  return async dispatch => {
    await thongTinThanhVien(type, data).then(result => {
      dispatch(themSoThanhVien(data.soThanhVien))
    })
  }
}