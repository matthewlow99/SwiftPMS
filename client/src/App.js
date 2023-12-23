import CustomRoutes from "./pages/router/CustomRoutes";
import './css/app.css'
import './css/items.css'
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import {SessionContext, useSessionContext} from "./contexts/_SessionContexts/SessionContext";

function App() {

    const session = useSessionContext()

  return (
    <>
        <Header/>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, overflowX: 'hidden', overflowY: 'hidden'}}>
            {session.checkLoginStatus() && <SideBar/>}
            <div className={'w-full'}>
                <CustomRoutes />
            </div>

        </div>
    </>
  );
}

export default App;
