import {useState} from 'react'
import * as yup from 'yup'
import {Formik, Form} from 'formik'
import FormikControl from '../formikcomponents/FormikControl'
import {Dialog} from '@reach/dialog'
import "@reach/dialog/styles.css"
import {Link, navigate} from '@reach/router'
import Error from '../Error'
import '../style.css'

const CreateAccount =(props)=> {

	//Set the initialValues oobject
	const initialValues = {
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	}

	//Validate the input fields with yup validationSchema
	const validationSchema = yup.object({
		first_name: yup.string().required('Required'),
		last_name: yup.string().required('Required'),
		email: yup.string().email('Email must be a valid email.').required('Required'),
		password: yup.string().required('Required')
	})

	//Set the state of the error, dialogMessage, and dialog for confirmation.
	const [error, setError] = useState('')
	const [dialogMessage, setDialogMessage] = useState('')
	const [showDialog, setShowDialog] = useState(false)

	//Functions to open and close the dialog using @reach/dialog library
	let open =()=> setShowDialog(true)
	let close =()=> setShowDialog(false)

	//Fetch the create_account controller from api to insert user.
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
				setDialogMessage(`The email you entered is: ${user.email}
				Make sure you confirm your email.`)
				open()
			} else {
				setError('Their is already an account with that email.')				
			}})
		.catch(console.log)
	}

	return(
		<div className='page_body'>
		<div className='create_account_container'>
		<div className='create_account_header'>
		<h1>Create Account</h1>
		</div>
		{
			//Dialog message 
			showDialog ? 
			<div>
			<Dialog aria-label='Attention'
			style={{'textAlign':'left',
			'padding':'20px',
			'width':'320px',
			'height':'auto',
			'fontFamily':'Raleway, san-serif',
			'fontSize':'15px'}}
			isOpen={showDialog} 
			onDismiss={close}>
			<p style={{'margin':'0px',
			'height':'auto'}}
			>{dialogMessage}</p>
			<button onClick={()=> navigate('/login')}>Close</button>
			</Dialog>
			</div>
			:
			null
		}
		{/*The Formik Form and FormikControls*/}
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
					//If there is a user in the system with the same email then....
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