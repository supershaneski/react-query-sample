
export async function fetchGroups() {

    const url = `${import.meta.env.VITE_BASEURL}/group`

    const response = await fetch(url)

    const result = await response.json()

    return result
    
}

export async function fetchMembers({ queryKey }) {

    const url = `${import.meta.env.VITE_BASEURL}/member?groupId=${queryKey[1]}`

    const response = await fetch(url)

    const result = await response.json()

    return result

}

export async function fetchData({ queryKey }) {

    const url = `${import.meta.env.VITE_BASEURL}/data?memberId=${queryKey[1]}&page=${queryKey[2]}`

    const response = await fetch(url)

    const result = await response.json()

    return result

}