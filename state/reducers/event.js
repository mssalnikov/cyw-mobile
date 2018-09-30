import { GET_EVENT } from "actions/events"
import { GET_EVENT_SUCCES, GET_EVENT_FAIL } from "actions/events"

export const event = (state={}, action) => {
    switch(action.type) {
        case GET_EVENT:
            return { pending: true }
        case GET_EVENT_SUCCES:
            console.log(action)
            return { data: [...action.payload], success: true }
        case GET_EVENT_FAIL:
            return { error: 403 }
        default:
            return state
    }
}