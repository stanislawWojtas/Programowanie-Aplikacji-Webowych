
type Prop = {
	name:string,
	description: string,
	handleButtonClick: (n:string)=> void
}
export default function TopicCard({name, description, handleButtonClick}:Prop) {

	return (
		<div>
			<h3>{name}</h3>
			<p>{description}</p>
			<button onClick={() => handleButtonClick(name)}>Learn More</button>
		</div>
	)
}