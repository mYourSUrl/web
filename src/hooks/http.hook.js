import { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /**
     * request. Make request to server and return data. Return state - error, loading
     * @param {string} url
     * @param {string} method (post, get)
     * @param {object} body
     * @param {object} headers
     * @return loading, request, error, clearError
     */
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json; charset=utf-8'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch (err) {
            setLoading(false)
            setError(err.message)
            throw err
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
