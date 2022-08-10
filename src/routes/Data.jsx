import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postData } from '../api/server'
import classes from './Data.module.css'

export default function Data() {

    const navigate = useNavigate()

    const {state: {icon, name, group}} = useLocation()

    const { memberId } = useParams()

    const queryClient = useQueryClient()

    const mutation = useMutation((data) => {
        return postData(data)
    }, {
        onSuccess: (data, variable, context) => {
            
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
                    <div className={classes.group}><span>{group}</span></div>
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