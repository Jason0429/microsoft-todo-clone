import React from 'react';
import Todo from './Todo';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

var selectedTodo;

function TodoList({ currentGroup, updateCurrentGroup, toggleComplete, removeTodo }) {
	function handleContextMenu(e) {
		e.preventDefault();

		selectedTodo = e.target;

		// Display Context Menu
		const contextMenu = document.querySelector('.context-menu-todo');
		contextMenu.style.top = e.clientY + 'px';
		contextMenu.style.left = e.clientX + 'px';

		contextMenu.classList.add('active');
	}

	function handleRemoveTodo() {
		removeTodo(selectedTodo.getAttribute('id'));
	}

	function handleRenameTodo() {
		// Make group name disappear
		const todoName = selectedTodo.querySelector('.todo-name');
		todoName.style.display = 'none';

		// Make input field available
		const renameInput = selectedTodo.previousSibling;
		renameInput.style.display = 'block';
		renameInput.focus();
	}

	// --------------------
	// FIX THIS
	// UPDATE TODO onChange
	// --------------------
	function handleChange(e) {
		updateCurrentGroup({
			...currentGroup,
			todos: currentGroup.todos.map((todo) => {
				if (todo.id === selectedTodo.getAttribute('id')) {
					return {
						...todo,
						task: e.target.value
					};
				}
				return todo;
			})
		});
		console.log(e.target.value);
	}

	function handleDoneRename(e) {
		if (e.key === 'Enter') {
			// Make group name appear
			selectedTodo.children[0].children[0].style.display = 'block';

			// Make input field disappear
			selectedTodo.previousSibling.style.display = 'none';
		}
	}

	return (
		<div className="todos">
			<ul className="todo-list" onContextMenu={handleContextMenu}>
				{currentGroup.todos.map((todo) => (
					<Todo
						todo={todo}
						toggleComplete={toggleComplete}
						removeTodo={removeTodo}
						handleDoneRename={handleDoneRename}
						handleChange={handleChange}
					/>
				))}
			</ul>
			<div className="context-menu-todo">
				<div className="item" onClick={handleRenameTodo}>
					<BsPencilSquare className="icon" />
					Rename
				</div>
				<div className="item item-delete" onClick={handleRemoveTodo}>
					<BsFillTrashFill className="icon icon-delete" />
					Delete
				</div>
			</div>
		</div>
	);
}

export default TodoList;
