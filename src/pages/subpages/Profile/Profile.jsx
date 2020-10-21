import React from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import Styles from './Profile.module.css'

import Man from './../../../assets/images/man.png'
import Woman from './../../../assets/images/woman.png'
import { NavLink } from 'react-router-dom'

export const Profile = () => {
    const { profile } = useAuth()
    const user = profile.object
    const admin = profile.userRole

    if (admin) {
        return (
            <div className={Styles.profile}>
                <div className={Styles.card}>
                    <div className={Styles.avatar}>
                        {user.gender === 'male' ? 
                        <img src={Man} alt="man" /> :
                        <img src={Woman} alt="woman" />}
                    </div>
                    <div className={Styles.info}>
                        <ul>
                            <li className={Styles.item}>
                                {user.fullname || 'Полное имя'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>email</i>
                                {user.email || 'example@gmail.com'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>phone</i>
                                {`+996${user.phoneNumber || '700000000'}`}
                            </li>
                            <li className={Styles.item}>
                                { user.course ? user.course.title || 'Курс' : ''}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Styles.buttons}>
                    { 
                        admin.length > 1 ? 
                        <NavLink activeClassName={Styles.active} to={`/panel/create`}>
                            <i className={`material-icons ${Styles.icon}`}>create</i>
                            <span className={Styles.text}>Создать</span>
                        </NavLink> : ''
                    }
                    <NavLink activeClassName={Styles.active} to={`/panel/changePassword`}>
                        <i className={`material-icons ${Styles.icon}`}>vpn_key</i>
                        <span className={Styles.text}>Изменить пароль</span>
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}