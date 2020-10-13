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
    const [form, setForm] = useState("")

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

    const fuse = new Fuse(employees, {
        keys: [
            "fullname"
        ]
    })

    const results = fuse.search(form)
    const employeesFiltered = form ? results.map(result => result.item) : employees

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

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
                                            </div>
                                            <div className={Styles.buttons}>
                                                <button className={Styles.absent}><i className={`material-icons ${Styles.icon}`}>clear</i></button>
                                                <button className={Styles.present}><i className={`material-icons ${Styles.icon}`}>done</i></button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div> : ''
            }
        </div>
    )
}