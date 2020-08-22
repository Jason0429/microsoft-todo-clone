import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoInput({ addTodo, currentGroup }) {
	const [ todo, setTodo ] = useState({
		id: '',
		task: '',
		completed: false
	});

	// Every time user types, todo.task gets updated
	function handleChange(e) {
		setTodo({ ...todo, task: e.target.value });
	}

	// Submits the new todo onto todoList
	function handleSubmit(e) {
		// Checks if Enter key was pressed
		if (e.key === 'Enter') {
			// Checks if input is not empty
			if (todo.task.trim()) {
				addTodo({ ...todo, id: uuidv4() });

				// Reset TodoInput
				setTodo({
					id: '',
					task: '',
					completed: false
				});
			}
		}
	}

	return (
		<input
			type="text"
			name="task"
			value={todo.task}
			className="todo-input"
			placeholder=" + Add a Task"
			onChange={handleChange}
			onKeyPress={handleSubmit}
			style={{ display: currentGroup.name === '' ? 'none' : 'block' }}
		/>
	);
}

export default TodoInput;
