import React from "react";

const SearchFilter = (props) => {
	console.log(props);
	const { value, onChange } = props;
	return (
		<div>
			Filter by: <input value={value} onChange={onChange}></input>
		</div>
	);
};

export default SearchFilter;
