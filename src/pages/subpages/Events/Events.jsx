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

    console.log(events);

    return (
        <div className={Styles.events}>
            <h2 className={Styles.heading}>События</h2>
        </div>
    )
}