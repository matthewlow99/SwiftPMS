import React, {useLayoutEffect, useState, useEffect} from "react"
import '../../css/Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn} from "@fortawesome/free-solid-svg-icons/faSignIn";
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {useNavigate} from "react-router-dom";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {validateInput} from "../../helpers/misc/miscHelpers";


const CreateAccountForm = () => {

    const session = useSessionContext()
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [company, setCompany] = useState("")


    return (<>
        <input placeholder={'Company Name'} defaultValue={company}
               onChange={({target}) => setCompany(target.value)}/>
        <input placeholder={'First Name'} defaultValue={firstName}
               onChange={({target}) => setFirstName(target.value)}/>
        <input placeholder={'Last Name'} defaultValue={lastName}
               onChange={({target}) => setLastName(target.value)}/>
        <input placeholder={'Email'} defaultValue={email} onChange={({target}) => setEmail(target.value)}/>
        <input placeholder={'Password'} type={'password'} defaultValue={password}
               onChange={({target}) => setPassword(target.value)}/>
        <input placeholder={'Retype Password'} type={'password'} defaultValue={password1}
               onChange={({target}) => setPassword1(target.value)}/>
        <div className={'flexRowAlignCenter'}>
            <button style={{color: 'white'}} onClick={async () => {
                await createTenantAccount(email, password, password1, company, firstName, lastName, nav).then(data => nav('/login'))
            }}><FontAwesomeIcon icon={faPlusSquare} color={'white'} style={{marginRight: 3}}/> Create Account
            </button>
        </div>
        <p className={'subFormButton'} onClick={() => {
            nav('/login')
        }}>Have an account? Login here</p>
    </>)
}

const LoginForm = () => {
    const session = useSessionContext()
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    return (<>
        <input placeholder={'Email'} value={email} onChange={({target}) => setEmail(target.value)}/>
        <input placeholder={'Password'} type={'password'} defaultValue={password}
               onChange={({target}) => setPassword(target.value)}/>
        <div className={'flexRowAlignCenter'}>
            <button style={{color: 'white'}} onClick={() => {
                session.login(email, password).then()
            }}><FontAwesomeIcon icon={faSignIn} color={'white'} style={{marginRight: 3}}/> Login
            </button>
        </div>
        <p className={'subFormButton'} onClick={() => {
            nav('/create')
        }}>Create Account Here</p>
    </>)
}

function Login({menuIndex=0}){
    const nav = useNavigate();
    const session = useSessionContext();
    useEffect(() => {
        if(session.checkLoginStatus())
            session.clearTokens();
    }, [])

    const menuFromIndex = () => {
        switch (menuIndex){
            case 0:
                return <LoginForm />
            case 1:
                return <CreateAccountForm />
            default:
                return <h2>Error</h2>
        }
    }
    return (<>

        <div className={'loginContainer'}>
            <img src={require('../../assets/logo_alt_color.png')} style={{height: 140, paddingRight: 30}}/>
            {menuFromIndex()}
        </div>
    </>)
}

async function createTenantAccount(email, password, password1, company, firstName, lastName){
    if(password !== password1) return 'Passwords must match';
    if(!validateInput([email, password, password1, company, firstName, lastName])) return 'Fields invalid';


    await apiRequest('pub/create_account', {email, password, company, firstName, lastName})
}

export default Login