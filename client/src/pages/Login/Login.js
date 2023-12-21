import React, {useLayoutEffect, useState, useEffect} from "react"
import '../../css/Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn} from "@fortawesome/free-solid-svg-icons/faSignIn";
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {useNavigate} from "react-router-dom";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {validateInput} from "../../helpers/misc/miscHelpers";


const CreateAccountForm = ({setPageIndex}) => {

    const session = useSessionContext()
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")


    return (<>
        <div className={'flexRowAlignCenter'}>
            <p style={{color: 'white', textDecoration: 'underline'}}>Create Account</p>
            <p className={'subFormButton'} onClick={() => {setPageIndex(1)}}>Create New Company</p>
        </div>
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
                await createTenantAccount(email, password, password1, null, firstName, lastName, nav).then(data => nav('/login')).catch((data) => {alert(data)})
            }}><FontAwesomeIcon icon={faPlusSquare} color={'white'} style={{marginRight: 3}}/> Create Account
            </button>
        </div>
        <p className={'subFormButton'} onClick={() => {
            nav('/login')
        }}>Have an account? Login here</p>
    </>)
}

const CreateCustomerForm = ({setPageIndex}) => {
    const session = useSessionContext()
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [company, setCompany] = useState("")


    return (<>
        <div className={'flexRowAlignCenter'}>
            <p className={'subFormButton'} onClick={() => {setPageIndex(0)}}>Create Account</p>
            <p style={{color: 'white', textDecoration: 'underline'}} >Create New Company</p>
        </div>
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
                await createTenantAccount(email, password, password1, company, firstName, lastName, nav).then(data => nav('/login')).catch((data) => {alert(data)})
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

const CreateForm = () => {
    const [pageIndex, setPageIndex] = useState(0)
    return (
        <>
            {pageIndex == 0 && <CreateAccountForm setPageIndex={setPageIndex}/>}
            {pageIndex == 1 && <CreateCustomerForm setPageIndex={setPageIndex}/>}
        </>

    )
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
                return <CreateForm />
            case 2:
                return <CreateCustomerForm />
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

    console.log('hit')

    if(password !== password1) return 'Passwords must match';

    console.log('hit')


    if(company){
        if(!validateInput([email, password, password1, company, firstName, lastName])) return 'Fields invalid';
    } else {
        if(!validateInput([email, password, password1, firstName, lastName])) return 'Fields invalid';
    }
    console.log('hit')
    const data = await apiRequest('pub/create_account', {email, password, company, firstName, lastName})
    if(data.responseStatus == 200){
        return 'Success'
    } else {
        switch (data.responseStatus){
            case 403:
                throw new Error('Email already in use')
            case 500:
                throw new Error('Server Error')
        }
    }
}

export default Login