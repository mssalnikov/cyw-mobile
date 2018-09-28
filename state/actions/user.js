import { createHeaders } from "utils"

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCES = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

const url = 'http://10.0.1.25:9000'

export const createLogin = (fbid, fbtoken) => dispatch => {
    dispatch({
        type: LOGIN
    })
    fetch(`${url}/api/login`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({
            fbid,
            fbtoken
        })
    })
        .then(res => {
            if (res.status != 200) {
                return res().then(text => Promise.reject(text))
            }
            return res.json()
        }).then(json => {
            return dispatch({
                type: LOGIN_SUCCES,
                payload: json
            })
        }).catch(err => {
            console.log(err)
            return dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
        })
}