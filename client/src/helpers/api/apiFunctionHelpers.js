
const address = 'http://192.168.1.121:3050'


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

export async function apiRequest(route, body={}){
    const settings = {
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": localStorage.getItem('accessToken')
        },
        method: "POST",
        body: JSON.stringify(body)
    }
    try{
        const response = await fetch(`${address}/${route}`, settings)
        console.log('Status ' + response.status + ' from ' + `${address}/${route}`)

        if(response.status === 401){
            await refreshToken()
            return apiRequest(route, body);
        }

        const data = await response.json()
        data.responseStatus = response.status;
        return data;
    } catch(e){
        console.log(e)
        return []
    }
}
