import { LOGIN } from "actions/user"
import { LOGIN_SUCCES, LOGIN_FAIL } from "actions/user"

export const user = (state={}, action) => {
    switch(action.type) {
        case LOGIN:
            return { pending: true }
        case LOGIN_SUCCES:
            return { ...action.payload, success: true }
        case LOGIN_FAIL:
            return { error: 403 }
        default:
            return state
    }
}