import React from 'react';

function Group({ group, handleDisplayGroup, handleChange, handleDoneRename }) {
	const { name, id, numOfTasks } = group;

	return (
		<div className="group-wrapper">
			<input
				type="text"
				className="group-rename"
				value={name}
				onChange={handleChange}
				onKeyPress={handleDoneRename}
			/>
			<li className="group" onClick={handleDisplayGroup} id={id}>
				<div className="left">
					<div className="group-name">{name}</div>
				</div>

				<div className="num-of-tasks">{numOfTasks}</div>
			</li>
		</div>
	);
}

export default Group;
