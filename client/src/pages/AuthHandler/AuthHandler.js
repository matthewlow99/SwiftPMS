import React, {useEffect} from "react"
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../../components/Loading/LoadingScreen";

function AuthHandler(){

    const session = useSessionContext();
    const nav = useNavigate();
    useEffect(() => {
        if(session.checkLoginStatus()){
            nav('/customers')
        }
        else {
            nav('/login')
        }
    }, []);

    return (<>
        <LoadingScreen />
    </>)
}

export default AuthHandler