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
        console.log( tasks)
    }

    render() {
        return (
            <>
            <h1 className = "title" onClick={ this.onClick }>TasksManager</h1>
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
                    <header className = "section__task">Task 1, <span className = "section__timer">00.00.00</span></header>
                    <footer className = "section__buttons">
                        <button className = "button section__button--start">start/stop</button>
                        <button className = "button section__button--done">done</button>
                        <button className = "button section__button--delete" disabled={true}>delete</button>
                    </footer>
                </section>
            </div>
            <div className = "list">
                <ul className = "list__tasks">
                    <h2 className = "list__title">Lista zadań</h2>
                    {this.renderTaskList()}
                    {/* <li className = "list__item list__item--prototype">
                        <header className = "item__header">Task 01</header>
                        <ul className = "item__informations">
                            <li className = "item__timer">Czas spędzony:<span>0</span></li>
                            <li className = "item__status">Zadanie: <span>niewykonane</span></li>
                        </ul>
                        <footer className = "item_footer">
                            <button className = "button item__button--start">start/stop</button>
                            <button className = "button item__button--done">done</button>
                            <button className = "button item__button--delete">delete</button>
                        </footer>
                    </li> */}
                    
                </ul>
            </div>
            </>
        )
    }

    inputChange = e => {
        this.setState( {
            title: e.target.value,
        });
    }

    insertNewTask = e => {
        e.preventDefault();
        console.log(e.target);
        const trip = this.prepareNewTask();
        console.log(trip);
        this.uploadNewTask(trip);
    }
    
    prepareNewTask() {
        const {title} = this.state;
        console.log(title);
        const newTrip = {
            title: title,
            time: 0,
            isRunning: 'false',
            isDone: 'false',
            isRemoved: 'false'
        }
        return newTrip;
    }

    uploadNewTask(trip) {
        console.log(trip);
        const options = {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {'Content-Type': 'application/json'}
        }

        return fetch(this.apiURL, options) 
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
    }

    componentDidMount() {
        return fetch(this.apiURL)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then(data => this.uploadTasks(data))
            .catch(err => console.log(err.message))
            .finally(console.log('Data uploaded'))
    }

    uploadTasks(data) {
        const {tasks} = this.state;
        this.setState({
            tasks: data,
        });
        // this.renderTaskList();
    }

    renderTaskList() {
        const {tasks} = this.state;
        console.log(this.state);
        console.log(tasks);
        return tasks.map(element => {
            console.log(element.isDone);
            return (
                <li>
                    <header>{element.title}</header>
                    <ul>
                        <li>Spędzono łącznie: {element.time} sekund</li>
                        <li>{this.taskStatus(element.isDone)}</li>
                    </ul>
                    <footer className = "item_footer">
                            <button className = "button item__button--start">start/stop</button>
                            <button className = "button item__button--done">done</button>
                            <button className = "button item__button--delete">delete</button>
                    </footer>
                </li>
            )
        })
    }

    taskStatus(status) {
        if(status === false) {
            return "Nie zakończone"
        }
        else {
            return "Zakończone"
        }
    }
}



export default TasksManager;