type Prop = {
	input: (name:string, isPriority: boolean) => void
}

export default function AddForm(props:Prop) {

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form)
		const name = String(formData.get("name") || "").trim();
		const isPriority = formData.get("priority") === "on";

		if(!name) return;
		props.input(name, isPriority)
		form.reset();
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input className="input-name" name="name" placeholder="Add an Item" autoComplete="off"></input>
				<label>
					<input name="priority" type="checkbox"></input>
					Bardzo ważne
				</label>
				<button type="submit">Save</button>
			</form>
		</div>
	)
}