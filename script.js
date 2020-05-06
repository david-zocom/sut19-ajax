window.addEventListener('load', () => {

    let simpleButton = document.querySelector('.ajax-simple button');
    simpleButton.addEventListener('click', () => {
        const url = 'https://forverkliga.se/JavaScript/api/simple.php';
        // fetch utan await/async
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log('Nu har datan kommit!');
            let output = document.querySelector('.ajax-simple pre');
            output.innerText = JSON.stringify(json);
        })    
    })
})


/*
{
    "message": "ERROR: no key or wrong key",
    "info": "Available options: \nkey - provide the correct key to get a JSON object {message, time}. \nworld - returns a JSON list of objects containing country data"
}
*/
