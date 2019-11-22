const select = document.getElementById('breeds');
const card = document.querySelector('.card');   
const form = document.querySelector('form');

//  FETCH FUNCTION
function fetchData(url) {
    return fetch(url) 
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log(`Ruh-roh! Something's gone wrong.`, error)) // if promise cannot be fulfilled, e.g. if API URL is incorrect
}

// Using Promise.all //
Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    // To display the random dog url on the page
    fetchData('https://dog.ceo/api/breeds/image/random')
  ])
  // To view array returned by Promise.all:
    .then(data => {
      const breedList = data[0].message;
      const randomImage = data[1].message;
      
      generateOptions(breedList);
      generateImage(randomImage);
    })

//  HELPER FUNCTIONS
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOptions(data) {
    const options = data.map(item => `
        <option value='${item}'>${item} </option>
    `).join('');
    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
        <img src='${data}' alt>
        <p>Click to view images of ${select.value}s</p>    `;
    card.innerHTML = html;       
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message; 
            img.alt = breed; 
            p.textContent = `Click to view more ${breed}s`;         })
}

//  EVENT LISTENERS
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);
//  POST DATA
function postData(e) {
    e.preventDefault();    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    sessionStorage.setItem('Dogs',JSON.stringify({name,comment}));
     var item=(sessionStorage.getItem('Dogs'));
     console.log(item);   
}