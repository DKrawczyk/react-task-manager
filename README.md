# REACT Task Manager Project

![Task Manager UI](https://github.com/DKrawczyk/react-task-manager/blob/main/assets/preview.png?raw=true)


Thanks for viewing my first **React** project! I wanted to improve my skills from basic knowledge about React. Task Manager allows you to insert new tasks to do. When you start them, the application will be counted time which you spend to finish your task. Let's start the installation!

# Installation 

This project is based on React library. Also, Task Manager uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
If you don't have **JSON-server**, first you should install it by:

        npm install -g JSON-server@0.17

After this, you can check your **JSON-server** version by entering the command below:

        json-server -v

Now, let's install all dependencies. Move to the app main workspace and run:

        npm i

To start your workspace, you should use:

        npm start

If your workspace is already running, you can start your local **JSON-server**:

        json-server --watch ./db/data.json --port 3005

Your **API** is ready at this address:

        http://localhost:3005/data

We set **port 3005**, to be sure that nothing will block it.

Enjoy!


# Technologies and solutions

- Webpack uses two facility functions to make work easier for developers:

        target: "web", 
        devtool: 'inline-source-map',
        
You can comment these lines in the file, to make the application a little bit faster.

- Styling is made by the **main.css** file. To make this possible, I installed the neccessary package and made rules like this:

        module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader', 
                ],
            }
        ]
    },

- When it comes to **CSS** I used basic reset:

            html {
                box-sizing: border-box;
                font-size: 16px;
            }

            *, *:before, *:after {
                box-sizing: inherit;
            }

            body, h1, h2, h3, h4, h5, h6, p, ol, ul {
                margin: 0;
                padding: 0;
                font-weight: normal;
            }

            ol, ul {
                list-style: none;
            }
            
- To start this project we installed **JSON-serve**r. Because of this, Task Manager is using local **API**.
- To connect with **API** we are using **FETCH**. It allows us to download, upload, update and delete tasks. Most people know it as **CRUD**.
- Our **API** is in a separate file to make it more readable.
- After clicking on the start task, we must wait 1 second. To make it more enjoyable I decided to make a simply, but effective loader:

        state: {
            ...
            loading: false,
        }
        ...
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
    
It is based on animations in **CSS** and **DRY** rules. We are using multiple time our function to don't repeat ourselfes :).


- We are using handy and useful **array methods**, like:

### FILTER:

            const taskArray = this.findCurrentTask();
            ...
            findCurrentTask() {
                const {tasks} = this.state;
                const singleArrayTask = tasks.filter(task => {
                    return task.isRunning === true;
                })
                return singleArrayTask;
            }

### SORT:

            sortTasks(array) {
                array.sort((a, b) => {
                    return a.isDone - b.isDone;
                });
                return array;
            }
            
- One of the problems was with the buttons. How to block them? This is my solution:

         <button onClick = {() => disabled={this.handleButtonUndoneTask(task)}>start</button>
         <button onClick = {() => disabled={this.handleButtonUndoneTask(task)}>done</button>
         <button onClick = {() => disabled={this.handleButtonDoneTask(task)}>delete</button>


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

- It should be mentioned, that because of this project I learned how to use intervals and how to control them:

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

# Conclusions for future:

1. The easiest way to make **reset.css** is to import it into a separate file.
 
2. Task Manager should be divided into more components and values should be transferred by **props**. For example:

                           <TaskPanel /> ->     <TaskPanelForm />
                                         ->     <TaskPanelCurrentTask />
       <TaskManager /> ->   
       
                           <TaskList />  ->     <TasksListToDo />
                                         ->     <TasksListDone />
                Etc.
                
                
3. We should use **hooks**, and styling compliant with React styling standards not by single CSS file.
 
4. This project could be compatible with the **RWD** design.
 
5. Before starting, next time I will think over colors in my project, using [Paletton](https://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF) or [Color Hunt](https://colorhunt.co/) for example.
 
6. Our time could be counted in this format:
        
        dd--hh--min--sec
        

# 🙏 Special thanks
Special thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) for providing me with the task and code review.
