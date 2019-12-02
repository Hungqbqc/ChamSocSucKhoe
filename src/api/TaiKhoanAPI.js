import { URL_DANG_NHAP, URL_DANG_KY } from "../asset/MyColor";
const DANG_NHAP = 1;
const DANG_KY = 1;

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

function DangKy(email, password, hoTen, ngayTao) {

}


export default function taiKhoan(type = 1, data) {
    switch (type) {
        case DANG_NHAP:
            return DangNhap(data.email, data.password)
        case DANG_KY:
            return DangKy(email, password, hoTen, ngayTao)
    }
}