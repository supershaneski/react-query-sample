import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMembers } from '../api/server'
import classes from './Members.module.css'

export default function Members({groupId, onClick}) {

    const { isLoading, isError, error, data } = useQuery(['members', groupId], fetchMembers, 
        {
            staleTime: parseInt(import.meta.env.VITE_STALETIME),
            cacheTime: parseInt(import.meta.env.VITE_CACHETIME),
            //refetchOnMount: false,
            //refetchOnWindowFocus: false,
        })

    if(isLoading) {
        return <div className={classes.container}>
            <span>Loading...</span>
        </div>
    }

    if(isError) {
        return <div className={classes.error}>
            <span>Error: {error.message}</span>
        </div>
    }

    return (
        <div className={classes.container}>
        {
            data &&
            data.items.map(member => {
                
                // Note:
                // The format of member name stored in my DB
                // is '🧑🏻 中田マリ', an emoticon and name separated by space.

                const token = member.name.split(" ")
                const icon = token[0]
                const name = member.name.replace(`${token[0]} `, '')
                
                return (
                    <div key={member.id} className={classes.member} 
                    onClick={() => onClick({
                        id: member.id,
                        groupId: member.groupId,
                        icon: icon,
                        name: name,
                    })}>
                        <div className={classes.icon}>
                            <span>{icon}</span>
                        </div>
                        <div className={classes.name}>
                            <span>{name}</span>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}