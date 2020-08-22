import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GroupMain from './components/GroupMain';
import TodoMain from './components/TodoMain';

import { v4 as uuidv4 } from 'uuid';
import './App.css';

const LIST_OF_GROUPS_KEY = 'react-list-of-groups-key';

function App() {
	// localStorage.clear();

	// List of Group Objects
	const [ listOfGroups, setListOfGroups ] = useState(loadLocalStorage());

	// Group Object { name, numOfTasks id, todos }
	const [ currentGroup, setCurrentGroup ] = useState({ name: '', numOfTasks: 0, id: uuidv4(), todos: [] });

	function loadLocalStorage() {
		// Checks if key exists
		if (localStorage.getItem(LIST_OF_GROUPS_KEY) !== null)
			return JSON.parse(localStorage.getItem(LIST_OF_GROUPS_KEY));
		return [];
	}

	function setLocalStorage() {
		let data = JSON.stringify(listOfGroups);
		localStorage.setItem(LIST_OF_GROUPS_KEY, data);
	}

	// Whenever listOfGroups or currentGroup changes, setLocalStorage
	useEffect(setLocalStorage, [ listOfGroups, currentGroup.todos, currentGroup.name ]);

	// Update Current Group (Selected)
	function updateCurrentGroup(group) {
		setCurrentGroup((prevGroup) => {
			// Update the group if numOfTasks or name changes
			if (
				prevGroup.numOfTasks !== group.numOfTasks ||
				prevGroup.name !== group.name ||
				prevGroup.todos !== group.todos
			) {
				setListOfGroups((prevList) => {
					const newList = prevList.map((g) => {
						if (g.id === group.id) g = group;

						return g;
					});
					return newList;
				});
			}
			return group;
		});
	}

	// Adds group to listOfGroups
	function addGroup(group) {
		setListOfGroups([ ...listOfGroups, group ]);
	}

	// Removes group from listOfGroups
	function removeGroup(groupId) {
		setListOfGroups((prevList) => {
			return prevList.filter((g) => g.id !== groupId);
		});
	}

	window.addEventListener('click', () => {
		const contextMenuGroup = document.querySelectorAll('.context-menu-group');
		const contextMenuTodo = document.querySelectorAll('.context-menu-todo');
		// const groupRenameInput = document.querySelectorAll('.group-rename');
		// const todoRenameInput = document.querySelectorAll('.todo-rename');

		contextMenuGroup.forEach((menu) => {
			if (menu.classList.contains('active')) menu.classList.remove('active');
			return;
		});

		contextMenuTodo.forEach((menu) => {
			if (menu.classList.contains('active')) menu.classList.remove('active');
			return;
		});

		// groupRenameInput.forEach((input) => {
		// 	if (input.style.display === 'block') input.style.display = 'none';
		// });

		// todoRenameInput.forEach((input) => {
		// 	if (input.style.display === 'block') input.style.display = 'none';
		// });
	});

	return (
		<div className="app">
			<Navbar />
			<main>
				<GroupMain
					updateCurrentGroup={updateCurrentGroup}
					listOfGroups={listOfGroups}
					addGroup={addGroup}
					removeGroup={removeGroup}
					currentGroup={currentGroup}
				/>
				<TodoMain currentGroup={currentGroup} updateCurrentGroup={updateCurrentGroup} />
			</main>
		</div>
	);
}

export default App;
