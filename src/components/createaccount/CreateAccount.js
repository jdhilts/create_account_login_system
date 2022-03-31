import {useState} from 'react'
import * as yup from 'yup'
import {Formik, Form} from 'formik'
import FormikControl from '../formikcomponents/FormikControl'
import {Link, navigate} from '@reach/router'
import Error from '../error/Error'
import '../style.css'

const CreateAccount =(props)=> {

	const initialValues = {
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	}

	const validationSchema = yup.object({
		first_name: yup.string().required('Required'),
		last_name: yup.string().required('Required'),
		email: yup.string().email().required('Required'),
		password: yup.string().required('Required')
	})

	const [error, setError] = useState('')

	const onSubmit =(values, {resetForm})=> {
		resetForm({})
		fetch('http://localhost:3000/create_account', {
			method: 'POST',
			cache: 'no-cache',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(values)
		})
		.then(response => response.json())
		.then(user => {
			if(user.email && user.id){
				window.alert('Make sure you check your email for confirmation.')
				navigate('/login')
				window.location.reload(true)
			} else {
				setError('Their is already an account with that email address.')				
			}})
		.catch(console.log)
	}


	return(
		<div className='page_body'>
		<div className='create_account_container'>

		<div className='create_account_header'>
		<h1>Create Account</h1>
		</div>

		<Formik onSubmit={onSubmit}
		initialValues={initialValues}
		validationSchema={validationSchema}>
		{
			formik => (
				<Form>
				<FormikControl control='input'
				type='text'
				name='first_name'
				placeholder='First Name'/>

				<FormikControl control='input'
				type='text'
				name='last_name'
				placeholder='Last Name'/>

				<FormikControl control='input'
				type='email'
				name='email'
				placeholder='Email'/>

				<FormikControl control='input'
				type='password'
				name='password'
				placeholder='Password'/>

				<div>
				<button type='submit'
				disabled={!formik.isValid}>
				Submit
				</button>
				</div>
				
				{
					error ? <Error error={error}/>
					:
					null
				}
				<nav className='login_forgot_password'>
				<Link className='link' to='/login'>Login</Link>
				<Link className='link' to='/forgot_password'>Reset Password</Link>
				</nav>				
				</Form>
				
				)
		}
		</Formik>
		</div>
		</div>
		)
}
export default CreateAccount