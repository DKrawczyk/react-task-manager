# OUT OF ORDERD FOR NOW


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
