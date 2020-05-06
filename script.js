window.addEventListener('load', () => {
    ajaxSimple();
    ajaxError();
    ajaxList();
})

function ajaxSimple() {
    const url = 'https://forverkliga.se/JavaScript/api/simple.php';
    let simpleButton = document.querySelector('.ajax-simple button');
    simpleButton.addEventListener('click', async () => {
        // fetch utan await/async
        const options = {
            method: 'GET'
        }
        let value = document.querySelector('.ajax-simple input').value;
        let qs = `?key=` + value;
        // Varning! value kommer från användaren och behöver säkras i en riktig app.

        const response = await fetch(url + qs, options);
        const json = await response.json();
        console.log('Nu har datan kommit!');
        let output = document.querySelector('.ajax-simple pre');
        output.innerText = JSON.stringify(json);

        let timePara = document.querySelector('.ajax-simple .time');
        if( json.message && json.time ) {
            timePara.innerText = `${json.message}. The time is ${json.time}.`;
        } else {
            timePara.innerText = 'Could not retrieve time from API.';
        }
    })
}

function ajaxError() {
    let errorButton = document.querySelector('.ajax-error button');
    errorButton.addEventListener('click', async () => {
        const url = 'http://forverkliga.se/JavaScript/api/crud.php';
        let output = document.querySelector('.ajax-error pre');
        const response = await fetch(url);
        try {
            const json = await response.json();
            output.innerText = JSON.stringify(json);
        } catch(error) {
            output.innerText = error.message;
        }
    })
}

function ajaxList() {
    const url = 'http://forverkliga.se/JavaScript/api/simple.php?world';
    let listButton = document.querySelector('.ajax-list button');
    listButton.addEventListener('click', async () => {
        const response = await fetch(url);
        const countryData = await response.json();
        console.log('JSON from API (world) ', countryData);

        // Skapa ett div-element för varje objekt i listan
        // - vanlig for-loop, lista.forEach, lista.map
        // Fyll div-elementet med innehåll
        // Lägg till elementet sist i .country-list

        let countryList = document.querySelector('.ajax-list .country-list');
        let elements = countryData.map(countryToDom)
        .forEach(element => {
            countryList.appendChild(element)
        })
    })
}
function countryToDom(country) {
    let el = document.createElement('div');
    // Alternativ lösning - fungerar bra så länge man inte behöver använda addEventListener
    // el.innerHTML = `<h3>${country.name}</h3> Has a population of ${country.population} and is on ${country.continent}.`;

    let heading = document.createElement('h3');
    heading.innerText = country.name;
    el.appendChild(heading);

    let content = document.createElement('span');
    content.innerText = `Has a population of ${country.population} and is in ${country.continent}.`;
    el.appendChild(content);
    return el;
}
/* fetch(url)
.then(resp => resp.json())
.then(json => { do stuff with data })
.catch(error => {}) */

/*
{
    "message": "ERROR: no key or wrong key",
    "info": "Available options: \nkey - provide the correct key to get a JSON object {message, time}. \nworld - returns a JSON list of objects containing country data"
}
*/
