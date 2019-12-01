import { KHOI_DONG_APP } from '../actions/type'

const initialState = null

export default function (state = initialState, action) {
  switch (action.type) {
    case KHOI_DONG_APP:
      return action.navigation
    default:
      return state
  }
}
