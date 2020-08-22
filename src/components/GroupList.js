import React from 'react';
import Group from './Group';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

var selectedGroup;

function GroupList({ currentGroup, listOfGroups, updateCurrentGroup, removeGroup }) {
	function handleRemoveHighlight() {
		if (document.querySelectorAll('.highlight').length !== 0) {
			document.querySelector('.highlight').classList.remove('highlight');
		}
	}

	function handleDisplayGroup(e) {
		handleRemoveHighlight();
		selectedGroup = e.target;
		selectedGroup.classList.add('highlight');

		// Display selected group
		updateCurrentGroup(listOfGroups.filter((group) => group.id === selectedGroup.getAttribute('id'))[0]);
	}

	function handleContextMenu(e) {
		e.preventDefault();

		handleDisplayGroup(e);

		// Display Context Menu
		const contextMenu = document.querySelector('.context-menu-group');
		contextMenu.style.top = e.clientY + 'px';
		contextMenu.style.left = e.clientX + 'px';

		contextMenu.classList.add('active');
	}

	function handleRemoveGroup() {
		removeGroup(selectedGroup.getAttribute('id'));
	}

	function handleRenameGroup() {
		// Make group name disappear
		const groupName = selectedGroup.querySelector('.group-name');
		groupName.style.display = 'none';

		// Make input field available
		const renameInput = selectedGroup.previousSibling;
		renameInput.style.display = 'block';
		renameInput.focus();
	}

	function handleChange(e) {
		updateCurrentGroup({ ...currentGroup, name: e.target.value });
	}

	function handleDoneRename(e) {
		if (e.key === 'Enter') {
			// Make group name appear
			selectedGroup.children[0].children[0].style.display = 'block';

			// Make input field disappear
			selectedGroup.previousSibling.style.display = 'none';
		}
	}

	return (
		<div className="group-list">
			<ul className="groups" onContextMenu={handleContextMenu}>
				{listOfGroups.map((group) => (
					<Group
						group={group}
						todoList={group.todoList}
						updateCurrentGroup={updateCurrentGroup}
						listOfGroups={listOfGroups}
						removeGroup={removeGroup}
						handleDisplayGroup={handleDisplayGroup}
						handleChange={handleChange}
						handleDoneRename={handleDoneRename}
					/>
				))}
			</ul>
			<div className="context-menu-group">
				<div className="item" onClick={handleRenameGroup}>
					<BsPencilSquare className="icon" />
					Rename
				</div>
				<div className="item item-delete" onClick={handleRemoveGroup}>
					<BsFillTrashFill className="icon icon-delete" />
					Delete
				</div>
			</div>
		</div>
	);
}

export default GroupList;
