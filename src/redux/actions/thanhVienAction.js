import {
  DEM_THANH_VIEN,
  THEM_THANH_VIEN
} from './type'


export const demSoThanhVien = soThanhVien => ({
  type: DEM_THANH_VIEN,
  soThanhVien
})

export const themThanhVien = (email, soThanhVien) => ({
  type: THEM_THANH_VIEN,
  email,
  soThanhVien,
})