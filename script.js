window.addEventListener('load', () => {
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
})


/*
{
    "message": "ERROR: no key or wrong key",
    "info": "Available options: \nkey - provide the correct key to get a JSON object {message, time}. \nworld - returns a JSON list of objects containing country data"
}
*/
