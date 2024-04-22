 Przegląd Systemu
System zarządzania inwentarzem został zaprojektowany w celu efektywnego monitorowania i zarządzania produktami, ich kategoriami oraz procesem wypożyczeń. System pozwala na przechowywanie informacji o produktach, użytkownikach, historii wypożyczeń oraz strukturze kategorii produktów.

2. Schemat Bazy Danych
3. 
Baza danych składa się z następujących tabel:

users
inventory
rent_history
categories

3. Opis Tabel

3.1 Tabela users

Przechowuje informacje o użytkownikach systemu.

Kolumna	Typ danych	Opis
id	int	Unikalny identyfikator użytkownika, klucz główny
email	varchar	Adres email użytkownika
fname	varchar	Imię użytkownika
lname	varchar	Nazwisko użytkownika
login	varchar	Login użytkownika
password	varchar	Hasło użytkownika
role	enum	Rola użytkownika w systemie (USER, ADMIN)

3.2 Tabela inventory

Przechowuje informacje o przedmiotach w inwentarzu.

Kolumna	Typ danych	Opis
id	bigint	Unikalny identyfikator przedmiotu, klucz główny
description	varchar	Opis przedmiotu
item_name	varchar	Nazwa przedmiotu
owner_id	bigint	ID właściciela z tabeli users
photo	varbinary	Zdjęcie przedmiotu
rent_status	varchar	Status wypożyczenia przedmiotu
date	date	Data dodania przedmiotu do systemu
value	decimal	Wartość przedmiotu

3.3 Tabela rent_history

Zawiera historię wypożyczeń przedmiotów.

Kolumna	Typ danych	Opis
rent_id	int	Unikalny identyfikator wypożyczenia, klucz główny
user_id	int	ID użytkownika z tabeli users
item_id	bigint	ID przedmiotu z tabeli inventory
rental_date	datetime	Data rozpoczęcia wypożyczenia
return_date	datetime	Data zakończenia wypożyczenia

3.4 Tabela categories

Zarządza kategoriami przedmiotów.

Kolumna	Typ danych	Opis
id	int	Unikalny identyfikator kategorii, klucz główny
name	varchar	Nazwa kategorii
parent_id	int	ID kategorii nadrzędnej

4. Relacje między tabelami
   
users i inventory są powiązane przez owner_id.
inventory i rent_history są powiązane przez item_id.
users i rent_history są powiązane przez user_id.
categories implementuje relację hierarchiczną poprzez parent_id.
