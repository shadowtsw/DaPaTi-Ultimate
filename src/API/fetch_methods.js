export async function userLogin(url = "", data = {}) {

    const endpoint = "/user/login"
    url += endpoint;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });


    return response.json()
    
}
export async function apiAccessGet(url = "", endpoint = "", implementMethod = "", token = "") {

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
        return response.json()
    }
    else if (implementMethod === "GET" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: data
        });
        return response.json()
    }
    // else if (implementMethod === "GET" && token !== ""){

    // }


    // if (data !== {}) {
    //     data = JSON.stringify(data)
    // }
    // return response.json()
}

export async function apiAccessPost(url = "", endpoint = "", implementMethod = "", token = "", data = {}) {

    url += endpoint;

    let response;

    if (implementMethod === "POST" && token === "" && data !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json()
    }
    else if (implementMethod === "POST" && token !== "" && data !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json()
    }
    else if (implementMethod === "POST" && token !== "" && data === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // body: JSON.stringify(data)
        });
        return response
    }
    // console.log(response.json(), 'resp JSON')
    
}

export async function apiAccessPatch(url = "", endpoint = "", implementMethod = "", token = "", data = {}, json=true) {

    url += endpoint;

    let response;

    if (implementMethod === "PATCH" && token === "" && json===true) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json()
    }
    else if (implementMethod === "PATCH" && token !== "" && json===true) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json()
    }
    else if (implementMethod === "PATCH" && token !== "" && json===false) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response
    }
    
}

export async function apiAccessDelete(url = "", endpoint = "", implementMethod = "", token = "", json=true) {

    url += endpoint;

    let response;

    if (implementMethod === "DELETE" && token === "" && json===true) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json()
    }
    else if (implementMethod === "DELETE" && token !== "" && json===true) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.json()
    }
    else if (implementMethod === "DELETE" && token === "" && json===false) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response
    }
    else if (implementMethod === "DELETE" && token !== "" && json===false) {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response
    }

    // return response.json()
}

export default {userLogin,apiAccessGet,apiAccessPost,apiAccessPatch,apiAccessDelete}
