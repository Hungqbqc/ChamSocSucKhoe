import { URL_THONG_TIN_THANH_VIEN } from '../asset/MyColor'
const DEM_SO_THANH_VIEN = 1

function LaySoThanhVien (email) {
  return fetch(URL_THONG_TIN_THANH_VIEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      loai: DEM_SO_THANH_VIEN
    })
  })
    .then(response => response.json())
    .then(responseJson => responseJson)
}

export default function thongTinThanhVien (type = 1, data) {
  switch (type) {
    case DEM_SO_THANH_VIEN:
      return LaySoThanhVien(data.email)
    // case DANG_KY:
    //     return DangKy(email, password, hoTen, ngayTao)
  }
}
