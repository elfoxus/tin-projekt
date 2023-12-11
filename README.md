# TIN PROJEKT ZALICZENIOWY

Jest to projekt zaliczeniowy z przedmiotu TIN.

## Opis projektu

Projekt przedstawia zastosowanie technologii NodeJS z użyciem frameworka ExpressJS wraz z aplikacją typu SPA z użyciem
ReactJS. Wykorzystywana jest basa MySQL.

Aplikacja przedstawia przykład strony internetowej do przeglądania i dodwania przepisów kulinarnych.

## Uruchomienie projektu

Prerekwizyty do uruchomienia projektu:

- NodeJS (21+)
- Docker
- NPM

### Uruchomienie z poziomu Dockera

Aby uruchomić projekt z poziomu Dockera należy wykonać następujące kroki:

1. Zbudowanie zależności frontendu
```bash
npm run prepare
```

2. Zbudowanie obrazu Dockera
```bash
npm run build-docker
```

3. Uruchomienie kontenerów Dockera
```bash
npm run start-docker
```

Spowoduje to uruchomienie kontenerów Dockera z aplikacją backendową oraz bazą danych MySQL.

### Uruchomienie z poziomu NodeJS

Moduł `server` posiada konfigurację `start` oraz `dev` umożliwiające na uruchomienie aplikacji backendowej.
Niezbędne do tego jest jednakże przebudowanie frontendu za pomocą komendy `npm run prepare`, co powoduje zbudowanie
aplikacji frontendowej i umieszczenie jej w folderze `server/public`, skąd serwer ExpressJS będzie ją serwował statycznie.

## Struktura projektu

Projekt składa się z dwóch modułów:

- `server` - backend(nodejs, expressjs),
- `client` - frontend (react).