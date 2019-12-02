import { IP_SERVER } from "../asset/MyColor";

const URL = IP_SERVER + 'DangNhap.php';

function dangNhap(email, passWord) {
    //     return fetch(URL + cityName)
    //         .then(res => res.json())
    //         .then(resJSON => resJSON.list[0].main.temp)

    return fetch(this.URLDangNhap, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            // Nếu đúng tài khoản và mật khẩu
            if (responseJson === 0) {
                Alert.alert('Thông báo', 'Đăng nhập thất bại')
            } else {
                this.props.dangNhap(email, password)
                this.props.khoiDongApp(this.props.navigation)
                fetch(this.URLLaySoThanhVien, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        loai: '1'
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        if (json !== 0) {
                            this.props.demSoThanhVien(Number(json))
                            this.props.myNavigation.navigate('ManHinhChinhActivity')
                        } else {
                            this.props.demSoThanhVien(0)
                            this.props.myNavigation.navigate('NhapSoThanhVienActivity')
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        })

        .catch(error => {
            console.error(error)
        });
}

export default getTemp;