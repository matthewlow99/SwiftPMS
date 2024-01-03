import {createContext, useContext} from "react";
import EndpointList from "../../pages/endpoint/EndpointList";

const _EndpointsListContext = createContext();

export function useEndpointsListContext(){
    return useContext(_EndpointsListContext);
}
export function EndpointsListContext(){



    return  <_EndpointsListContext.Provider value={null}>
                <EndpointList />
            </_EndpointsListContext.Provider>
}