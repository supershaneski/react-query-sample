import React from 'react'
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { fetchData, postData } from '../api/server'
import classes from './Data.module.css'

function DataFlux() {
    const [data, setData] = React.useState((new Date()).toLocaleTimeString())
    React.useEffect(() => {
        const flux = setInterval(() => {
            setData((new Date()).toLocaleTimeString())
        }, 1000)
        return () => {
            clearInterval(flux)
        }
    }, [])
    return <span>{data}</span>
}

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

//const queryClient = new QueryClient()

export default function Data() {

    const navigate = useNavigate()

    const {state: {icon, name, group}} = useLocation()

    const { memberId } = useParams()

    const queryClient = useQueryClient()

    const mutation = useMutation((data) => {
        return postData(data)
    }, {
        onSuccess: (data, variable, context) => {
            
            /*queryClient.invalidateQueries({
                predicate: query => query.queryKey[0] === 'data' && query.queryKey[1] === memberId && query.queryKey[2] >= 0,
            })*/

            queryClient.invalidateQueries(['data'])

            setTimeout(callMeBaby, 1000)
            
        },
    })

    const [textData, setTextData] = React.useState('')

    const handleExit = () => {

        console.log((new Date()).toLocaleTimeString(), "exit")

        navigate('/')
    
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleSubmit = () => {

        mutation.mutate({
            memberId,
            data: textData,
        })

    }

    const callMeBaby = () => {

        console.log((new Date()).toLocaleTimeString(), "success")
        
        navigate(`/member/${memberId}`, {
            replace: true,
            state: {
                icon,
                name,
                group,
            }
        })

        //navigate(-1)
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.member}>
                    <div className={classes.icon}><span>{icon}</span></div>
                    <div className={classes.name}><span>{name}</span></div>
                    <div className={classes.group}><span>{group}</span><DataFlux /></div>
                </div>
                <div className={classes.exit} onClick={handleExit}>
                    <span>&#215;</span>
                </div>
                <div className={classes.data}>
                    <div className={classes.form}>
                        <div className={classes.content}>
                            <label className={classes.label}>Add Data</label>
                            <textarea disabled={mutation.isLoading} value={textData} onChange={(e) => setTextData(e.target.value)} className={classes.text} rows={6} placeholder='Write text here'></textarea>
                        </div>
                        {
                            mutation.isError &&
                            <div className={classes.error}>
                                <span>Something went wrong. Please try again.</span>
                            </div>
                        }
                        {
                            mutation.isSuccess &&
                            <>
                                <div className={classes.success}>
                                    <span>Data added...</span>
                                </div>
                            </>
                        }
                        <div className={classes.action}>
                            <button disabled={mutation.isLoading} onClick={handleSubmit} className={classes.button}>Submit Data</button>
                            <button disabled={mutation.isLoading} onClick={handleGoBack} className={classes.button}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}