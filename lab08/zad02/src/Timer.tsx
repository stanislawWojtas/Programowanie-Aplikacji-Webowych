import { useEffect, useState } from "react";
import StartStop from "./Stop";
import Reset from "./Reset";

export default function Timer() {

	const [totalSeconds, setTotalSeconds] = useState<number>(0);

	const [isRunning, setIsRunning] = useState<boolean>(true);

	useEffect(() => {
		let intervalId: number | undefined
		if(isRunning ){
			intervalId = setInterval( () => setTotalSeconds((prev) => prev + 1), 1000);
		}

		return () => {
			if(intervalId !== undefined){
				clearInterval(intervalId)
			}
		}
	}, [isRunning])

	const displayTime = (seconds:number) => {
		const minutes = Math.floor(seconds/60);
		const seconds_result = seconds % 60;
		const padded = String(seconds_result).padStart(2, "0");
		return `${minutes}:${padded}`
	}
	return (
		<>
			<h1>{displayTime(totalSeconds)}</h1>
			<StartStop handleStartStop={() => setIsRunning(!isRunning)} isRunning={isRunning}/>
			<Reset handleReset={() => setTotalSeconds(0)}/>
		</>
	)
}