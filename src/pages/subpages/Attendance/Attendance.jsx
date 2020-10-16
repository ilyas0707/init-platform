import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Fuse from "fuse.js"
import Styles from './Attendance.module.css'

import Man from './../../../assets/images/man.png'
import Woman from './../../../assets/images/woman.png'

export const Attendance = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const [employees, setEmployees] = useState([])
    const [search, setSearch] = useState("")
    const [form, setForm] = useState({})

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/user/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setEmployees(result.object)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setSearch(value)
    }

    const fuse = new Fuse(employees, {
        keys: [
            "fullname"
        ]
    })

    const results = fuse.search(search)
    const employeesFiltered = search ? results.map(result => result.item) : employees

    const takeAttendace = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const buttons = [
        { style: Styles.absent, icon: 'clear', status: 'absent' },
        { style: Styles.late, icon: 'timer', status: 'late' },
        { style: Styles.present, icon: 'done', status: 'present' }
    ]

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>Посещаемость</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.employees}>
            <style>
            
            </style>
            <h2 className={Styles.heading}>Посещаемость</h2>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="name" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            {
                employees ?
                <div className={Styles.block}>
                    <div className={Styles.item}>
                        {
                            // eslint-disable-next-line
                            employeesFiltered.map(({id, fullname, level, gender}, i) => {
                                if (level > 1) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <div className={Styles.main}>
                                                {gender === 'male' ? 
                                                <img src={Man} alt="man" /> :
                                                <img src={Woman} alt="woman" />}
                                                <p className={Styles.name}>{ fullname }</p>
                                                {
                                                    Object.keys(form).map((element, i) => (
                                                        element === fullname ? 
                                                        <p key={ i } className={`${Styles.status} ${
                                                            form[element] === 'absent' ? Styles.absentActive :
                                                            form[element] === 'late' ? Styles.lateActive :
                                                            form[element] === 'present' ? Styles.presentActive : ''
                                                        }`}></p> : undefined
                                                    ))
                                                }
                                            </div>
                                            <div className={Styles.buttons}>
                                                {
                                                    buttons.map(({style, icon, status}, i) => {
                                                        return (
                                                            <button 
                                                                key={ i }
                                                                className={style}
                                                                onClick={() => takeAttendace(fullname, status)}>
                                                                <i className={`material-icons ${Styles.icon}`}>{ icon }</i>
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={Styles.submit}>
                        <button type="submit" onClick={() => {setForm({})}}>Очистить</button>
                        <button type="submit">Отправить</button>
                    </div>
                </div> : ''
            }
        </div>
    )
}