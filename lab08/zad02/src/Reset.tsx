
type Props = {
	handleReset: () => void;
}
export default function Reset({handleReset}: Props) {

	return(
		<>
			<button onClick={handleReset} className="reset">Reset</button>
		</>
	)
}