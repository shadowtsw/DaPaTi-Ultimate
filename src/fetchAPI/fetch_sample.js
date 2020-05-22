// import React from 'react'

async function apiAccess(url = "", data = {}, token = null, implementMethod = "GET") {
    let headersContent={};

    if (token !== null) {
        headersContent = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${token}`
        }
    } else {
        headersContent = {
            'Content-Type': 'application/json',
        }
    }

    if (data !== {}) {
        data = JSON.stringify(data)
    }

    console.log(headersContent)

    const response = await fetch(url, {
        method: implementMethod,
        headers: headersContent,
        body: data
    });
    return response.json();
}

export default apiAccess
