import React, { useState } from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import Styles from './Form.module.css'

export const Form = ({id, data, heading, select, users, url}) => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [form, setForm] = useState({})
    // const [collaborators, setCollaborators] = useState([])

    const createUser = async () => {
        try {
            const data = await request(`${API_URL}/${url}/create`, "POST", {...form}, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(data.message)
        } catch (e) {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const changeHandler = e => {     
        if (id === 'user') {
            setForm({ 
                ...form, [e.target.name]: e.target.name === 'level' ? +e.target.value :
                e.target.name === 'courseId' && e.target.value === 'Java' ? 1 : 
                e.target.name === 'courseId' && e.target.value === 'JavaScript' ? 2 : 
                e.target.name === 'courseId' && e.target.value === 'Python' ? 3 :
                e.target.value, 'isActive': 1
            })
        } else if (id === 'project') {
            // users.map(({fullname}, i) => {
            //     setForm({
            //         ...form, [e.target.name]: e.target.name === 'users' ? collaborators :
            //         e.target.value
            //     })
            //     return fullname === e.target.value ? setCollaborators([...collaborators, users[i]]) : ''
            // })
            setForm({ 
                ...form, [e.target.name]: e.target.value
            })
        } else if (id === 'event') {
            setForm({ 
                ...form, [e.target.name]: e.target.value
            })
        }
    }

    console.log(form);
    
    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                <h3 className={Styles.heading}>{ heading }</h3>
                {
                    data ?
                    data.map(({type, name, label}, i) => {
                        if (type === 'textarea') {
                            return (
                                <div key={ i } className={Styles.item}>
                                <textarea 
                                    className={Styles.input} 
                                    name={ name } 
                                    placeholder={ label } 
                                    onChange={changeHandler} 
                                    autoComplete="off">
                                </textarea>
                            </div>
                            )
                        }
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
                {/* {
                    users ?
                    <div className={`${Styles.item} ${Styles.relative}`}>
                        <select className={Styles.select} name="users" onChange={changeHandler}>
                            <option>Коллабораторы</option>
                            {
                                users.map(({fullname}, i) => {
                                    return (
                                        <option key={ i }>{ fullname }</option>
                                    )
                                })
                            }
                        </select>
                        <i className={`material-icons ${Styles.icon}`}>play_arrow</i>
                    </div> : ''
                } */}
                {/* {
                    collaborators ?
                    <div className={Styles.collaborators}>
                        {
                            collaborators.map(({fullname}, i) => {
                                return (
                                    <div key={ i } className={Styles.card}>
                                        <p>
                                            { fullname }
                                            <button><i className={`material-icons ${Styles.cancel}`}>clear</i></button>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div> : ''
                } */}
                <button type="submit" onClick={() => {createUser()}} className={Styles.submit}>Создать</button>
            </div>
        </div>
    )
}