# OUT OF ORDERD FOR NOW - README W BUDOWIE

Thanks for viewing my first React project! I wanted to improve my skill from basic knowledge about React. Task Manager allows you to insert a new task to do. When you start them, the application will be counted time which you spend to finish your task. Let's start the installation!

# Installation 

This project is based on React library. Also, Task Manager uses node and npm. 
If you don't have JSON-server, first you should install it by:

        npm install -g JSON-server@0.17

After this, you can check your JSON-server version by entering the command below:

        json-server -v

Now, let's install all dependencies. Move to the app main workspace and run:

        npm i

To start your workspace, you should use:

        npm start

If your workspace is already running, you can start your local JSON-server:

        json-server --watch ./db/data.json --port 3005

Your API is ready at this address:

        http://localhost:3005/data

We set port 3005, to be sure that nothing will block it.

Enjoy!
-----------------------------------------------------------------------------

# Technologies and solutions

1 Webpack uses two facility functions to make work easier for developer:

        target: "web", 
        devtool: 'inline-source-map',
        
You can comment this lines in the file, to make application a little bit faster.

2. Styling is made by main.css file. To make this possible, I installed neccessary package and made rules like this:

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

3. When it comes to about CSS I used basic reset:

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
            
4. To start this project we installed JSON-server. Because of this this, Task Manager is using local API.

5. To connect with API we are using FETCH. It allows us to download, upload, update and delete tasks. Most people knows it as CRUD.

6. Our API is in separate file to make it more readable.

7. After clicking on start task, we must wait 1 second. To make it more enjoyable I decided to make simply, but effective loader:

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
    
It based od animations in CSS and DRY rule. We are using multiple time our function to don't repeat ourselfes :).

8. We are using handy and usefull array methods, like:

## FILTER:

            const taskArray = this.findCurrentTask();
            ...
            findCurrentTask() {
                const {tasks} = this.state;
                const singleArrayTask = tasks.filter(task => {
                    return task.isRunning === true;
                })
                return singleArrayTask;
            }

## SORT:

            sortTasks(array) {
                array.sort((a, b) => {
                    return a.isDone - b.isDone;
                });
                return array;
            }
            
9. One of the problems were with button. How to block them? This is my solution:

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

10. It should be mentioned, that because of this project I learned how to use intervals and control them:

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

1. The easiest way to make reset.css is to import it in separate file.
2. Task Manager should be divide on more components and values should be transfer by props. For example:

                           <TaskPanel /> ->     <TaskPanelForm />
       <TaskManager /> ->                ->     <TaskPanelCurrentTask />
       
                           <TaskList />  ->     <TasksToDo />
                                         ->     <TasksDone />
                Etc.
                
3. We should use hooks, and styling compliant with React syling standards not by single css file.
4. This project could be compatible with RWD design.
5. Before start, next time I will think over colors in my project, using Paletton for example.
6. Our time could be count in this format:
        
        dd--hh--min--sec
        

# Special thanks!

Special thanks to my Mentor - devmentor.pl for providing me with the task and code review.

Technologie

1. Webpack.config, dodane opcje do odswiezania, ktore mozna usunac aby zoptymalizowac nasz projekt

    target: "web", 
    devtool: 'inline-source-map',

2. Paczka pozwalająca na stylowanie za pomocą pliku CSS

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

3. Użyty podstawowy reset CSS

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

4. Lokalne API postawione za pomocą json servera
5. Fetch API, którep pozwala na aktualizację, pobieranie i dodawanie danych
6. Api przerzucone do odzielnego pliku (refaktoryzacja?)
7. Pierwszy, prosty ale skuteczny loader, który pozwala uruchamia się przez sekundę, kiedy czas naszego nowego zadania zostaje uruchamiany. Bazujący na animacjach CSS, a także funkcji. Dzięki refaktoryzacji, możemy użyć jej kilka razy, bez zbędnego pisania kodu, według standardu DRY.

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
8. Aktualizowanie i przechowywanie danych z API w state
9. Odpowiednie korzystanie z metod tablicowych, np.:

    FILTER:

    const taskArray = this.findCurrentTask();
    ...
    findCurrentTask() {
        const {tasks} = this.state;
        const singleArrayTask = tasks.filter(task => {
            return task.isRunning === true;
        })
        return singleArrayTask;
    }

    SORT:

    sortTasks(array) {
        array.sort((a, b) => {
            return a.isDone - b.isDone;
        });
        return array;
    }


10. Odpowiednie blokowanie przycisków, w zależności od statusu zadania

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

11. Interwały, które budowały timer i zliczanie czasu, spędzonego na danym zadaniu


Na następny raz

1. Stylowanie zrobić za pomocą standardu react, a nie z jednego pliku CSS
2. Kompozycje można podzielić na większą ilość komponentów i dzięki props przekazywać odpowiednie dane, co pozwoli skrócić nam ilość zapisanego kodu
3. Projekt można zapisać jako wersję deweloperską (?)
4. Projekt może być zgodny z zasadami RWD
5. Kolorystyka może być ustalona według szablonu
6. Czas mógłby być obliczany w formacie dd--hh--min--sec

#
