import '../App.css'
import { BrowserRouter, Route, Routes } from "react-router"
import Body from './Body'
import { Provider } from "react-redux"
import appStore from '../utils/appStore'
import Login from './Login'
import SignUp from './SignUp'
import Projects from './Projects'

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Body/>}>
            <Route path='/login' element= {<Login/>}/>
            <Route path='/signup' element= {<SignUp/>}/>
            <Route path='/projects' element= {<Projects/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
