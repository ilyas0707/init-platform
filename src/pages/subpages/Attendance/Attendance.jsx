import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import { useSuccess } from '../../../hooks/success.hook'
import { useError } from '../../../hooks/error.hook'
import { Taken } from './../../../components/Taken/Taken'
import Styles from './Attendance.module.css'

import Man from './../../../assets/images/man.png'
import Woman from './../../../assets/images/woman.png'

export const Attendance = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [employees, setEmployees] = useState([])
    const [opened, setOpened] = useState(0)
    const [form, setForm] = useState({})
    const [final, setFinal] = useState([])

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/user/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setEmployees(result.object)
                    let test = {}
                    result.object.forEach((item) => {
                        if (item.level > 1) {
                            test[item.id] = 0
                        }
                    })
                    setForm(test)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const takeAttendace = (id, value) => {
        setForm({ ...form, [id]: value })
    }

    const checkAttendance = () => {
        setFinal(
            Object.keys(form).map((element) => {
                return {'userId': +element, 'status': form[element]}
            })
        )
    }

    const postAttendance = async () => {
        try {
            const data = await request(`${API_URL}/api/attendance/save`, "POST", final, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(data.message)
        } catch (e) {
            errorMessage("Ошибка!")
        }
    }

    const buttons = [
        { style: Styles.absent, icon: 'clear', status: 0 },
        { style: Styles.late, icon: 'timer', status: 1 },
        { style: Styles.present, icon: 'done', status: 2 }
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Отметить' }, { name: 'Отмеченное' }
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
            <h2 className={Styles.heading}>Посещаемость</h2>
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
                <div className={`${Styles.block} ${opened === 0 ? Styles.active : ''}`}>
                    <div className={Styles.item}>
                        {
                            // eslint-disable-next-line
                            employees.map(({id, fullname, level, gender}, i) => {
                                if (level > 1) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <div className={Styles.main}>
                                                {gender === 'male' ? 
                                                <img src={Man} alt="man" /> :
                                                <img src={Woman} alt="woman" />}
                                                <p className={Styles.name}>{ fullname }</p>
                                                {
                                                    Object.keys(form).map((element, i) => {
                                                        return (
                                                            +element === id ? 
                                                            <p key={ i } className={`${Styles.status} ${
                                                                form[element] === 0 ? Styles.absentActive :
                                                                form[element] === 1 ? Styles.lateActive :
                                                                form[element] === 2 ? Styles.presentActive : ''
                                                            }`}></p> : undefined
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={Styles.buttons}>
                                                {
                                                    buttons.map(({style, icon, status}, i) => {
                                                        return (
                                                            <button 
                                                                key={ i }
                                                                className={style}
                                                                onClick={() => {takeAttendace(id, status); setFinal([])}}>
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
                    {
                        final.length > 0 ?
                        <div style={{marginBottom: '40px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            {
                                final.map(({userId, status}, i) => {
                                    return (
                                        <div key={ i } className={`${Styles.check} ${status === 0 ? Styles.absentActive : status === 1 ? Styles.lateActive : status === 2 ? Styles.presentActive : ''}`}>
                                            <p>{
                                                employees.map(({id, fullname}) => {
                                                    return userId === id ? fullname : ''
                                                })
                                            }</p>
                                        </div>
                                    )
                                })
                            }
                        </div> : ''
                    }
                    <div className={Styles.submit}>
                        <button onClick={() => {checkAttendance()}}>Проверить</button>
                        {
                            final.length > 0 ?
                            <button type="submit" onClick={() => {postAttendance()}}>Отправить</button> : ''
                        }
                    </div>
                </div> : ''
            }
            <div className={`${Styles.block} ${opened === 1 ? Styles.active : ''}`}>
                <Taken />
            </div>
        </div>
    )
}