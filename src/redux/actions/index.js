import { DEM_THANH_VIEN, DECREASE, DANG_NHAP, KHOI_DONG_APP } from './type'

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
