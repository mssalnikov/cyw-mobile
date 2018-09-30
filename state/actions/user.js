import { AsyncStorage } from "react-native"

import { createHeaders } from "utils"
import { url }  from 'config'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCES = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const createLogin = (fbid, fbtoken) => async (dispatch) => {
    dispatch({
        type: LOGIN
    })
    try {
        const res = await fetch(`${url}/auth`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                fbAccessToken: fbtoken
            })
        })
        
        if (res.status != 200) {
            return Promise.reject(await res.text())
        }

        const json = await res.json()

        await AsyncStorage.setItem('token', json.data.auth_token)
        
        return dispatch({
            type: LOGIN_SUCCES,
            payload: json.data
        })

    } catch (err) {
        console.log(err)
        return dispatch({
            type: LOGIN_FAIL,
            payload: err
        })
    }
}