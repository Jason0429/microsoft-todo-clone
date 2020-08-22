import React from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoGroupName from './TodoGroupName';
import { v4 as uuidv4 } from 'uuid';

// const LOCAL_STORAGE_KEY = 'react-todo-list-todos';

function TodoMain({ currentGroup, updateCurrentGroup }) {
	// toggles the complete status if id matches todo.id
	function toggleComplete(id) {
		updateCurrentGroup({
			...currentGroup,
			todos: currentGroup.todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						completed: !todo.completed
					};
				}
				return todo;
			})
		});
	}

	// Deletes Todo
	function removeTodo(id) {
		// Filter (keep) todos with ids not matching current id
		updateCurrentGroup({
			...currentGroup,
			todos: currentGroup.todos.filter((todo) => todo.id !== id),
			numOfTasks: currentGroup.numOfTasks - 1
		});
	}

	// Add Todo
	function addTodo(todo) {
		updateCurrentGroup({
			...currentGroup,
			todos: [ ...currentGroup.todos, todo ],
			numOfTasks: currentGroup.numOfTasks + 1
		});
	}

	return (
		<div className="todo-main">
			<div className="wrapper">
				<TodoGroupName groupName={currentGroup.name} />
				<TodoList
					currentGroup={currentGroup}
					updateCurrentGroup={updateCurrentGroup}
					toggleComplete={toggleComplete}
					removeTodo={removeTodo}
				/>
				<TodoInput addTodo={addTodo} currentGroup={currentGroup} />
			</div>
		</div>
	);
}

export default TodoMain;
