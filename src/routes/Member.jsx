import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../api/server'
import classes from './Member.module.css'

function formatNumber(num) {
    return num < 10 ? '0' + num : num
}

function formatDateTime(sDateStr) {

    const token = sDateStr.split(" ")
    sDateStr = [token[0], token[1]].join("T")

    const odate = new Date(sDateStr)

    const syear = odate.getFullYear()
    let smonth = odate.getMonth() + 1
    let sdate = odate.getDate()

    smonth = formatNumber(smonth)
    sdate = formatNumber(sdate)

    let shour = odate.getHours()
    let sminute = odate.getMinutes()

    shour = formatNumber(shour)
    sminute = formatNumber(sminute)

    return [[syear, smonth, sdate].join("-"), [shour, sminute].join(":")].join(" ")
    

}

export default function Member() {

    const navigate = useNavigate()

    const {state: {icon, name, group}} = useLocation()

    const { memberId } = useParams()

    const [page, setPage] = React.useState(0)
    
    const { isLoading, error, data } = useQuery(['data', memberId, page], fetchData)

    const handleExit = () => {

        navigate(-1)
    
    }

    const handlePrev = () => {
        if(!data) return
        if(page === 0) return
        let newPage = page - 1
        if(newPage < 0) newPage = 0
        setPage(newPage)
    }

    const handleNext = () => {
        if(!data) return
        if(page >= data.pages - 1) return
        let newPage = page + 1
        if(newPage >= data.pages - 1) newPage = data.pages - 1
        setPage(newPage)
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
                <div className={classes.data}>
                    <div className={classes.dataContainer}>
                        {
                            data &&
                            data.items.map((item, index) => {
                                return (
                                    <div key={item._id} className={classes.dataItem}>
                                        <div className={classes.dataInner}>
                                            <div className={classes.dataDateTime}>{formatDateTime(item.dateTime)}</div>
                                            <div className={classes.dataText}>{item.data}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{
                        color: (!data || (data && page === 0)) ? '#fff3' : '#fff'
                    }} className={classes.leftButton} onClick={handlePrev}>
                        <span>&#10094;</span>
                    </div>
                    <div style={{
                        color: (!data || (data && data.pages === 0) || (data && page === data.pages - 1)) ? '#fff3' : '#fff'
                    }} className={classes.rightButton} onClick={handleNext}>
                        <span>&#10095;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}