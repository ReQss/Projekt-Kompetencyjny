Założenia strony
Opis: Strona ma umożliwiać i usprawniać już istniejący system wypożyczania przedmiotów/sprzętów etc. Na politechnice

Podstawowe funkcje i założenia 

Strona w wersji podstawowej ma umożliwiać:
Wypożyczenie przedmiotu - Wypożyczeniami przedmiotu zajmują się pracownicy ze stworzonym kontem na stronie, tworzą oni „Wypożyczenie” tzn. w odpowiednim formularzu wpisują kto wypożycza(student/inny pracownik), wybierają jaki przedmiot oraz na ile ten przedmiot jest wypożyczony i w jakim celu.
Dodanie przedmiotu - Tylko pracownicy(oraz admin) z kontem mają możliwość dodania przedmiotu, w odpowiednim formularzu wypełniają oni dane przedmiotu między innymi nazwę, opis, zdjęcie, numer faktury, numer seryjny itp. 
Modyfikacja przedmiotu - Tylko pracownicy(oraz admin) którzy dodali dany przedmiot mogą go modyfikować, w celu uaktualnienia jego stanu faktycznego czy np. poprawy błędów które wprowadzili wcześniej.
Sprawdzenie dostępnych przedmiotów – Funkcja dostępna dla każdego użytkownika strony(zalogowanego/niezalogowanego) umożliwia sprawdzenie jakie przedmioty są wypożyczane, ich dostępność opis etc.
Sprawdzenie historii wypożyczeń – Wgląd kto wypożyczył, kiedy itp. Mają wszyscy zalogowani pracownicy(oraz admin). 
Zalogowanie się – Zalogować się mogą tylko użytkownicy którym konto wcześniej założył główny administrator strony.




Strona główna – W założeniu ma ona wyświetlać cały aktualny inwentarz tzn. Pzedmioty z ich zdjęciem i podstawowymi danymi o nich jak nazwa opis etc. Widoczność jest taka sama dla użytkownika zalogowanego jak i niezalogowanego, oprócz tego jest jeszcze przycisk zaloguj się, oraz dla użytkowników zalogowanych przycisk twoje przedmioty w którym są przyciski przenoszące do formularzy dodawania/modyfikowania przedmiotu, przycisk przenoszący do formularza wypożyczeń, oraz podstrona historia wypożyczeni i możliwość wejścia w dany przedmiot żeby zobaczyć poufne pola tego przedmioty takie jak np numer faktury itp. Jest również filtracja po słowach kluczowych.
Strona logowania – prosta strona umożliwiająca zalogowanie się dla wcześniej stworzonych użytkowników  
Strona dodawania przedmiotu – prosty formularz dzięki któremu przedmiot zostanie dodany do bazy
pola do wypełnienia: Wszystkie pola z bazy danych oprócz id(autoincrement) oraz daty stworzenia która również jest automatyczna, niektóre z pól powinny być wybieralne z listy jak np. nazwa kategorii czy w przyszłości nr Sali instytut etc.
Strona wypożyczenia – formularz dzięki któremu będzie można wypożyczyć komuś przedmiot
Pola do wypełnienia : id osoby która wypożycza/daje przedmiot jest pobierane automatycznie z zalogowanego konta, nr indeksu imię i nazwisko studenta lub pracownika, cel w jakim przedmiot jest wypożyczany oraz do kiedy jest wypożyczany, data wypożyczenia wypełniona automatycznie oraz id wypożyczenia również automatycznie 
Strona szczegółów przedmiotu – strona która wyświetla szczegóły przedmiotu tzn. wszystkie pola z bazy danych takie jak np. numer faktury etc. 
Strona z historia wypożyczeni – strona w której można sprawdzić historię wypożyczeń danego przedmiotu.


Jak uruchomić aplikację
Potrzebne są:
Node
Xampp lub inna baza danych(w wypadku zewnętrznej bazy danych trzeba odpowiednio zmodyfikować pola w pliku CRUD i resources)
IDE umożliwiające odpalić frontend np. Visual studio code
IDE umożliwiające odpalić backend np. intelij 
Do zarządzania projektem wewnątrz IDE są używane Maven i Vite 
W pierwszej kolejności należy odpalić Xampp, i stworzyć bazę inventory za pomocą kodu znajdującego się w inventory.sql , po uruchomieniu bazy, można przejść do włączania backendu. 
Przy pierwszym uruchomieniu trzeba zainstalować wszystkie potrzebne pakiety i rozszerzenia, dla backendu wystarczy wybrać rental app jako główną aplikacje i posiadać  java17 SDK, po uruchomieniu można włączyć frontend.



Dla frontendu trzeba wejść w strukturę plików, kliknąć prawym na folder frontend i wybrać open integrated terminal, po czym wpisać npm install aby wykonać instalację wszystkich niezbędnych paczek, po tym można uruchomić front end poleceniem npm run dev.  


Docelowo są stworzone 3 konta użytkowników 
Admin – login admin hasło-admin rola-admin
User1-user1 hasło-admin rola-user
User2-user2 hasło-admin rola-user






