import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchGroups, postMember } from '../api/server'

import classes from './Add.module.css'

const getSimpleId = () => {
    return Math.random().toString(26).slice(2);
}

export default function Add() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { isLoading, isError, error, data, refetch } = useQuery(['groups'], fetchGroups, {
        staleTime: parseInt(import.meta.env.VITE_STALETIME),
        cacheTime: parseInt(import.meta.env.VITE_CACHETIME),
        //refetchOnMount: false,
        //refetchOnWindowFocus: false,
    })

    const mutation = useMutation((data) => {
        return postMember(data)
    }, {
        onSuccess: () => {
            
            //queryClient.invalidateQueries(['members'])
            queryClient.invalidateQueries(['members', selGroup])
            
            setTimeout(handleSuccess, 1000)

        },
    })

    const [name, setName] = React.useState('')
    const [selGroup, setSelGroup] = React.useState('')
    
    React.useEffect(() => {

        if(data?.items.length) {

            const sid = data.items[0].id

            setSelGroup(sid)

        }

    }, [data])

    const handleSelect = (e) => {
        setSelGroup(e.target.value)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    const handleAdd = () => {

        mutation.mutate({
            id: getSimpleId(),
            name,
            groupId: selGroup,
        })

    }

    const handleSuccess = () => {
        navigate("/")
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.main}>
                    <h4 className={classes.title}>Add Member</h4>
                    <div className={classes.form}>
                        <label className={classes.label}>Name</label>
                        <input disabled={isLoading} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={classes.text} type="text" placeholder='Write your name' />
                    </div>
                    <div className={classes.form}>
                        <label className={classes.label}>Select Group</label>
                        {
                            isLoading &&
                            <div className={classes.loading}>
                                <span>Loading...</span>
                            </div>
                        }
                        {
                            isError &&
                            <div className={classes.loadError}>
                                <span>Error: {error.message}</span>
                            </div>
                        }
                        {
                            (!isLoading && !isError && data?.items.length) &&
                            <select value={selGroup} onChange={handleSelect} className={classes.select}>
                            {
                                data.items.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                            </select>
                        }
                    </div>
                    {
                        mutation.isError &&
                        <div className={classes.error}>
                            <span>Something went wrong!</span>
                        </div>
                    }
                    {
                        mutation.isSuccess &&
                        <div className={classes.success}>
                            <span>Member Added</span>
                        </div>
                    }
                    <div className={classes.action}>
                        <button onClick={handleAdd} disabled={name.length === 0 || isError || isLoading}>Submit</button>
                        <button disabled={isLoading} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}