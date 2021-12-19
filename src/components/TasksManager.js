import React from 'react';

class TasksManager extends React.Component {

    constructor() {
        super()
        this.apiURL = 'http://localhost:3005/data';
    }

    state = {
        title: '',
        tasks: [],
    }

    onClick = () => {
        const { tasks } = this.state;
        // console.log(tasks)
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
                    {/* <header className = "section__task">Task 1, <span className = "section__timer">00.00.00</span></header>
                    <footer className = "section__buttons">
                        <button className = "button section__button--start">start/stop</button>
                        <button className = "button section__button--done">done</button>
                        <button className = "button section__button--delete" disabled={true}>delete</button>
                    </footer> */}
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
        return this.fetch()
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
            isRunning: 'false',
            isDone: 'false',
            isRemoved: 'false'
        }
        return newTask;
    }

    uploadNewTask(task) {
        console.log(task);
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        }

        return this.fetch(options) 
            .then(data => this.setState({
                tasks: [...this.state.tasks, data]
                }))
            .catch(err => console.log(err.message))
    }
    
    renderTaskList() {
        const {tasks} = this.state;
        // console.log(this.state);
        // console.log(tasks);
        return tasks.map(element => {
            return (
                <li>
                    <header>{element.title}</header>
                    <ul>
                        <li>Spędzono łącznie: {element.time} sekund</li>
                        <li>{this.taskStatus(element.isDone)}</li>
                        <li>{element.isRunning}</li>
                    </ul>
                    <footer className = "item_footer">
                            <button onClick = {e => this.startTask(element.id, e.target)} className = "button item__button--start">start/stop</button>
                            <button onClick = {this.done} className = "button item__button--done">done</button>
                            <button onClick = {this.delete} className = "button item__button--delete" disabled={true}>delete</button>
                    </footer>
                </li>
            )
        })
    }

    taskStatus(status) {
        if(status === 'false') {
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

    startTask(id, current) {
        const {tasks} = this.state;
        const currentElement = current.parentElement.parentElement;
        console.log(currentElement);
        // currentElement.classList.add('hidden')
        // this.timer();

        this.setState( () => {
            const newTasks = tasks.map(task => {
                if(task.id === id) {
                    const updateTask = {...task, time: task.time +1, isRunning: 'true'};
                    this.updateTask(id, updateTask)
                    return updateTask;
                }
                return task;
            });
            return {
                tasks: newTasks,
            }
        }, 
            // () => {this.currentTask(currentElement)}
        )

    }

    // timer() {
    //     let counter = 0;
    //     const time = setInterval(
    //         () => {
    //             console.log(counter);
    //         return ++counter;
    //         },1000
    //     )
    //     return time;
    // }

    updateTask(id, data) {
        console.log(data);
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }

        this.sendUpdateRequest(id, options)
    }

    sendUpdateRequest(id, options) {
        this.fetch(options, `/${id}`)
            .catch(err => console.log(err.message))
    }

    // currentTask(currentElement) {
        // currentElement.classList.add('hidden')
        // const el = currentElement.parentElement.parentElement.parentElement.children[1].lastChild;
        // const place = document.querySelector('current');
        // console.log(place);
    //     const test = document.createElement('h1');
    //     test.innerText = 'test';
    //     el.appendChild(test);
    //     console.log(this.state);
    //     console.log(currentElement);
    // }

    done() {
        console.log('done');
    }

    delete() {
        console.log('delete');
    }

    fetch(options, additionalPath = '') {
        const url = this.apiURL + additionalPath;
        return fetch(url, options)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
            return Promise.reject(resp);
        })
    }
}

export default TasksManager;