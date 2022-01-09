# OUT OF ORDERD FOR NOW - README W BUDOWIE

Projekt ma na celu przećwiczenie podstawowej wiedzy z użycia React, a także interwałów i metod tablicowych. Projekt ten nie jest responsywny, ani stylowany za pomocą projektu, ani palet kolorystycznych

Istalacja



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
9. Odpowiednie korzystanie z metdo tablicowych, np.:

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

# REACT Task Manager 

![Task Manager UI](https://github.com/DKrawczyk/react-task-manager/blob/main/assets/preview.png?raw=true)


### JSON Server – przypomnienie

Paczka `json-server` powinna być zainstalowana globalnie, dlatego warto mieć uprawnienia administratora (sudo na Linuksie), aby móc to zrobić.

W terminalu wpisz komendę:

```
npm install -g json-server@0.17
```

Po instalacji powinieneś mieć dostęp do informacji o zainstalowanej wersji:

```
json-server -v
```

Teraz w katalogu głównym naszej aplikacji utwórz katalog `db`, a w nim plik `data.json` i wrzuć do niego testowe dane, np.:

```javascript
{
    "data": [
        {
            "id": 1,
            "firstName": "Jan",
            "lastName": "Kowalski"
        }
    ]
}
```

Jeśli masz już uruchomionego webpacka (`npm start`), to w kolejnym terminalu (wierszu poleceń) uruchom API:

```
json-server --watch ./db/data.json --port 3005
```

Ustawiamy inny port niż domyślny (3000), aby być pewnym, że nic go nie blokuje.

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/data
```

> **Uwaga!** Jeśli API ma działać, json-server zawsze musi być uruchomiony. 

