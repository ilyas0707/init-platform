import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Styles from './Courses.module.css'

import JS from './../../../assets/icons/js.png'
import Python from './../../../assets/icons/py.png'
import Java from './../../../assets/icons/jv.png'

export const Courses = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const [courses, setCourses] = useState()

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/api/course/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setCourses(result.object)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    function iconHandler(title) {
        if (title === 'Javascript') {
            return <img src={JS} alt="javascript"/>
        } else if (title === 'Python') {
            return <img src={Python} alt="python"/>
        } else {
            return <img src={Java} alt="java"/>
        }
    }

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>Курсы</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.courses}>
            <h2 className={Styles.heading}>Курсы</h2>
            {
                courses ?
                <div className={Styles.block}>
                    {courses.map(({id, title, duration}, i) => {
                        return (
                            <div className={Styles.course} key={ i }>
                                <div className={Styles.info}>
                                    <h3 className={Styles.title}>{ title }</h3>
                                    <p className={Styles.duration}>
                                        <i className={`material-icons ${Styles.icon}`}>watch_later</i>
                                        <span>{duration}</span> месяца
                                    </p>
                                </div>
                                <div className={Styles.logo}>
                                    {iconHandler(title)}
                                </div>
                            </div>
                        )
                    })}
                </div> : ''
            }
        </div>
    )
}