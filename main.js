const apiKey = 'e9a5d3b74bf84418b11193028231901'

const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const cardCity = document.querySelector('.card-city')
let city;
const span = document.querySelector('.span')

//удаляем предыдущую карточку
function removeCard() {

  const prevcard = document.querySelector('.card')
  if (prevcard) {
    prevcard.remove();
  }
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`
  header.insertAdjacentHTML('afterend', html)
}

function showCard(name, country, temp, text) {
  const html = `
   <div class="card">
   <h2 class="card-city">${name} <span>${country}</span> </h2>
   <div class="card-wather">
     <div class="card-value">${temp}<sup>°c</sup></div>
     <img class="card-img" src="./img/rain.png" alt="wather">
   </div>
   <div class="card-description">${text}</div>
 </div>
   `
  //отображаем карточку на странице
  header.insertAdjacentHTML('afterend', html);
}

async function getWether(city) {
  const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`; //адрес запроса
  const response = await fetch(query);
  const data = await response.json();
  console.log(data);

  if (data.error) {
    removeCard();
    showError(data.error.message);

  } else {
    //отображаем полученные данные в карточке
    removeCard();
    showCard(data.location.name, data.location.country, data.current.temp_c, data.current.condition.text);
    input.value = " "
  }

}

// 2. Слушаем отправку формы:

form.addEventListener('click', async (evt) => {
  evt.preventDefault()
  city = input.value.trim();     //trim() обрезает пробелы и табы
  const data = await getWether(city);

})



/*
 //делаем запрос на сервер
 const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`; //адрес запроса

 fetch(query).then((res) => {
   return res.json()
 }).then((data) => {
   console.log(data);
   // проверка на ошибку
   if (data.error) {
     removeCard();
     showError(data.error.message);
     
   } else {
     //отображаем полученные данные в карточке
     removeCard();
     showCard(data.location.name, data.location.country, data.current.temp_c, data.current.condition.text);
     input.value = " "
   }
 })*/