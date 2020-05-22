// import React from 'react'

export async function userLogin(url = "", data={}) {

    const endpoint = "/user/login"
    url += endpoint;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });


    return response.json();
}
export async function apiAccessGet(url = "", endpoint = "", implementMethod = "", token = "") {
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
    else if (implementMethod === "GET" && token !== "") {
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

export async function apiAccessPost(url = "", endpoint = "", implementMethod = "", token = "", data = {}) {
    // url = "";
    // data = {};
    // token = "";
    // implementMethod = ""
    // endpoint = "";

    url += endpoint;

    let response;

    if (implementMethod === "POST" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    else if (implementMethod === "POST" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            body: JSON.stringify(data)
        });
    }

    return response.json();
}

export async function apiAccessPatch(url = "", endpoint = "", implementMethod = "", token = "", data = {}) {
    // url = "";
    // data = {};
    // token = "";
    // implementMethod = ""
    // endpoint = "";

    url += endpoint;

    let response;

    if (implementMethod === "PATCH" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    else if (implementMethod === "PATCH" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            body: JSON.stringify(data)
        });
    }

    return response.json();
}

export async function apiAccessDelete(url = "", endpoint = "", implementMethod = "", token = "") {
    // url = "";
    // data = {};
    // token = "";
    // implementMethod = ""
    // endpoint = "";

    url += endpoint;

    let response;

    if (implementMethod === "DELETE" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    else if (implementMethod === "DELETE" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
        });
    }

    return response.json();
}

export default {userLogin,apiAccessGet,apiAccessPost,apiAccessPatch,apiAccessDelete}
