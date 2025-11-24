import { useState } from "react"

function Friend(props: {id:number, name:string, phone:string, email:string}) {

	const [showDetails, setShowDetails] = useState<boolean>(false)

	const onShow = (e: React.MouseEvent<HTMLButtonElement>) => {
		setShowDetails(!showDetails)
		e.currentTarget.textContent = showDetails ? "Show Details" : "Hide Details";
	};

	return(
		<>
			<h2>{props.name}</h2>
			<button onClick={onShow}>Show Details</button>
			{showDetails && 
				<>
					<p><span>Phone: </span>{props.phone}</p>
					<p><span>Email: </span>{props.email}</p>
				</>}
		</>
	)

}

export default Friend