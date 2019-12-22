# TasksManager

## Wprowadzanie

Tym razem naszym zadaniem będzie napisanie jednego komponentu, który będzie zarządzał naszymi zadaniami.

Dokładniej mówąc mamy napisać rozwiązanie, które pozwoli tworzyć zadania i liczyć czas ich wykonania tj. odliczać go.

## Detale

Początkowo musimy zdefiniować formularz, przez który możemy dodawać nowe zdania. Ma to być komponent kontrolowany tj. do pól formularza przypisujemy wartości ze state (`<input name="task" value={ this.state.task } onChange={ ... } />`) i obsługę zdarzenia `onChange`.

Każde wysłanie nazwy zadania ma skutkować dodaniem kolejnego elementu (obiektu) do `state` o nazwie `tasks`. Te dane mają być wysyłane do lokalnego API stworzonego przy pomocy [json-server](https://github.com/typicode/json-server). 

W momencie odpowiedzi od API otrzymujemy ID nowo dodanego elementu i dopiero wtedy to zadania dodajemy do naszej listy zadań (`this.state.tasks`). Pamiętaj, aby za każdym razem kiedy dodajesz nowy element tworzyć kopię poprzedniej tablicy tj.
```
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

Każde z zadań powinno posiadać informacje o nazwie `name`, o czasie jego wykonywania do tej pory w sekundach  (`time`), czy czas jest odliczany w danym momencie (`isRunning`), czy zostało już wykonane (`isDone`) i czy zostało usunięte (`isRemoved`). Pamiętajmy również o ID (`id`), które jest zwracane przez API.

W każdym zadaniu powinniśmy mieć możliwość wystartowania odliczania, zatrzymania odliczanie jeśli zostało wcześniej wystartowane. Zakończyć zadanie co spowoduje przeniesienie go na koniec listy (można wykorzystać [.sort()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/sort)) oraz usunać co spowoduje, że nie będzie ono renderowane, ale cały czas przechowywane w state (można wykorzystać [.filter()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/filter)).

Uznajemy, że w jednym momencie możemy wykonywać jedno zadanie. Pamiętaj, że wciśnięcie przycisku `zakończone`, powinno jednocześnie zatrzymać odliczanie czasu. Usunięcie zadania powinno być możliwe dopiero po jego zakończeniu (uznajemy, że nie ma omyłkowo dodanych zadań).

Każda zmiana danych dla zadania tj. zmiana czasu, odliczanie/wtrzymanie itp. powinno być zapisywane w API. Pamietaj również, że zmiana w `state` powinna nieść za sobą utworzenie kopii obiektu i dopiero potem jego aktualizację np.

```
incrementTime(id) {
    this.setState(state => {
        const newTasks = state.tasks.map(task => {
            if(task.id === id) {
                return {...task, time: taks.time + 1}
            }

            return task;
        });

        return {
            tasks: newTasks,
        }
    });
}
```

Każde zadanie powinno mieć strukturę zblizoną do tej poniżej. Pamietaj, że niektóre przyciski powinny się zachowywać zgodnie z obecnym stanem aplikacji.
```
<section>
    <haader>Zadanie 1, 00:00:00</header>
    <footer>
        <button>start/stop</button>
        <button>zakończone</button>
        <button disabled="true">usuń</button>
    </footer>
</section>
```

Powyższa struktura powinna być generowana na podstawie danych z wartości `this.state.tasks` oraz przy pomocy [.map()](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map)

### Uwaga

Na chwilę obecną nie dziel swojego komponentu na mniejsze części ponieważ niepotrzebnie będzie to komplikować implementację.

W następnym materiale poznasz techniki, które pozwolą Ci podzielić ten komponent na mniejsze komponenty i odpowiednio przekazywać dane pomiędzy nimi. 

### CSS

Do konfiguracji webpack-a tj. w pliku `webpack.config.js` dodano obługę plików CSS dlatego możesz odpowiednio stylować swoje rozwiązanie wykorzystując klasy i metodologię [BEM](http://getbem.com/).

Zuważ, że w pliku `./src/app.js` jest importowany plik CSS. Dzięki temu rozwiązaniu webpack pobierze zawartość pliku i doda CSS jako znacznik `<style/>` w `<head/>` dla naszego `index.html`.

#### Dodatkowe zasoby w CSS

Aby webpack odpowiednio czytał zdjęcia lub font-y w CSS należy zmodyfikować konfigurację.

Możesz to uznać za zadanie dodatkowe lub poczekać na mówienie tego tematu przy następnej okazji.

### JSON Server - przypomnienie

Paczka `json-server` powinna być zainstalowana globalnie dlatego warto mieć uprawnienia administratora (sudo na Linux-ie), aby móc to zrobić.

W terminalu wpisujemy komendę:

```
npm install -g json-server@0.15
```

Po instalacji powinniśmy mieć dostęp do informacji o zainstalowanej wersji 

```
json-server -v
```

Teraz w katalogu głównym naszej aplikacji utworzymy sobie katalog `db`, a w nim stworzymy plik `data.json` i wrzucimy testowe dane tj.

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

Jeśli masz już uruchomienego webpacka (`npm start`), to w kolejnym terminalu (wierszu poleceń) powinismy odpalić nasze API tj.

```
json-server --watch ./db/data.json --port 3005
```

Ustawiamy inny port niż domyślny tj. 3000, aby być pewnym że nic go nie blokuje.

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/data
```

> **Uwaga!** json-server musi zawsze być uruchomiony jeśli API ma działać. 








