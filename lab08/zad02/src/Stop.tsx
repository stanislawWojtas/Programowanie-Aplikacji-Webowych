
type propsType = {
	isRunning:boolean,
	handleStartStop: () => void
}

export default function StartStop ({isRunning, handleStartStop}: propsType) {

	return (
		<>
			<button onClick={handleStartStop} className="start-stop">{isRunning ? "Stop": "Start"}</button>
		</>
	)
}