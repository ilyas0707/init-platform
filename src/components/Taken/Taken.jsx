import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import Styles from './Taken.module.css'

export const Taken = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const [taken, setTaken] = useState([])

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/api/attendance/getToday`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setTaken(result.object)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    console.log(taken);

    if (loading) {
        return (
            <>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.taken}>
            {
                taken ?
                <div className={Styles.block}>
                    <div className={Styles.item}>
                        {
                            // eslint-disable-next-line
                            taken.map(({status, user}, i) => {
                                if (user.level > 1) {
                                    return (
                                        <div className={Styles.card} key={ i }>
                                            <div className={Styles.main}>
                                                <p className={Styles.name}>{ user.fullname }</p>
                                                <p className={
                                                    `
                                                        ${Styles.status}
                                                        ${
                                                            status === 0 ? Styles.absentActive :
                                                            status === 1 ? Styles.lateActive :
                                                            status === 2 ? Styles.presentActive : ''
                                                        }
                                                    `
                                                }></p>
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