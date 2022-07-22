import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../api/server'
import classes from './Member.module.css'

export default function Member() {

    const navigate = useNavigate()

    const {state: {icon, name, group}} = useLocation()
    const { memberId } = useParams()
    
    const { isLoading, error, data } = useQuery(['data', memberId], fetchData)

    const handleExit = () => {

        navigate(-1)
    
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.member}>
                    <div className={classes.icon}><span>{icon}</span></div>
                    <div className={classes.name}><span>{name}</span></div>
                    <div className={classes.group}><span>{group}</span></div>
                </div>
                <div className={classes.exit} onClick={handleExit}>
                    <span>&#215;</span>
                </div>
                <div>
                {
                    data &&
                    data.items.map((item, index) => {
                        //console.log(item)
                        return (
                            <div key={index}>
                                <div>
                                    <span>{item.dateTime}</span>
                                    <span>{item.data}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}