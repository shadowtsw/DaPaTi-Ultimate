// import React from 'react'

async function apiAccess(url = "",endpoint="",implementMethod = "", token = "",data = {}) {
    // url = "";
    // data = {};
    // token = "";
    // implementMethod = ""
    // endpoint = "";

    url += endpoint;
    
    let response;

    if (implementMethod === "GET" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            // body: data
        });
    }
    else if (implementMethod === "GET" && token !== ""){
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            // body: data
        });
    }
    // else if (implementMethod === "GET" && token !== ""){

    // }


    // if (data !== {}) {
    //     data = JSON.stringify(data)
    // }

    return response.json();
}

export default apiAccess
