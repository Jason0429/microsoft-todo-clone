import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoGroupName from './TodoGroupName';
import { v4 as uuidv4 } from 'uuid';

function GroupInput({ addGroup }) {
	const [ group, setGroup ] = useState({
		name: '',
		numOfTasks: 0,
		id: '',
		todos: []
	});

	function handleChange(e) {
		setGroup({ ...group, name: e.target.value, id: uuidv4() });
	}

	function handleSubmit(e) {
		if (e.key === 'Enter' && e.target.value.trim()) {
			setGroup({
				...group,
				name: e.target.value
			});

			addGroup(group);

			// Clear the groupInput
			e.target.value = null;
		}
	}

	return (
		<input
			type="text"
			className="group-input"
			placeholder="+ New List"
			onChange={handleChange}
			onKeyPress={handleSubmit}
		/>
	);
}

export default GroupInput;
