import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMes} from "../hooks/mes.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const mes = useMes();
    const {isloading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    });

    useEffect(() => {
        mes(error);
        clearError()
    },[error,mes,clearError]);

    const changeHandler = event => {
      setForm({ ...form, [event.target.name]:  event.target.value });
    };

    const registerHandler = async () => {
        try {
           // const data = await request('/api/auth/register', 'POST', {...form})
           await request('/api/auth/register', 'POST', {...form})
           //mes(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Своя соц сеть</h3>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                       <div>
                           <div className="row">
                               <div className="input-field">
                                   <input id="email" type="email" name="email" onChange={changeHandler} />
                                       <label htmlFor="email">Email</label>
                               </div>
                           </div>
                           <div className="row">
                               <div className="input-field">
                                   <input id="password" type="password" name="password" onChange={changeHandler} />
                                       <label htmlFor="password">Password</label>
                               </div>
                            </div>
                       </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn amber darken-4"
                            style={{marginRight: 10}}
                            disabled={isloading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn green darken-2"
                            onClick={registerHandler}
                            disabled={isloading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
