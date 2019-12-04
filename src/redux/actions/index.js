import {
  DEM_THANH_VIEN,
  CHON_TAB_THANH_VIEN,
  DANG_NHAP,
  DANG_KY,
  KHOI_DONG_APP,
  LAY_THONG_TIN_CALO_THANH_VIEN,
  THEM_THANH_VIEN
} from './type'
import {
  DANG_NHAP_ACTION,
  DANG_KY_ACTION,
  THEM_SO_THANH_VIEN_ACTION,
  DEM_SO_THANH_VIEN_ACTION
} from "../../asset/MyConst";

// import * as thanhVien from './thanhVienAction'
import taiKhoan from '../../api/TaiKhoanAPI'
import thongTinThanhVien from '../../api/ThongTinThanhVienAPI'


// Đăng nhập
export const khoiDongApp = navigation => ({ type: KHOI_DONG_APP, navigation })
export const dangNhap = (email, password, trangThaiDangNhap) => ({
  type: DANG_NHAP,
  email,
  password,
  trangThaiDangNhap
})
export function dangNhapAsync(type, data) {
  return async dispatch => {
    await taiKhoan(type, data).then(async e => {
      if (e === 0) {
        dispatch(dangNhap('', '', false))
        dispatch(demSoThanhVien(0))
      } else {
        dispatch(dangNhap(data.email, data.password, true))
        await thongTinThanhVien(DEM_SO_THANH_VIEN_ACTION, data).then(result => {
          dispatch(demSoThanhVien(result))
        })
      }
    })
  }
}

// Đăng ký
export const dangKy = (trangThaiDangKy) => ({
  type: DANG_KY,
  trangThaiDangKy,
})
export function dangKyAsync(type, data) {
  return async dispatch => {
    await taiKhoan(type, data).then(e => {
      if (e === 0) {
        dispatch(dangKy(false))
      } else {
        dispatch(dangKy(true))
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

// Đếm số thành viên
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

// Lấy thông tin calo các thành viên
export const layThongTinThanhVien = (routes) => ({
  type: LAY_THONG_TIN_CALO_THANH_VIEN,
  routes,
})
export function layThongTinThanhVienAsync(type, data) {
  return async dispatch => {
    await thongTinThanhVien(type, data).then(result => {
      dispatch(layThongTinThanhVien(result))
    })
  }
}

export function capNhatThongTinCaloThanhVienAsync(type, data) {
  return async dispatch => {
    await thongTinThanhVien(type, data);
  }
}

