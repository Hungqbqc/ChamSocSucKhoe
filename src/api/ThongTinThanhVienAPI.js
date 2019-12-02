import { URL_THONG_TIN_THANH_VIEN } from '../asset/MyColor'
const DEM_SO_THANH_VIEN = 1
const LAY_THONG_TIN_THANH_VIEN = 2

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

function LayThongTinThanhVien (email) {
  return fetch(URL_THONG_TIN_THANH_VIEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      loai: LAY_THONG_TIN_THANH_VIEN,
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
export default function thongTinThanhVien (type = 1, data) {
  switch (type) {
    case DEM_SO_THANH_VIEN:
      return LaySoThanhVien(data.email)
    case LAY_THONG_TIN_THANH_VIEN:
      return LayThongTinThanhVien(data.email)
  }
}
