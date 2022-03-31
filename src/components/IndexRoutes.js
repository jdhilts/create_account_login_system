import {Router} from '@reach/router'
import IndexPage from '../components/IndexPage'
import CreateAccount from '../components/createaccount/CreateAccount'
import Login from '../components/login/Login'

const IndexRoutes =(props)=> {
	return(
		<Router>
		<IndexPage path='/'/>
		<CreateAccount path='/create_account'/>
		<Login path='/login'/>
		</Router>
		)
}

export default IndexRoutes