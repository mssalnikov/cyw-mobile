import { combineReducers } from "redux"

import { user } from './user'
import { my_events } from './my_events'
import { event }    from './event'

export const root = combineReducers({
    user,
    my_events,
    event
})