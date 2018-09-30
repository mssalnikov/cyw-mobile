import { AsyncStorage } from "react-native"
import { createHeaders } from "utils"
import { url }  from 'config'

export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENTS_SUCCES = 'GET_EVENTS_SUCCESS'
export const GET_EVENTS_FAIL = 'GET_EVENTS_FAIL'

export const GET_MY_EVENTS = 'GET_MY_EVENTS'
export const GET_MY_EVENTS_SUCCES = 'GET_MY_EVENTS_SUCCESS'
export const GET_MY_EVENTS_FAIL = 'GET_MY_EVENTS_FAIL'

export const CREATE_EVENT = 'CREATE_EVENT'
export const CREATE_EVENT_SUCCES = 'CREATE_EVENT_SUCCESS'
export const CREATE_EVENT_FAIL = 'CREATE_EVENT_FAIL'

export const GET_EVENT = 'GET_EVENT'
export const GET_EVENT_SUCCES = 'GET_EVENT_SUCCESS'
export const GET_EVENT_FAIL = 'GET_EVENT_FAIL'


export const createGetMyEvents = () => async (dispatch) => {
    await dispatch({ type: GET_MY_EVENTS })
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${url}/my_events`, { headers: createHeaders(token) })
        if (res.status != 200) {
            return Promise.reject(await res.text())
        }
        const json = await res.json()
        return dispatch({
            type: GET_MY_EVENTS_SUCCES,
            payload: json.data
        })
    } catch (err) {
        return dispatch({
            type: GET_MY_EVENTS_FAIL,
            payload: err
        })
    } 
}

export const createEvent = (event) => async (dispatch) => {
    await dispatch({ type: CREATE_EVENT })
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${url}/new_event`, { 
            method: 'POST',
            headers: createHeaders(token),
            body: JSON.stringify({
                name: event.name,
                description: event.description,
                points: event.points.map(p => ({
                    lat: p.coordinate.latitude,
                    lng: p.coordinate.longitude,
                    name: p.name,
                    question: p.question,
                    answer: p.answer,
                    token: p.token
                }))
            })
        })
        if (res.status != 200) {
            return Promise.reject(await res.text())
        }
        return dispatch(createGetMyEvents())
    } catch (err) {
        return dispatch({
            type: CREATE_EVENT_FAIL,
            payload: err
        })
    }
}

export const createGetEvent = (id) => async (dispatch) => {
    await dispatch({ type: GET_EVENT })
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${url}/event?id=${id}`, { headers: createHeaders(token) })
        if (res.status != 200) {
            return Promise.reject(await res.text())
        }
        const json = await res.json()
        return dispatch({
            type: GET_EVENT_SUCCES,
            payload: json.data
        })
    } catch (err) {
        return dispatch({
            type: GET_EVENT_FAIL,
            payload: err
        })
    } 
}