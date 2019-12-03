import { URL_THONG_TIN_THANH_VIEN } from '../asset/MyColor'
import { DEM_SO_THANH_VIEN_ACTION, LAY_THONG_TIN_THANH_VIEN_ACTION, THEM_SO_THANH_VIEN_ACTION } from '../asset/MyConst'

function LaySoThanhVien(email) {
  return fetch(URL_THONG_TIN_THANH_VIEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      loai: DEM_SO_THANH_VIEN_ACTION
    })
  })
    .then(response => response.json())
    .then(responseJson => responseJson)
}

function LayThongTinThanhVien(email) {
  return fetch(URL_THONG_TIN_THANH_VIEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      loai: LAY_THONG_TIN_THANH_VIEN_ACTION,
      email: email
    })
  })
    .then(response => response.json())
    .then(
      responseJson =>
        //   {
        //   for (let index = 0; index < responseJson.length; index++) {
        //     const element = responseJson[index]
        //     let title = ''
        //     if (element.chucDanh === 'Tôi') {
        //       title = 'Tôi'
        //     } else {
        //       title = 'Member ' + (index + 1).toString()
        //     }
        //     this.routes.push({
        //       key: element.id,
        //       title: title,
        //       info: element
        //     })
        //   }
        //   this.props.layThongTinCaloThanhVien(this.routes)
        // }
        responseJson
    )
    .catch(error => {
      console.error(error)
    })
}

function ThemThanhVien(email, soThanhVien) {
  debugger;
  return fetch(URL_THONG_TIN_THANH_VIEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loai: THEM_SO_THANH_VIEN_ACTION,
      email: email,
      soNguoi: soThanhVien,
    }),
  })
    .then(response => response.json())
    .then(responseJson => responseJson)
}


export default function thongTinThanhVien(type = 1, data) {
  switch (type) {
    case DEM_SO_THANH_VIEN_ACTION:
      return LaySoThanhVien(data.email)
    case LAY_THONG_TIN_THANH_VIEN_ACTION:
      return LayThongTinThanhVien(data.email)
    case THEM_SO_THANH_VIEN_ACTION:
      return ThemThanhVien(data.email, data.soThanhVien)
  }
}
