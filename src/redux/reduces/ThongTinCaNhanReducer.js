import {INCREASE, DECREASE} from '../actions/type';

const initialState = {
  thongTin : {
    HoTen: 'Nguyễn Thị Ngọc Ánh',
    Email: 'AnhNN@gmail.com',
    Avatar: 'https://2img.net/h/i148.photobucket.com/albums/s1/KingofSarus/Dress-upLuffy2.jpg',
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
