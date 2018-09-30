import { GET_MY_EVENTS } from "actions/events"
import { GET_MY_EVENTS_SUCCES, GET_MY_EVENTS_FAIL } from "actions/events"

export const my_events = (state={}, action) => {
    switch(action.type) {
        case GET_MY_EVENTS:
            return { pending: true }
        case GET_MY_EVENTS_SUCCES:
            return { data: [...action.payload], success: true }
        case GET_MY_EVENTS_FAIL:
            return { error: 403 }
        default:
            return state
    }
}