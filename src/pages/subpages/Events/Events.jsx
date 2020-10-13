import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Styles from './Events.module.css'

export const Events = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
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

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>События</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.events}>
            <h2 className={Styles.heading}>События</h2>
            {
                events ?
                <div className={Styles.block}>
                    {
                        events.map(({title, dateAdded, description}, i) => {
                            let date = new Date(dateAdded)

                            return(
                                <div key={ i } className={Styles.item}>
                                    <p className={Styles.date}>
                                        <span>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</span>
                                        <i className={`material-icons ${Styles.icon}`}>push_pin</i>
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