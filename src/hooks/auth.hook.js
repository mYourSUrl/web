import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback(
        /**
         * Login. Get token, id user and login user in app.
         * If parameters are in localStorage,
         * Then login user without form.
         * @param {string} jwtToken
         * @param {string} id
         */

        (jwtToken, id) => {
            setToken(jwtToken)
            setUserId(id)

            localStorage.setItem(storageName, JSON.stringify({
                userId: id, token: jwtToken
            }))
        }, [])

    const logout = useCallback(
        /**
         * logout. Cleared state and removed item from localstorage.
         */
        () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(
        () => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }
}
