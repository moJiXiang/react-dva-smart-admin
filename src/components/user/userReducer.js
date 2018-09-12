import { USER_INFO } from './UserActions';

export default function userReducer(state = {

}, action) {
    switch (action.type) {
    case USER_INFO:
        return action.data;
    default:
        return state;
    }
}
