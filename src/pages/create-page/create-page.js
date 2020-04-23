import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

import './create-page.css'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { request } = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    const changeHandler = e => {
        setLink(e.target.value)
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2 create-page--content">
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}
