import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory } from 'react-router-dom';
import Styles from './Projects.module.css'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useCallback } from 'react';

export const Projects = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const history = useHistory()
    const [projects, setProjects] = useState()

    useEffect(() => {
        try {
            if (code) {
                request(`${API_URL}/projects/getAll`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setProjects(result.object)
                })
            }
        } catch (e) {}
    }, [request, API_URL, code])

    const deleteProject = useCallback(async (id) => {
        const pass = window.confirm("Вы уверенны?");
        if (pass) {
            try {
                if (code) {
                    await request(`${API_URL}/projects/delete/${id}`, "DELETE", null, {
                        Authorization: `Basic ${code.hashed}`
                    })
                    history.push("/panel/courses")
                    history.push("/panel/projects")
                }
            } catch (error) {}
        }
    }, [request, code, API_URL, history])

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>Проекты</h2>
                <div className={Styles.loading}></div>
            </>
        )
    }
    if (projects) {
        if (projects.length === 0) {
            return (
                <div className={Styles.projects}>
                    <h2 className={Styles.heading}>Проекты</h2>
                    <p className={Styles.empty}>Нет проектов!</p>
                </div>
            )
        }
    }
    return (
        <div className={Styles.projects}>
            <h2 className={Styles.heading}>Проекты</h2>
            <VerticalTimeline
                className={Styles.timeline}
                animate={true}
            >
                {
                    projects ?
                    <div className={Styles.block}>
                        {projects.map(({project, users}, i) => {
                            let names = []
                            let date = new Date(project.dateCreated)
                            return (
                                <VerticalTimelineElement
                                    key={i}
                                    className={Styles.element}
                                    contentStyle={project.isCompleted === 1 ? { background: '#00ff00', color: '#000' } : { background: '#641885', color: '#fff' }}
                                    contentArrowStyle={project.isCompleted === 1 ? { borderRight: '7px solid #00ff00' } : { borderRight: '7px solid #641885' }}
                                    iconStyle={project.isCompleted === 1 ? { background: '#00ff00', color: '#000' } : { background: '#641885', color: '#fff' }}
                                    dateClassName={`${Styles.date} ${project.isCompleted === 1 ? Styles.black : Styles.white}`}
                                    date={project.description}
                                    icon={project.isCompleted === 1 ? <i className={`material-icons ${Styles.icon}`}>done</i> : <i className={`material-icons ${Styles.icon}`}>autorenew</i>}
                                    iconClassName={Styles.circle}
                                >
                                    <h3 className={Styles.title}>
                                        {project.title}
                                        <button onClick={() => {deleteProject(project.id)}}><i className={`material-icons ${project.isCompleted === 1 ? Styles.black : Styles.white}`}>delete</i></button>
                                    </h3>
                                    {/* <p>
                                        {
                                            // eslint-disable-next-line
                                            users.map(({fullname}) => {names.push(fullname)})} {names.join(', ') || 'Нет коллабораторов'
                                        }
                                    </p> */}
                                    <p className={Styles.created}>Дата создания: 
                                        <span>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</span>
                                    </p>
                                </VerticalTimelineElement>
                            )
                        })}
                    </div> : ''
                }
            </VerticalTimeline>
        </div>
    )
}