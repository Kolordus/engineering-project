# System umożliwiający anonimowe głosowanie

Aplikacja stworzona na kurs 'Projekt Inżynierski'.

## Opis tematu

Projekt z implementacją systemu umożliwającego anonimowe głosowanie na kursy.
Aplikacja podzielona na widok dla użytkownika oraz administratora.

Użytkownik może się zarejestrować, zalogować, wylogować ponadto ma dwie podstrony:
- kursy ocenione
  tutaj może sprawdzić oddane dotychczas oceny oraz sprawdzić poprawność danych w bazie poprzez otrzymany podczas zapisu danych token
- kursy do ocenienia
  na tej podstronie jest możliwość zobaczenia jakie kursy pozostały do oceny i poprzez przycisk 'OCEŃ' pokazuje się okno dialogowe     służące do oddania głosu. Po zatwierdzeniu wprowadzonych danych otrzymujamy unikatowy generowany token pozwalający sprawdzić w podstronie 'kursy ocenione' czy podane dane istnieją w niezmienionej formie w bazie danych.

## Dokumentacja
frontendowa:
https://kolordus.github.io/engineering-project-frontend/

backendowa:
https://kolordus.github.io/engineering-project-backend/

repozytorium backendu:
https://github.com/Kolordus/engineering-project-backend

## Uruchomienie projektu lokalnie

- Pierwszym krokiem jest skopiowanie repozytoriów do IDE (najlepiej do IntelliJ).
- Następnie należy uruchomić backendową część aplikacji (Java + Spring Boot)
- ostatnim krokiem jest uruchomienie poprzez Angular CLI frontendowej części aplikacji
(komenda `ng serve` w Angular CLI).
- strona dostępna będzie pod adresem: `http://localhost:4200/`
- W celu zalogowania się jako admin należy wprowadzić następujące dane:
username: admin
hasło: admin123

