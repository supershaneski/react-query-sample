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

    console.log("data status", queryKey[1], queryKey[2], response.status, (new Date()).toLocaleTimeString())

    const result = await response.json()

    return result

}


function formatNumber(num) {
    return num < 10 ? '0' + num : num
}

function getDateTime() {

    const odate = new Date()

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

const getSimpleId = () => {
    return Math.random().toString(26).slice(2);
}

export async function postData({ memberId, data }) {

    const url = `${import.meta.env.VITE_BASEURL}/data`

    const token = `banana-${getSimpleId()}`

    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }

    /*const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Bearer ' + token,
    }*/

    const sdatetime = getDateTime()

    const options = {
        memberId,
        data,
        dateTime: getDateTime(),
    }

    const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(options)
    })

    console.log("post data status", response.status, (new Date()).toLocaleTimeString())

    const result = await response.json()

    return result

}

export async function postMember({ id, name, groupId }) {

    const url = `${import.meta.env.VITE_BASEURL}/member`

    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    const options = {
        id,
        name,
        groupId,
    }

    const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(options)
    })

    console.log("post member status", response.status, (new Date()).toLocaleTimeString())

    const result = await response.json()

    return result

}