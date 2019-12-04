import {
    LAY_THUC_DON_ACTION,
    URLThucDon,
    // URL_DANG_KY
} from "../asset/MyConst";
import moment from 'moment';

function LayThucDon(data) {
    return fetch(URLThucDon, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            loai: LAY_THUC_DON_ACTION,
            email: data.email,
            ngayAn: data.ngayAn
        })
    }).then(response => response.json())
        .then(responseJson => responseJson).catch(err => console.log(err)
        )
}

export default function thucDon(type, data) {
    switch (type) {
        case LAY_THUC_DON_ACTION:
            return LayThucDon(data);
        // case DANG_KY_ACTION:
        //     return DangKy(data)
    }
}