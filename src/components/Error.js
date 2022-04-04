
const Error =(props)=> {
	return(
		<h3 style={{'fontFamily':'Raleway, san-serif',
		'color':'red',
		'fontSize':'16px',
		'textAlign':'center'}}>
		{props.error}
		</h3>
		)
}
export default Error