import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import Styles from './Employees.module.css'

import Man from './../../../assets/images/man.png'
import Woman from './../../../assets/images/woman.png'

export const Employees = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const history = useHistory()
    const [employees, setEmployees] = useState([])
    const [opened, setOpened] = useState(0)

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/user/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setEmployees(result.object)
                    localStorage.setItem('allUsers', JSON.stringify({ users: result }))
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const deleteUser = useCallback(async (id) => {
        const pass = window.confirm("Вы уверенны?");
        if (pass) {
            try {
                if (code) {
                    await request(`${API_URL}/user/delete/${id}`, "DELETE", null, {
                        Authorization: `Basic ${code.hashed}`
                    })
                    history.push("/panel/courses")
                    history.push("/panel/employees")
                }
            } catch (error) {}
        }
    }, [request, code, API_URL, history])

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Все' }, { name: 'Администрация' }, { name: 'Старшие менторы' }, { name: 'Младшие менторы' }
    ]

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>Сотрудники</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.employees}>
            <h2 className={Styles.heading}>Сотрудники</h2>
            <div className={Styles.tabs}>
                {
                    links.map(({name}, i) => {
                        return (
                            <a
                                key={ i }
                                href="/"
                                className={`${Styles.tab} ${opened === i ? Styles.active : ''}`}
                                onClick={e => {e.preventDefault(); openTab(i)}}>
                                { name }
                            </a>
                        )
                    })
                }
            </div>
            {
                employees ?
                <div className={Styles.block}>
                    <div className={`${Styles.item} ${opened === 1 ? Styles.active : ''} ${opened === 0 ? Styles.active : ''}`}>
                        <h3 className={Styles.title}>Администрация</h3>
                        {
                            // eslint-disable-next-line
                            employees.map(({id, fullname, level, gender}, i) => {
                                if (level === 4) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <button onClick={() => {deleteUser(id)}}><i className={`material-icons ${Styles.icon}`}>delete</i></button>
                                            {gender === 'male' ? 
                                            <img src={Man} alt="man" /> :
                                            <img src={Woman} alt="woman" />}
                                            <p className={Styles.name}>{ fullname }</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={`${Styles.item} ${opened === 2 ? Styles.active : ''} ${opened === 0 ? Styles.active : ''}`}>
                        <h3 className={Styles.title}>Старшие менторы</h3>
                        {
                            // eslint-disable-next-line
                            employees.map(({id, fullname, level, gender, course}, i) => {
                                if (level === 3) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <button onClick={() => {deleteUser(id)}}><i className={`material-icons ${Styles.icon}`}>delete</i></button>
                                            {gender === 'male' ? 
                                            <img src={Man} alt="man" /> :
                                            <img src={Woman} alt="woman" />}
                                            <p className={Styles.name}>{ fullname }</p>
                                            <p className={Styles.course}>{ course ? course.title : '' }</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={`${Styles.item} ${opened === 3 ? Styles.active : ''} ${opened === 0 ? Styles.active : ''}`}>
                        <h3 className={Styles.title}>Младшие менторы</h3>
                        {
                            // eslint-disable-next-line
                            employees.map(({id, fullname, level, gender, course}, i) => {
                                if (level === 2) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <button onClick={() => {deleteUser(id)}}><i className={`material-icons ${Styles.icon}`}>delete</i></button>
                                            {gender === 'male' ? 
                                            <img src={Man} alt="man" /> :
                                            <img src={Woman} alt="woman" />}
                                            <p className={Styles.name}>{ fullname }</p>
                                            <p className={Styles.course}>{ course ? course.title : '' }</p>
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