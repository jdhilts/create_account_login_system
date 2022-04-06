import {Link} from '@reach/router'
import './style.css'

const IndexPage =(props)=> {
	return(
		<div>
		<h1>This is the index page.</h1>
		<nav>
		<Link className='link' to='/create_account'>Create Account</Link>
		<Link className='link' to='/Login'>Login</Link>
		</nav>
		</div>
		)
}
export default IndexPage