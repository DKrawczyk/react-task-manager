import React from 'react';
import TasksManagerAPI from '../TaskManagerAPI';

class TasksManager extends React.Component {

    constructor() {
        super()
        this.apiURL = 'http://localhost:3005/data';
        this.api = new TasksManagerAPI();
    }

    state = {
        title: '',
        tasks: [],
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(this.state)
    }

    render() {
        return (
            <>
            <h1 className = "title" onClick={this.onClick}>TasksManager</h1>
            <div className = "panel">
                <section className = "panel__section" onSubmit={this.insertNewTask}>
                    <form className = "panel__form">
                        <div className = "panel__form--field">
                            <label className = "panel__form--field-title">Task title
                                <input name='taskTitle' value={this.state.value} onChange={this.inputChange}></input>
                            </label>
                        </div>
                        <div className = "panel__form--field">
                            <input className = "panel__form--input" type="submit" value="Insert" ></input>
                        </div>
                    </form>
                </section>
                <section className = "panel__section current">
                    {this.renderCurrentTask()}
                </section>
            </div>
            <div className = "list">
                <ul className = "list__tasks">
                    <h2 className = "list__title">Lista zadań</h2>
                    {this.renderTaskList()}
                </ul>
            </div>
            </>
        )
    }

    componentDidMount() {
        this.api.loadData()
            .then(data => this.uploadTasks(data))
            .catch(err => console.log(err.message))
            .finally(console.log('Data uploaded'))
    }

    uploadTasks(data) {
        const {tasks} = this.state;
        this.setState({
            tasks: data,
        });
    }

    insertNewTask = () => {
        const task = this.prepareNewTask();
        this.uploadNewTask(task);
    }
    
    prepareNewTask() {
        const {title} = this.state;
        const newTask = {
            title: title,
            time: 0,
            isRunning: false,
            isDone: false,
            isRemoved: false
        }
        return newTask;
    }

    uploadNewTask(task) {
        this.api.uploadNewTask(task) 
            .then(data => this.setState({
                tasks: [...this.state.tasks, data]
            }))
            .catch(err => console.log(err.message))
    }

    renderCurrentTask() {
        const taskArray = this.findCurrentTask();
        const [currentTask] = taskArray;
        // console.log(currentTask);
        // console.log(currentTask);
        if (taskArray.length >= 1) {
            return (
                <>
                <header className = "section__task">{currentTask.title}, <span className = "section__timer">{currentTask.time} sec</span></header>
                <footer className = "section__buttons">
                    <button onClick = {() => this.stopTimer(currentTask.id)} className = "button section__button--stop">stop</button>
                    {/* <button className = "button section__button--done" disabled={true}>done</button> */}
                    {/* <button className = "button section__button--delete" disabled={true}>delete</button> */}
                </footer>
                </>
            )
        }
        else {
            return (
                <h1>Nic tu nie ma</h1>
            )
        }
    }

    findCurrentTask() {
        const {tasks} = this.state;
        const singleArrayTask = tasks.filter(task => {
            return task.isRunning === true;
        })
        return singleArrayTask;
    }
    
    renderTaskList() {
        const {tasks} = this.state;
        // console.log(this.state);
        // console.log(tasks);
        return tasks.map(task => {
            if(task.isRunning === false) {
                return (
                    <li>
                        <header>{task.title}</header>
                        <ul>
                            <li>Spędzono łącznie: {task.time} sekund</li>
                            <li>{this.taskStatus(task.isDone)}</li>
                        </ul>
                        <footer className = "item_footer">
                            <button onClick = {() => this.startTimer(task.id)} className = "button item__button--start" disabled={this.timeDisabled(task)}>start</button>
                            <button onClick = {(e) => this.endTask(task, e.target)} className = "button item__button--done" disabled={this.timeDisabled(task)}>done</button>
                            <button onClick = {this.delete} className = "button item__button--delete" disabled={true}>delete</button>
                        </footer>
                    </li>
                )
            }
        })
    }

    timeDisabled(task) {
        if(this.id && task.isRunning === false) {
            return true;
        }
    }

    taskStatus(status) {
        if(status === false) {
            return "Nie zakończone";
        }
        else {
            return "Zakończone";
        }
    }

    inputChange = e => {
        this.setState( {
            title: e.target.value,
        });
    }

    startTimer(id) {
        this.id = setInterval( () => {
                this.handleCurrentTask(id, 1, true);
            },1000
        )}

    stopTimer(id) {
        clearInterval(this.id);
        this.handleCurrentTask(id, 0, false);
        this.id = null;
    }

    handleCurrentTask(id, incrementNumber, value) {
        const {tasks} = this.state;

        this.setState( () => {
            const newTasks = tasks.map(task => {

                if(task.id === id) {
                    const updateTask = {...task, time: task.time +incrementNumber, isRunning: value};
                    this.updateTask(id, updateTask)     
                    return updateTask;
                    
                }
                return task;
            });

            return {
                tasks: newTasks,
            }
        })
    }

    updateTask(id, data) {
        this.api.updateData(data, id)
            .catch(err => console.log(err.message))
    }

    endTask(task, currTest) {
        console.log(task);
        currTest.previousElementSibling.disabled = true;
        currTest.nextElementSibling.disabled = false;
        // console.log(currTest);
        // currTest.disabled = true;
    }

    delete() {
        console.log('delete');
    }
}

export default TasksManager;