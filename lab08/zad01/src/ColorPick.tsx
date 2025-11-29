
type colorProps = {
	colors: string[],
	callback: (color:string) => void;
}

export default function ColorPicker (props:colorProps) {


	return(
		<>
			{props.colors.map(c => (
				<div
					onClick={() => props.callback(c)}
					style={{width: "50px", height:"50px", backgroundColor:c}}
					className="colorPick"
					key={c}>
				</div>
			))}
		</>
	)
}