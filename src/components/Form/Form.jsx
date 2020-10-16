import React, { useState } from 'react'
import Styles from './Form.module.css'

export const Form = ({data, heading}) => {
    const [form, setForm] = useState({})

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                <h3 className={Styles.heading}>{ heading }</h3>
                {
                    data ?
                    data.map(({type, name, label}, i) => {
                        return (
                            <div key={ i } className={Styles.item}>
                                <input 
                                    type={ type }
                                    className={Styles.input}
                                    name={ name }
                                    placeholder={ label }
                                    autoComplete="off"
                                    onChange={changeHandler} />
                            </div>
                        )
                    }) : ''
                }
                <button type="submit" className={Styles.submit}>Создать</button>
            </div>
        </div>
    )
}