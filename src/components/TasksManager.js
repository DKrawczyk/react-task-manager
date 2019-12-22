import React from 'react';

class TasksManager extends React.Component {
    state = {
        tasks: [],
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log( tasks)
    }

    render() {
        return <h1 onClick={ this.onClick }>TasksManager</h1>
    }
}

export default TasksManager;