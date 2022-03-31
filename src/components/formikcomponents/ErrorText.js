
const ErrorText =(props)=> {
	return(
		<div style={{'fontFamily':'Raleway, san-serif',
		'color':'red'}}>
			{props.children}
		</div>
		)
}
export default ErrorText;