import React, { useState } from 'react'
import { Form } from '../../../components/Form/Form'
import Styles from './Create.module.css'

export const Create = () => {
    const [User, setUser] = useState([
        { row: 'fullname' }, 
        { row: 'login' },
        { row: 'email' }, 
        { row: 'password' },
        { row: 'gender' },
    ])
    const [Project, setProject] = useState([
        { row: 'title' }, { row: 'description' }, { row: 'deadline' }
    ])
    const [Event, setEvent] = useState([
        { row: 'title' }, { row: 'description' }
    ])

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
            <Form user={{User, setUser}} />
            <Form project={{Project, setProject}} />
            <Form event={{Event, setEvent}} />
        </div>
    )
}