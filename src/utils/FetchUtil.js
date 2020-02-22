 const handleGet = (url, userToken) => {
    var result =  fetch( url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : userToken,
            "Connection": "close"
        }
    });
   
    return result;
}

const handlePost = (url, userToken, payload) => {
   var result = fetch( url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "text/html;charset=UTF-8",
            "Authorization" : userToken
        },
        body: JSON.stringify(payload)
    });

    return result;
}

export default {handleGet, handlePost}