function Car({color = "black"} : {color?:string}) {
	return (
		<>
			<h2>This info is from Car component with color: {color}</h2>
		</>
	)
}

export default Car