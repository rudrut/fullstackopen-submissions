const PersonForm = (props) => {
	const { namevalue, numbervalue, onSubmit, onNameChange, onNumberChange} = props
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input namevalue={namevalue} onChange={onNameChange} />
			</div>
			<div>
				number: <input numbervalue={numbervalue} onChange={onNumberChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
