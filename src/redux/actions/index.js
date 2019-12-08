
import {
  DEM_SO_THANH_VIEN,
  CHON_TAB_THANH_VIEN,
  DANG_NHAP,
  DANG_KY,
  KHOI_DONG_APP,
  LAY_THONG_TIN_CALO_THANH_VIEN,
  THEM_SO_THANH_VIEN,
  LAY_THUC_DON,
  CHON_NGAY_THUC_DON,
  CHON_BUA_AN,
  LOADING,
  URLThucDon,
  CHON_THANH_VIEN,
  URL_THONG_TIN_THANH_VIEN
} from "../../asset/MyConst";

// import * as thanhVien from './thanhVienAction'
import callApi from '../../api/apiCaller'
import taiKhoan from '../../api/TaiKhoanAPI'
import thucDon from '../../api/ThucDonAPI'
import thongTinThanhVien from '../../api/ThongTinThanhVienAPI'

//#region  Đăng nhập
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
        await thongTinThanhVien(DEM_SO_THANH_VIEN, data).then(result => {
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
//#endregion

//#region  Quản lý calo
export const chonTabThanhVien = index => ({ type: CHON_TAB_THANH_VIEN, index })
export const layThongTinCaloThanhVien = routes => ({
  type: LAY_THONG_TIN_CALO_THANH_VIEN,
  routes
})

//#endregion


//#region Quản lý thành viên

// Đếm số thành viên
export const demSoThanhVien = soThanhVien => ({
  type: DEM_SO_THANH_VIEN,
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
  type: THEM_SO_THANH_VIEN,
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
  console.log('layThongTinThanhVienAsync', type, data);
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

export const chonThanhVien = (id) => ({
  type: CHON_THANH_VIEN,
  id,
})

export function xoaThanhVienAsync(body,email) {
  return async dispatch => {
    await callApi(URL_THONG_TIN_THANH_VIEN, 'POST', body).then(async res => {
      dispatch(layThongTinThanhVienAsync(LAY_THONG_TIN_CALO_THANH_VIEN, { email }))
    });
  }
}

export function themThanhVienAsync(body,email) {
  // console.log('body',body);
  // console.log('email',email);
  
  return async dispatch => {
    await callApi(URL_THONG_TIN_THANH_VIEN, 'POST', body).then(async res => {
      console.log('themThanhVienAsync',res);
      
      dispatch(layThongTinThanhVienAsync(LAY_THONG_TIN_CALO_THANH_VIEN, { email }))
    });
  }
}

//#endregion


//#region Thực đơn
// Tải lại màn hình thực đơn
export const taiLaiTrang = isLoading => ({ type: LOADING, isLoading })
export const layThucDon = thucDon => ({ type: LAY_THUC_DON, thucDon })
export function layThucDonAsync(type, data) {
  return async dispatch => {
    await thucDon(type, data).then(async result => {
      await dispatch(layThucDon(result))
    })
  }
}

export const chonNgayThucDon = ngayChon => ({ type: CHON_NGAY_THUC_DON, ngayChon })
export const chonBuaAn = (buaAn) => ({ type: CHON_BUA_AN, buaAn })
export function chonBuaAnAsync(buaAn) {
  return async dispatch => {
    await dispatch(chonBuaAn(buaAn))
  }
}

export function themMonAnAsync(monAn) {
  console.log('themMonAnAsync', monAn);
  return dispatch => {
    return callApi(URLThucDon, 'POST', monAn).then(async res => {
      // console.log(1221, res);
      dispatch(taiLaiTrang(true))
    });
  }
}
//#endregion
