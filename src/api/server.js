/**
 * @returns { status, total, items }
 * @items [{ id, name }, { id, name }, ...]
 */
export async function fetchGroups() {

    const url = `${import.meta.env.VITE_BASEURL}/group`

    const response = await fetch(url)
    
    console.log("group status", response.status)

    const result = await response.json()

    return result
    
}

/**
 * @returns { status: 200, total: itemsTotal, items: items }
 * @items [{ id, groupId, name }, { id, groupId, name }, ...]
 */
export async function fetchMembers({ queryKey }) {

    const url = `${import.meta.env.VITE_BASEURL}/member?groupId=${queryKey[1]}`

    const response = await fetch(url)

    console.log("member status " + queryKey[1], response.status)

    const result = await response.json()

    return result

}

/**
 * @returns { status: 200, id: memberId, page: page, pages: pageTotal, total: itemsTotal, items: items }
 * @items [{ _id, memberId, data, dateTime }, { _id, memberId, data, dateTime }, ...]
 */
export async function fetchData({ signal, queryKey }) {

    const url = `${import.meta.env.VITE_BASEURL}/data?memberId=${queryKey[1]}&page=${queryKey[2]}`

    const response = await fetch(url, { signal })

    console.log("data status", queryKey[1], queryKey[2], response.status)

    const result = await response.json()

    return result

}