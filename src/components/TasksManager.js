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
        loading: false,
    }

    render() {
        return (
            <>
            {this.renderLoader()}
            <h1 className = "title">TasksManager</h1>
            <div className = "panel">
                <section className = "panel__section panel__section--title" onSubmit={(e) => this.insertNewTask(e)}>
                    <form className = "panel__form">
                        <div className = "panel__form--field">
                            <label className = "panel__form--label">
                                <input name='taskTitle' value={this.state.value} onChange={this.inputChange} placeholder='Insert new task' autoComplete='off'></input>
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
            
            <div className = "tasks">
                <section className="tasks__section">
                    <h2 className = "tasks__title">Lista zadań</h2>
                    <ul className = "tasks__list"> 
                        {this.renderTaskList()}
                    </ul>
                </section>
                <section className="tasks__section--done">
                    <h2 className="tasks__title tasks__title--done">Zakończone</h2>
                    <ul className="tasks__list--done">
                    {this.renderDoneTasks()}
                    </ul>
                </section>
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

    renderLoader() {
        const {loading} = this.state;

        if(loading === true) {
            setTimeout(() => {
                this.setState({
                    loading: false,
                })
            },1000)

            return (
                <div className="background__loader">
                    <div className="loader">
                        <span class="loader__circle circle-1"></span>
                        <span class="loader__circle circle-2"></span>
                        <span class="loader__circle circle-3"></span>
                        <span class="loader__circle circle-4"></span>
                        <span class="loader__circle circle-5"></span>
                    </div>
                </div>
            )
        }
    }
    
    insertNewTask(event) {
        const {title} = this.state;

        if(title.length < 4) {
            event.preventDefault();
            alert('Task title cannot be shorter than four signs')
        }

        else {
            const newTask = {
                title: title,
                time: 0,
                isRunning: false,
                isDone: false,
                isRemoved: false
            }
            this.uploadNewTask(newTask);
        }
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
                <header className = "section__task">{currentTask.title}: <span className = "section__timer">Czas: {currentTask.time} sec</span></header>
                <footer className = "section__buttons">
                    <button onClick = {() => this.stopTimer(currentTask.id)} className = "button section__button--stop">stop</button>
                </footer>
                </>
            )
        }
        else {
            return (
                <h1>Please, start your task</h1>
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
        return finalArray.map(task => {
            if(task.isRunning === false) {
                return (
                    <li className="singleTask"> 
                        <h3 className="singleTask__title">{task.title}</h3>
                        <ul className="singleTask__description">
                            <li className="singleTask__info singleTask__timer">Spędzono łącznie: {task.time} sekund</li>
                            <li className="singleTask__info singleTask__status">{this.taskStatus(task.isDone)}</li>
                        </ul>
                        <footer className = "singleTask__footer">
                            <button onClick = {() => this.startTask(task.id)} className = "button singleTask__button--start" disabled={this.handleButtonUndoneTask(task)}>start</button>
                            <button onClick = {() => this.endTask(task.id)} className = "button singleTask__button--done" disabled={this.handleButtonUndoneTask(task)}>done</button>
                            <button onClick = {() => this.delete(task.id)} className = "button singleTask__button--delete" disabled={this.handleButtonDoneTask(task)}>delete</button>
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

    startTask(id) {
        const {loading} = this.state;
        this.setState({
            loading: true,
        });
        this.renderLoader();        
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
    }

    renderDoneTasks() {
        const {tasks} = this.state;

        const doneTasksArray = tasks.filter((task) => {
            return task.isRemoved === true;
        })

        return doneTasksArray.map( task => {
            if(doneTasksArray.length > 0) {
                return (
                    <li className="tasks__item--done">
                        <header className="item__title--done">{task.title}</header>
                        <footer className="item__footer--done">Total time: {task.time}</footer>
                    </li>
                )
            }
        })
    }
}

export default TasksManager;