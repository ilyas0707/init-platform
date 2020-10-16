import React, { useState } from 'react'
import { Form } from '../../../components/Form/Form'
import Styles from './Create.module.css'

export const Create = () => {
    const [opened, setOpened] = useState(0)

    const User = [
        { type: "text", name: "fullname", label: "Имя"},
        { type: "text", name: "gender", label: "Пол"},
        { type: "email", name: "email", label: "Email"},
        { type: "number", name: "phoneNumber", label: "Номер телефона"},
        { type: "text", name: "role", label: "Роль"},
        { type: "text", name: "login", label: "Логин"},
        { type: "text", name: "password", label: "Пароль"},
    ]
    const Project = [
        { type: "text", name: "title", label: "Название"},
        { type: "text", name: "description", label: "Описание"},
        { type: "date", name: "deadline", label: "Дедлайн"}
    ]
    const Event = [
        { type: "text", name: "title", label: "Название"},
        { type: "text", name: "description", label: "Описание"}
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Пользователя' }, { name: 'Проект' }, { name: 'Событие' }
    ]

    const tabs = [
        { data: User, heading: 'Создать пользователя' },
        { data: Project, heading: 'Создать проект' },
        { data: Event, heading: 'Создать событие' }
    ]

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
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
                tabs.map(({data, heading}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form data={ data } heading={ heading } />
                        </div>
                    )
                })
            }
        </div>
    )
}