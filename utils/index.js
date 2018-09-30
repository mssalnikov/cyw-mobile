export const createHeaders = token => {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (token != null) {
        headers['auth_token'] = token
    }

    return headers
}