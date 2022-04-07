import {Link} from '@reach/router'
import '../style.css'

const Login =(props)=> {
	return(
		<div>
		<h1>This is the Login page.</h1>
		<nav>
		<Link className='link' to='/create_account'>Create Account</Link>
		</nav>
		</div>
		)
}
export default Login