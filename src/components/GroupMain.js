import React, { useState, useEffect } from 'react';
import GroupList from './GroupList';
import GroupInput from './GroupInput';

function GroupMain({ addGroup, currentGroup, updateCurrentGroup, listOfGroups, removeGroup, setIsRenaming }) {
	return (
		<div className="group-main">
			<GroupList
				listOfGroups={listOfGroups}
				updateCurrentGroup={updateCurrentGroup}
				removeGroup={removeGroup}
				currentGroup={currentGroup}
			/>
			<GroupInput addGroup={addGroup} />
		</div>
	);
}

export default GroupMain;
