import {Link} from '@reach/router'

const IndexPage =(props)=> {
	return(
		<div>
		<h1>This is the index page.</h1>
		<nav>
		<Link to='/create_account'>Create Account</Link>
		<Link to='/Login'>Login</Link>
		</nav>
		</div>
		)
}
export default IndexPage