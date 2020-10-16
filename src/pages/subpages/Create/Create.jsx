import React, { useState } from 'react'
import { Form } from '../../../components/Form/Form'
import Styles from './Create.module.css'

export const Create = () => {
    const [opened, setOpened] = useState(0)

    const User = [
        { type: "text", name: "username", label: "Логин"},
        { type: "text", name: "password", label: "Пароль"},
        { type: "text", name: "fullname", label: "Имя"},
        { type: "email", name: "email", label: "Email"},
        { type: "number", name: "phoneNumber", label: "Номер телефона"},
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

    const select = [
        { name: "gender", options: [
            { label: 'Пол', id: 'undefined' }, 
            { label: 'Мужской', id: 'male' }, 
            { label: 'Женский', id: 'female' } 
        ] },
        { name: "level", options: [
            { label: 'Статус', id: 0 }, 
            { label: 'Ученик', id: 1 }, 
            { label: 'Младший ментор', id: 2 }, 
            { label: 'Старший ментор', id: 3 }, 
            { label: 'Администратор', id: 4 }
        ] },
        { name: "courseId", options: [
            { label: 'Курс', id: 0 }, 
            { label: 'JavaScript', id: 'JavaScript' }, 
            { label: 'Java', id: 'Java' }, 
            { label: 'Python', id: 'Python' }
        ] },
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Пользователя' }, { name: 'Проект' }, { name: 'Событие' }
    ]

    const tabs = [
        { data: User, heading: 'Создать пользователя', select: select },
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
                tabs.map(({data, heading, select}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form data={ data } heading={ heading } select={select} />
                        </div>
                    )
                })
            }
        </div>
    )
}