import {
  DEM_THANH_VIEN,
  CHON_TAB_THANH_VIEN,
  DANG_NHAP,
  KHOI_DONG_APP,
  LAY_THONG_TIN_CALO_THANH_VIEN
} from './type'

export const counterIncrease = () => ({ type: INCREASE })
export const dangNhap = (email, password) => ({
  type: DANG_NHAP,
  email,
  password
})
export const khoiDongApp = navigation => ({ type: KHOI_DONG_APP, navigation })
export const demSoThanhVien = soThanhVien => ({
  type: DEM_THANH_VIEN,
  soThanhVien
})

// Quản lý calo
export const chonTabThanhVien = index => ({ type: CHON_TAB_THANH_VIEN, index })
export const layThongTinCaloThanhVien = routes => ({
  type: LAY_THONG_TIN_CALO_THANH_VIEN,
  routes
})
