import React, { useState } from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import Styles from './Form.module.css'

export const Form = ({data, heading, select}) => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [form, setForm] = useState({})

    const createUser = async () => {
        try {
            const data = await request(`${API_URL}/user/create`, "POST", {...form}, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(data.message)
        } catch (e) {
            errorMessage("Ошибка!")
        }
    }

    const changeHandler = e => {
        setForm({ 
            ...form, [e.target.name]: e.target.name === 'level' ? +e.target.value :
            e.target.name === 'courseId' && e.target.value === 'Java' ? 1 : 
            e.target.name === 'courseId' && e.target.value === 'JavaScript' ? 2 : 
            e.target.name === 'courseId' && e.target.value === 'Python' ? 3 :
            e.target.value, 'isActive': 1
        })
    }

    console.log(form);
    
    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                <h3 className={Styles.heading}>{ heading }</h3>
                {
                    data ?
                    data.map(({type, name, label}, i) => {
                        return (
                            <div key={ i } className={Styles.item}>
                                <input 
                                    type={ type }
                                    className={Styles.input}
                                    name={ name }
                                    placeholder={ label }
                                    autoComplete="off"
                                    onChange={changeHandler} />
                            </div>
                        )
                    }) : ''
                }
                {
                    select ?
                    select.map(({name, options}, i) => {
                        return (
                            <div key={ i } className={`${Styles.item} ${Styles.relative}`}>
                                <select className={Styles.select} name={ name } onChange={changeHandler}>
                                    {
                                        options.map(({label, id}, i) => {
                                            return (
                                                <option key={ i } value={ id }>{ label }</option>
                                            )
                                        })
                                    }
                                </select>
                                <i className={`material-icons ${Styles.icon}`}>play_arrow</i>
                            </div>
                        )
                    }) : ''
                }
                <button type="submit" onClick={() => {createUser()}} className={Styles.submit}>Создать</button>
            </div>
        </div>
    )
}