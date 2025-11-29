import { useState } from "react";
import ColorPicker from "./ColorPick";

export default function Container() {

	const colors = ['blue', 'red', 'yellow', 'green', 'orange', 'white', 'black'];

	const [color, setColor] = useState('white')

	const handelColorChange = (newColor:string) => {
		setColor(newColor)
	}

	return (
		<>
			<h2>Witamy w Color Picker</h2>
			<div style={{backgroundColor: color}} className="container">
				<ColorPicker colors={colors} callback={handelColorChange}/>
			</div>
		</>
	)
}