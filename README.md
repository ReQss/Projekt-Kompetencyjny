 Przegląd Systemu
System zarządzania inwentarzem został zaprojektowany w celu efektywnego monitorowania i zarządzania produktami, ich kategoriami oraz procesem wypożyczeń. System pozwala na przechowywanie informacji o produktach, użytkownikach, historii wypożyczeń oraz strukturze kategorii produktów.

2. Schemat Bazy Danych

Baza danych składa się z następujących tabel:

users

inventory

rent_history

categories

3. Opis Tabel

Tabela users:
Przechowuje informacje o użytkownikach systemu.

user_id (int(11)): Unikalny identyfikator użytkownika, klucz główny, autoinkrementowany.

email (varchar(255)): Adres email użytkownika, pole opcjonalne.

first_name (varchar(255)): Imię użytkownika, pole opcjonalne.

last_name (varchar(255)): Nazwisko użytkownika, pole opcjonalne.

username (varchar(255)): Nazwa użytkownika, pole nie może być puste.

password (varchar(255)): Hasło użytkownika, pole nie może być puste.

role (enum('USER','ADMIN')): Rola użytkownika w systemie, ograniczone do 'USER' lub 'ADMIN', pole nie może być puste.

Tabela inventory:

Przechowuje szczegółowe informacje o przedmiotach w inwentarzu.

inventory_id (bigint(20)): Unikalny identyfikator przedmiotu, klucz główny, autoinkrementowany.

description (varchar(255)): Opis przedmiotu, pole opcjonalne.

item_name (varchar(255)): Nazwa przedmiotu, pole nie może być puste.

owner_id (bigint(20)): Identyfikator właściciela przedmiotu, pole opcjonalne.

photo (varbinary(255)): Zdjęcie przedmiotu, pole opcjonalne.

rent_status (varchar(255)): Status wynajmu przedmiotu, pole opcjonalne.

room (varchar(50)): Pokój, w którym znajduje się przedmiot, pole opcjonalne.

building (varchar(50)): Budynek, w którym znajduje się przedmiot, pole opcjonalne.

inventory_date (date): Data dodania przedmiotu do inwentarza, domyślnie bieżąca data.

value (decimal(20,2)): Wartość przedmiotu, pole opcjonalne.

inventory_number (varchar(50)): Numer inwentarzowy, pole opcjonalne.

invoice_number (varchar(50)): Numer faktury zakupu, pole opcjonalne.

funding_source (varchar(50)): Źródło finansowania zakupu, pole opcjonalne.

supplier_document (varchar(50)): Dokument od dostawcy, pole opcjonalne.

invoice_position (varchar(50)): Pozycja na fakturze, pole opcjonalne.

serial_number (varchar(50)): Numer seryjny przedmiotu, pole opcjonalne.

category_id (int(11)): Identyfikator kategorii, do której należy przedmiot. Pole nie może być puste.


Tabela rent_history:

Zawiera informacje o historii wynajmu przedmiotów.

rent_id (int(11)): Unikalny identyfikator wynajmu, klucz główny, autoinkrementowany.

user_id (int(11)): Identyfikator użytkownika, który wynajął przedmiot. Pole nie może być puste.

rent_status (varchar(50)): Aktualny status wynajmu, pole nie może być puste.

rental_date (datetime(6)): Data i czas rozpoczęcia wynajmu, domyślnie bieżący czas.

return_date (datetime(6)): Data i czas zakończenia wynajmu, pole opcjonalne.

inventory_id (bigint(20)): Identyfikator wynajmowanego przedmiotu. Pole nie może być puste.

Tabela categories:

Przechowuje informacje o kategoriach przedmiotów, w tym relacje hierarchiczne między kategoriami.

category_id (int(11)): Unikalny identyfikator kategorii, klucz główny, autoinkrementowany.

name (varchar(255)): Nazwa kategorii, pole nie może być puste.

parent_category_id (int(11)): Opcjonalny identyfikator kategorii nadrzędnej, umożliwiający tworzenie hierarchii kategorii. Wartość NULL oznacza kategorię najwyższego poziomu.

4. Relacje między tabelami
   
users i inventory są powiązane przez owner_id.

inventory i rent_history są powiązane przez item_id.

users i rent_history są powiązane przez user_id.

categories implementuje relację hierarchiczną poprzez parent_id.
