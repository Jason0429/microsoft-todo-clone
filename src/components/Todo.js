import React from 'react';
import { TiDelete } from 'react-icons/ti';

function Todo({ todo, toggleComplete, removeTodo, handleContextMenu, handleChange, handleDoneRename }) {
	function handleCheckboxClick() {
		// toggles the complete based on id
		toggleComplete(todo.id);
	}

	function handleRemoveClick() {
		removeTodo(todo.id);
	}

	return (
		<div className="todo-wrapper">
			<input
				type="text"
				className="todo-rename"
				value={todo.task}
				onChange={handleChange}
				onKeyPress={handleDoneRename}
			/>
			<li className="todo" onContextMenu={handleContextMenu}>
				<div className="checkbox-container">
					<span
						className={todo.completed ? 'checkbox-custom checked' : 'checkbox-custom'}
						onClick={handleCheckboxClick}
					/>
				</div>
				<div className="todo-name" style={{ textDecoration: todo.completed ? 'line-through' : null }}>
					{todo.task}
				</div>

				<TiDelete className="delete-task-btn" onClick={handleRemoveClick} />
			</li>
		</div>
	);
}

export default Todo;
