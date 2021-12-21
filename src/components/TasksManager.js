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

    render() {
        return (
            <>
            <h1 className = "title">TasksManager</h1>
            <div className = "panel">
                <section className = "panel__section panel__section--title" onSubmit={this.insertNewTask}>
                    <form className = "panel__form">
                        <div className = "panel__form--field">
                            <label className = "panel__form--label">
                                <input name='taskTitle' value={this.state.value} onChange={this.inputChange} placeholder='Insert your task'></input>
                            </label>
                        </div>
                        <div className = "panel__form--field">
                            <input className = "panel__form--input" type="submit" value="Insert" ></input>
                        </div>
                    </form>
                </section>
                <section className = "panel__section panel__section--current">
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

    inputChange = e => {
        this.setState( {
            title: e.target.value,
        });
    }

    renderCurrentTask() {
        const taskArray = this.findCurrentTask();
        const [currentTask] = taskArray;
        if (taskArray.length >= 1) {
            return (
                <>
                <header className = "section__task">{currentTask.title}, <span className = "section__timer">{currentTask.time} sec</span></header>
                <footer className = "section__buttons">
                    <button onClick = {() => this.stopTimer(currentTask.id)} className = "button section__button--stop">stop</button>
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
        this.sortTasks(tasks);
        const finalArray = this.removeDoneTask(tasks);
        console.log(this.state);
        return finalArray.map(task => {
            if(task.isRunning === false) {
                return (
                    <li> 
                        <header>{task.title}</header>
                        <ul>
                            <li>Spędzono łącznie: {task.time} sekund</li>
                            <li>{this.taskStatus(task.isDone)}</li>
                        </ul>
                        <footer className = "item_footer">
                            <button onClick = {() => this.startTimer(task.id)} className = "button item__button--start" disabled={this.handleButtonUndoneTask(task)}>start</button>
                            <button onClick = {() => this.endTask(task.id)} className = "button item__button--done" disabled={this.handleButtonUndoneTask(task)}>done</button>
                            <button onClick = {() => this.delete(task.id)} className = "button item__button--delete" disabled={this.handleButtonDoneTask(task)}>delete</button>
                        </footer>
                    </li>
                )
            }
        })
    }

    sortTasks(array) {
        array.sort((a, b) => {
            return a.isDone - b.isDone;
        });
        return array;
    }

    removeDoneTask(array) {
        const newArray = array.filter((el) => {
            if(el.isRemoved === false) {
                return el;
            }
        })
        return newArray;
    }

    handleButtonUndoneTask(task) {
        if(this.id && task.isRunning === false) {
            return true;
        }
        else if(task.isDone === true ) {
            return true;
        }
    }

    handleButtonDoneTask(task) {
        return (task.isDone === true) ? false : true;
    }

    taskStatus(status) {
        if(status === false) {
            return "Nie zakończone";
        }
        else {
            return "Zakończone";
        }
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

    endTask(id) {
        const {tasks} = this.state;
        this.setState( () => {
            const newTasks = tasks.map( task => {
                if(task.id === id) {
                    const updateTask = {...task, isDone: true};
                    this.updateTask(id, updateTask);
                    return updateTask;
                }
                return task;
            });
            return {
                tasks: newTasks,
            }
        })
    }

    delete(id) {
        const {tasks} = this.state;
        this.setState( () => {
            const newTasks = tasks.map( task => {
                if(task.id === id) {
                    const updateTask = {...task, isRemoved: true};
                    this.updateTask(id, updateTask);
                    return updateTask;
                }
                return task;
            })
            return {
                tasks: newTasks,
            }
        })
        console.log(id);
    }
}

export default TasksManager;