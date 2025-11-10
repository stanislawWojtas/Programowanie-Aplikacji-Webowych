const list1 = document.querySelector('#list1');
const list2 = document.querySelector('#list2');
const list3 = document.querySelector('#list3');
const list4 = document.querySelector('#list4');
const list5 = document.querySelector('#list5');

const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)

list1.innerHTML = names.filter(name => name.toLocaleLowerCase().includes('r'))
                        .map(item => `<li>${item}</li>`).join('');

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
    //   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
    //   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
    //   Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2

let isLessThan9 = numbers.every(num => num < 9);
numbers = numbers.map(num => num + 1);
let oddNumbers = numbers.filter(num => num%2 == 1)
list2.innerHTML = oddNumbers.map(item => `<li>${item}</li>`).join("") + `<br>Wszystkich elementów jest ${oddNumbers.length}</br>`
// 3. Na stronach internetowych wyświetlają się kraje z Europy

list3.innerHTML = "<br>Kraje z Europy</br>" + 
    countries.filter(country => country.continent.toLocaleLowerCase() == 'europe')
    .map(item => `<li>${item.name}</li>`).join('');

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.

list4.innerHTML = "<br>Nazwiska z 'replicant.io' w e-mailach:</br>" +
    people.filter(p => p.email.match("^[A-Za-z0-9]+@replicant\.io$"))
    .map(item => `<li>${item.name} ${item.email}</li>`).join('');

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
setNames = [...new Set(duplicateName)];
list5.innerHTML = "<br>Usunięte duplikaty:</br>" +
    setNames.map(item => `<li>${item}</li>`).join('');