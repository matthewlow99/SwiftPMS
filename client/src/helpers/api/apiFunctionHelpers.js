import {useNavigate} from "react-router-dom";

// const address = 'http://192.168.1.121:3050'
const address = '';
// const address = 'https://swiftpms.dev'
let refreshingToken = null;
export async function refreshToken(){
    if(refreshingToken) return refreshingToken;
    else {
        refreshingToken = new Promise(async (resolve, reject) => {
            try{
                const {accessToken, refreshToken} = await apiRequest('pub/refresh_token', {refreshToken: localStorage.getItem('refreshToken')})

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                resolve();
            } catch (e) {
                console.log(e)
            } finally {
                refreshingToken = null;
            }

        })
        return refreshingToken;
    }
}

export async function apiRequest(route, body={}, returnResponse=false){
    const settings = {
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": localStorage.getItem('accessToken')
        },
        method: "POST",
        body: JSON.stringify(body)
    }

    const response = await fetch(`${address}/${route}`, settings)
    console.log('Status ' + response.status + ' from ' + `${address}/${route}`)

    if(returnResponse) return response;

    switch (response.status) {
        case 401:
            await refreshToken()
            return apiRequest(route, body);
        case 500:
            throw new Error('Server Error')
        default:
            const data = await response.json()
            data.responseStatus = response.status;
            return data;
    }
}
