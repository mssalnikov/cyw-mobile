export const createHeaders = token => {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (token != null) {
        headers['x-token'] = token
    }

    return headers
}