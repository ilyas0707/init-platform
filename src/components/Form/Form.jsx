import React from 'react'
import Styles from './Form.module.css'

export const Form = (props) => {
    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                {
                    props.user ?
                    <div className={Styles.item}>
                        <h3>Создание пользователя</h3>
                        <form action="#" className={Styles.input}>
                            {
                                props.user.User.map(({row}, i) => {
                                    let placeholder = JSON.stringify(row)[1].toUpperCase()
                                    return (
                                        <input key={ i } type="text" name={row} placeholder={placeholder + row.substring(1)} />
                                    )
                                })
                            }
                            <button>Submit</button>
                        </form>
                    </div> : ''
                }
                {
                    props.project ?
                    <div className={Styles.item}>
                        <h3>Создание проекта</h3>
                        <form action="#" className={Styles.input}>
                            {
                                props.project.Project.map(({row}, i) => {
                                    let placeholder = JSON.stringify(row)[1].toUpperCase()
                                    return (
                                        <input key={ i } type="text" name={row} placeholder={placeholder + row.substring(1)} />
                                    )
                                })
                            }
                            <button>Submit</button>
                        </form>
                    </div> : ''
                }
                {
                    props.event ?
                    <div className={Styles.item}>
                        <h3>Создание события</h3>
                        <form action="#" className={Styles.input}>
                            {
                                props.event.Event.map(({row}, i) => {
                                    let placeholder = JSON.stringify(row)[1].toUpperCase()
                                    return (
                                        <input key={ i } type="text" name={row} placeholder={placeholder + row.substring(1)} />
                                    )
                                })
                            }
                            <button>Submit</button>
                        </form>
                    </div> : ''
                }
            </div>
        </div>
    )
}