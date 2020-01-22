import React, {useContext, useState, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useMes} from "../hooks/mes.hook";

export const CreatePage = () => {
    const mes = useMes();
    const auth = useContext(AuthContext)
    const {request, error, clearError} = useHttp()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        mes(error);
        clearError()
    },[error,mes,clearError]);

    const createHandler = async () => {
        try {
            console.log(title, body)
            const data = await request('/api/post/generate', 'POST', {title:title, body: body}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log("Data from createpage", data)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
                <div className="input-field">
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="input-field">
                    <input id="body" type="text" value={body} onChange={e => setBody(e.target.value)} />
                    <label htmlFor="body">Body</label>
                </div>
                <button
                    className="btn amber darken-4"
                    style={{marginRight: 10}}
                    onClick={createHandler}
                >
                    Войти
                </button>
            </div>
        </div>
    )
};
