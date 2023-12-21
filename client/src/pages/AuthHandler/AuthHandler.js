import React, {useEffect} from "react"
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../../components/Loading/LoadingScreen";

function AuthHandler(){

    const {validateToken} = useSessionContext();
    const nav = useNavigate();

    useEffect(() => { validateToken(); }, []);

    return (<>
        <LoadingScreen />
    </>)
}

export default AuthHandler