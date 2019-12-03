import { DANG_NHAP_ACTION, DANG_KY_ACTION, URL_DANG_NHAP, URL_DANG_KY } from "../asset/MyConst";
import moment from 'moment';
function DangNhap(email, password) {
    return fetch(URL_DANG_NHAP, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(response => response.json())
        .then(responseJson => responseJson)
}

function DangKy(data) {
    return fetch(URL_DANG_KY, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
            ngayTao: moment().format('YYYYMMDD'),
        }),
    }).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
}


export default function taiKhoan(type, data) {
    switch (type) {
        case DANG_NHAP_ACTION:
            return DangNhap(data.email, data.password)
        case DANG_KY_ACTION:
            return DangKy(data)
    }
}