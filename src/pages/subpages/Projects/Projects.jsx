import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import Styles from './Projects.module.css'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export const Projects = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
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

    console.log(projects);

    if (loading) {
        return (
            <>
                <h2 className={Styles.heading}>Проекты</h2>
                <div className={Styles.loading}></div>
            </>
        )
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
                        {projects.map(({id, project, users}, i) => {
                            let names = []
                            let date = new Date(project.dateCreated)
                            return (
                                <VerticalTimelineElement
                                    key={i}
                                    className={Styles.element}
                                    contentStyle={project.isCompleted === 1 ? { background: '#00ff00', color: '#000' } : { background: 'purple', color: '#fff' }}
                                    contentArrowStyle={project.isCompleted === 1 ? { borderRight: '7px solid #00ff00' } : { borderRight: '7px solid purple' }}
                                    iconStyle={project.isCompleted === 1 ? { background: '#00ff00', color: '#000' } : { background: 'purple', color: '#fff' }}
                                    dateClassName={`${Styles.date} ${Styles.white}`}
                                    date={project.description}
                                    icon={project.isCompleted === 1 ? <i className={`material-icons ${Styles.icon}`}>done</i> : <i className={`material-icons ${Styles.icon}`}>autorenew</i>}
                                    iconClassName={Styles.circle}
                                >
                                    <h3>{project.title}</h3>
                                    <p>{users.map(({fullname}) => {names.push(fullname)})} {names.join(', ') || 'Нет коллабораторов'}</p>
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