> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# TasksManager

## Wprowadzenie

Tym razem stworzymy jeden komponent, który będzie zarządzał naszymi zadaniami.

Będzie to rozwiązanie, które pozwoli tworzyć zadania i liczyć czas ich wykonania.

## Implementacja

### Dodawanie zadań

Należy stworzyć formularz, który pozwoli na dodawanie nowych zadań. Ma to być komponent kontrolowany – do pól formularza muszą być przypisane wartości ze state (`<input name="task" value={ this.state.task } onChange={ ... } />`) i obsługa zdarzenia `onChange`.

Potwierdzenie formularza (`onSubmit`) ma skutkować wysłaniem zadania do lokalnego API stworzonego przy pomocy [json-servera](https://github.com/typicode/json-server). Po dodaniu zadania otrzymujemy odpowiedź od serwera – jest to ID nowo utworzonego elementu.

Dopiero teraz możemy dodać to zadanie do naszej listy (`this.state.tasks`). Pamiętaj, aby za każdym razem, kiedy dodajesz nowy element, tworzyć kopię poprzedniej tablicy:
```js
const newItem = {
    name: 'Zadanie 1',
    // ... 
};

this.setState(state => {
    return {
        tasks: [...state.tasks, newItem],
    }
});
```
### Dane pojedynczego zadania

Każde z zadań powinno posiadać:
- nazwę (`name`)
- ID (`id`), które jest zwracane przez API
- czas jego wykonywania w sekundach (`time`)
- informację, czy czas jest odliczany w danym momencie (`isRunning`)
- czy zadanie zostało już wykonane (`isDone`)
- czy zostało usunięte (`isRemoved`).

### Funkcjonalności

W każdym zadaniu powinniśmy mieć możliwość:
- rozpoczęcia odliczania
- zatrzymania odliczania, jeśli zostało wcześniej rozpoczęte
- zakończenia zadania, co spowoduje przeniesienie go na koniec listy (można wykorzystać [.sort()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/sort))
- usunięcia z listy, co spowoduje, że zadanie nie zostanie wyrenderowane, ale będzie cały czas przechowywane w state (można wykorzystać [.filter()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/filter)).

Uznajemy, że w jednym momencie możemy wykonywać jedno zadanie.

Wciśnięcie przycisku `zakończone` powinno jednocześnie zatrzymywać naliczanie czasu.

Usunięcie zadania ma być możliwe dopiero po jego zakończeniu (uznajemy, że nie ma omyłkowo dodanych zadań).

Każda zmiana danych zadania (odliczanie, wstrzymanie, zakończenie itp.) powinna być zapisywana w API.

Pamiętaj również, że zmiana w `state` musi odbywać się przez utworzenie kopii obiektu i dopiero potem jego aktualizację, np.

```js
incrementTime(id) {
    this.setState(state => {
        const newTasks = state.tasks.map(task => {
            if(task.id === id) {
                return {...task, time: task.time + 1}
            }

            return task;
        });

        return {
            tasks: newTasks,
        }
    });
}
```

Każde zadanie powinno mieć strukturę zbliżoną do tej poniżej. Pamiętaj, że część przycisków musi się zachowywać zgodnie z obecnym stanem aplikacji (np. w pewnym momencie być nieaktywna).
```html
<section>
    <header>Zadanie 1, 00:00:00</header>
    <footer>
        <button>start/stop</button>
        <button>zakończone</button>
        <button disabled="true">usuń</button>
    </footer>
</section>
```

Powyższa struktura powinna być generowana na podstawie danych z wartości `this.state.tasks` oraz przy pomocy [.map()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map).

### Uwaga

Na razie nie dziel swojego komponentu na mniejsze części, ponieważ niepotrzebnie skomplikuje to implementację.

W następnym materiale poznasz techniki, które Ci w takim podziale pomogą i pozwolą odpowiednio przekazywać dane pomiędzy komponentami. 

### CSS

Do konfiguracji webpacka (w pliku `webpack.config.js`) dodano obsługę plików CSS, dlatego możesz odpowiednio ostylować swoje rozwiązanie, wykorzystując klasy i metodologię [BEM](http://getbem.com/).

Zauważ, że w `./src/app.js` importowany jest plik CSS. Dzięki temu rozwiązaniu webpack pobierze zawartość tego pliku i do `index.html` doda CSS jako znacznik `<style/>` w `<head/>`.

#### Dodatkowe zasoby w CSS-ie

Aby webpack odpowiednio czytał zdjęcia lub fonty w CSS-ie, należy zmodyfikować konfigurację.

Możesz to uznać za zadanie dodatkowe lub poczekać na omówienie tego tematu w kolejnych materiałach.

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



&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
