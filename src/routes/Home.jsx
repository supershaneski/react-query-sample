import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query'

import { fetchGroups } from '../api/server'

import classes from './Home.module.css'

import Members from '../components/Members'

import AppContext from '../lib/AppContext'

//const queryClient = new QueryClient()

export default function Home() {

    const navigate = useNavigate()

    const appState = React.useContext(AppContext)

    const groupRef = React.useRef()

    const queryClient = useQueryClient()

    const { isLoading, error, data, refetch } = useQuery(['groups'], fetchGroups, {
        staleTime: parseInt(import.meta.env.VITE_STALETIME),
        cacheTime: parseInt(import.meta.env.VITE_CACHETIME),
        //refetchOnMount: false,
        //refetchOnWindowFocus: false,
    })

    /*
    React.useEffect(() => {

        queryClient.cancelQueries('data')

    }, [])
    */

    // TODO: 
    // Save the scroll position in some global state.
    // For now, I am using localStorage for quick implementation.
    React.useEffect(() => {
        
        if(data?.items) {

            let scroll = appState.scroll //localStorage.getItem("scroll")
            if(scroll) {
                
                scroll = parseInt(scroll)

                if(scroll > 0 && groupRef.current.scrollTop === 0) {
                    groupRef.current.scrollTop = scroll
                }
            }

        }

    }, [data])

    const handleClickMember = ({id, groupId, icon, name}) => {
        
        // TODO: 
        // Save the scroll position in some global state.
        // For now, I am using localStorage for quick implementation.
        //localStorage.setItem("scroll", groupRef.current.scrollTop)
        appState.setScroll({ scroll: groupRef.current.scrollTop })

        const group = data.items.find(item => item.id === groupId)?.name

        //queryClient.cancelQueries("groups")

        navigate(`/member/${id}`, {
            state: {
                icon,
                name,
                group,
            }
        })

    }

    const handleReload = () => {

        refetch()

    }

    const handleAdd = () => {
        
        navigate(`/member/add`)

    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div ref={groupRef} className={classes.groupList}>
                {
                    (isLoading && !error) &&
                    <div className={classes.loader}>
                        <span>Please wait. Loading...</span>
                    </div>
                }
                {
                    (!isLoading && error) &&
                    <div className={classes.error}>
                        <p>Error: {error.message}<br /><br />
                        <button onClick={handleReload}>Reload</button>
                        </p>
                    </div>
                }
                {
                    (!isLoading && !error && data) &&
                    data.items.map(group => {
                        return (
                            <div key={group.id} className={classes.groupContainer}>
                                <div className={classes.group}>
                                    <span>{group.name}</span>
                                </div>
                                <Members groupId={group.id} onClick={handleClickMember} />
                            </div>
                        )
                    })
                }
                </div>
                <div className={classes.fab}>
                    <button className={classes.button} onClick={handleAdd}>&#43;</button>
                </div>
            </div>
        </div>
    )
}