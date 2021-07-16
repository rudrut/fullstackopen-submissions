import React from "react";

const Header = (props) => {
	return <h2>{props.title}</h2>;
};

const Total = (props) => {
	const sum = props.count.reduce((sum, number) => sum + number.exercises, 0);
	return <p>Number of exercises {sum}</p>;
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((part) => (
				<div key={part.id}>
					<p>
						{part.name} {part.exercises}
					</p>
				</div>
			))}
		</div>
	);
};

const Course = (props) => {
	return (
		<div>
			<Header title={props.header} />
			<Content parts={props.content} />
			<Total count={props.content} />
		</div>
	);
};

export default Course
