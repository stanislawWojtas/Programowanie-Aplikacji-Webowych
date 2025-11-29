import { useContext } from "react"
import { MyContext } from "./App"

export default function Title() {

	const descriptions = {
		"Components":"With components you can split logic (and markup) into seperate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces",
		"Events": "Events allow you to trigger code on demand!",
		"The Basics": "Covers core concepts like JSX, props, state and rendering — the fundamentals for building React apps"
	}

	const {topic} = useContext(MyContext);

	return(
		<div className="main-topic">
			<h1>{topic}</h1>
			<p>{descriptions[topic]}</p>
		</div>
	)
}