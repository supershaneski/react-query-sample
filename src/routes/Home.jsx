import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { fetchGroups, fetchMembers } from '../api/server'

import classes from './Home.module.css'

import Members from '../components/Members'

export default function Home() {

    const navigate = useNavigate()

    const groupRef = React.useRef()

    const { isLoading, error, data } = useQuery(['groups'], fetchGroups)

    // Cheap way to set scroll position
    React.useEffect(() => {

        if(data?.items) {

            let scroll = localStorage.getItem("scroll")
            if(scroll) {
                
                scroll = parseInt(scroll)

                if(scroll > 0 && groupRef.current.scrollTop === 0) {
                    groupRef.current.scrollTop = scroll
                }
            }

        }

    }, [data])

    const handleClickMember = ({id, groupId, icon, name}) => {
        
        // Cheap way to save scroll position
        localStorage.setItem("scroll", groupRef.current.scrollTop)

        const group = data.items.find(item => item.id === groupId)?.name

        navigate(`/member/${id}`, {
            state: {
                icon,
                name,
                group,
            }
        })

    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div ref={groupRef} className={classes.groupList}>
                {
                    data &&
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
            </div>
        </div>
    )
}