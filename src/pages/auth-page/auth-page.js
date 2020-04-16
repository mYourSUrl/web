import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'

import './auth-page.css'

export const AuthPage = () => {
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = e => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(`Data ${data}`)
        } catch (e) {

        }
    }

    return (
        <div className='row auth-page'>
            <div className="col s6 offset-s3">
                <h2>Сократи Сыллку</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    name='email'
                                    type="text"
                                    className="auth-page--yellow--input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    name='password'
                                    type="password"
                                    className="auth-page--yellow--input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action auth-page--actions">
                        <button
                            className='btn yellow darken-4 auth-page--btn--login'
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className='btn grey lighten-1 black-text auth-page--btn--register'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
