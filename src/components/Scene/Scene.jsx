import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Profile } from '../../pages/subpages/Profile/Profile'
import { Courses } from '../../pages/subpages/Courses/Courses'
import { Projects } from '../../pages/subpages/Projects/Projects'
import { Attendance } from '../../pages/subpages/Attendance/Attendance'
import { Events } from '../../pages/subpages/Events/Events'
import { Employees } from '../../pages/subpages/Employees/Employees'
import { Create } from '../../pages/subpages/Create/Create'
import { ChangePassword } from '../../pages/subpages/ChangePassword/ChangePassword'

import Styles from './Scene.module.css'
export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Switch>
                <Route path="/panel/profile" exact>
                    <Profile />
                </Route>
                <Route path="/panel/courses" exact>
                    <Courses />
                </Route>
                <Route path="/panel/projects" exact>
                    <Projects />
                </Route>
                <Route path="/panel/attendance" exact>
                    <Attendance />
                </Route>
                <Route path="/panel/events" exact>
                    <Events />
                </Route>
                <Route path="/panel/employees" exact>
                    <Employees />
                </Route>
                <Route path="/panel/create" exact>
                    <Create />
                </Route>
                <Route path="/panel/changePassword" exact>
                    <ChangePassword />
                </Route>
            </Switch>
        </div>
    )
}