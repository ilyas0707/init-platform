import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Styles from './Events.module.css'

export const Events = () => {
    const { profile, code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const history = useHistory()
    const [events, setEvents] = useState()

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/api/news/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setEvents(result.object)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const deleteEvent = useCallback(async (id) => {
        const pass = window.confirm("Вы уверенны?");
        if (pass) {
            try {
                if (code) {
                    await request(`${API_URL}/api/news/delete/${id}`, "DELETE", null, {
                        Authorization: `Basic ${code.hashed}`
                    })
                    history.push("/panel/courses")
                    history.push("/panel/events")
                }
            } catch (error) {}
        }
    }, [request, code, API_URL, history])

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>События</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    if (events) {
        if (events.length === 0) {
            return (
                <div className={Styles.events}>
                    <h2 className={Styles.heading}>События</h2>
                    <p className={Styles.empty}>Нет событий!</p>
                </div>
            )
        }
    }
    return (
        <div className={Styles.events}>
            <h2 className={Styles.heading}>События</h2>
            {
                events ?
                <div className={Styles.block}>
                    {
                        events.map(({id, title, dateAdded, description}, i) => {
                            let date = new Date(dateAdded)

                            return(
                                <div key={ i } className={Styles.item}>
                                    <p className={Styles.date}>
                                        <span>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</span>
                                        <span className={Styles.buttons}>
                                            {
                                                profile.userRole.length > 1 ?
                                                <button className={Styles.delete} onClick={() => {deleteEvent(id)}}><i className={`material-icons ${Styles.icon}`}>delete</i></button> : ''
                                            }
                                            <i className={`material-icons ${Styles.icon}`}>push_pin</i>
                                        </span>
                                    </p>
                                    <div className={Styles.main}>
                                        <h3 className={Styles.title}>{ title }</h3>
                                        <p className={Styles.description}>{ description }</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : ''
            }
        </div>
    )
}