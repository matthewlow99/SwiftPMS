import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";

const _UserContext = createContext()

export function useUserContext(){
    return useContext(_UserContext)
}
export function UserContext(){
    const nav = useNavigate();

}