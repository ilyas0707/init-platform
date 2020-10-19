import React, { useEffect, useState } from 'react'
import { Form } from '../../../components/Form/Form'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Styles from './Create.module.css'

export const Create = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const [employees, setEmployees] = useState([])
    const [opened, setOpened] = useState(0)

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/user/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setEmployees(result.object)
                    localStorage.setItem('allUsers', JSON.stringify({ users: result }))
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const User = [
        { type: "text", name: "username", label: "Логин"},
        { type: "text", name: "password", label: "Пароль"},
        { type: "text", name: "fullname", label: "Имя"},
        { type: "email", name: "email", label: "Email"},
        { type: "number", name: "phoneNumber", label: "Номер телефона"},
    ]
    const Project = [
        { type: "text", name: "title", label: "Название"},
        { type: "date", name: "description", label: "Дедлайн"}
    ]
    const Event = [
        { type: "text", name: "title", label: "Название"},
        { type: "textarea", name: "description", label: "Описание"}
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
        { id: 'user', data: User, heading: 'Создать пользователя', select: select, url: 'user' },
        { id: 'project', data: Project, heading: 'Создать проект', users: employees, url: 'projects' },
        { id: 'event', data: Event, heading: 'Создать событие', url: 'api/news' }
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
                tabs.map(({id, data, heading, select, users, url}, i) => {
                    if (id === 'project' && loading) {
                        return (
                            <div key={ i } className={Styles.loading}></div>
                        )
                    }
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form id={ id } data={ data } heading={ heading } select={ select } users={ users } url={ url } />
                        </div>
                    )
                })
            }
        </div>
    )
}