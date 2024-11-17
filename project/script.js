document.getElementById("submit-btn").addEventListener("click", fetchWeather);
document.getElementById("city-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchWeather();
  }
});


function fetchWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) {
      alert("Введите название города");
      return;
    }
  
    
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10b3a07738ca245e0901ee1468a235ef&lang=ru`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const now = new Date();
      
      
      const timezoneOffset = data.timezone * 1000;
      
      
      const localCityTime = new Date(now.getTime() + timezoneOffset);
      
      
      const localTimeString = localCityTime.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const iconCode = data.weather[0].icon;
      
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;


      let weatherHTML = '';
      let timestamp = data.dt ; // пример значения dt
const date = new Date(timestamp * 1000); // умножаем на 1000, чтобы перевести секунды в миллисекунды

console.log(date.toLocaleDateString());
let flar = date.toLocaleDateString();
console.log(flar);
console.log(typeof flar);
let [day, month, year] = flar.split('.');
let parsedDate = new Date(`${year}-${month}-${day}`);
const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница","Суббота","Воскресенье"]
const dayOfWeek = daysOfWeek[parsedDate.getDay()];
console.log(dayOfWeek);

      //if(data.weather[0].description==="облачно с прояснениями" || "переменная облачность" || "пасмурно" || "небольшая облачность" ||"мгла"){  weatherHTML += `<img src="../img/wheater 1.jpg" />`}
      //if(data.weather[0].description==="ясно"){  weatherHTML += `<img src="../img/Group.jpg" />`}
      //if(data.weather[0].description==="дождь"){  weatherHTML += `<img src="../img/wheater 2.jpg" />`}
      
        weatherHTML += `
        <div class="blok1"> <img src="${iconUrl}" alt="Weather Icon" />
        <p class="gragus">${(data.main.temp - 273.15).toFixed(1)}°C</p>
        <p class="sit">${data.weather[0].description}</p>
        </div>
       
        


       <div class="blok2"> <h2>СЕГОДНЯ</h2>
        <h3>Время: ${localTimeString}</h3>
        <h3>Город: ${data.name}</h3>
        </div>`

      
        
        document.getElementById("weather-result").innerHTML = weatherHTML;
        document.getElementById("close").innerHTML = `
        <p><img src="../img/thermometer 1.jpg" /> температура ${(data.main.temp - 273.15).toFixed(1)}°C </p>
        
        <p><img src="../img/humidity 1.jpg"/> давление ${data.main.humidity}</p>
        <p><img src="../evaporator 1.jpg"/> без осадков</p>
        <p><img src="../img/wind 1.jpg"/> ветер ${data.main.wind}</p>`
        document.getElementById("tod").innerHTML = `
        <p class="sisa">${data.weather[0].description}</p>
        <p class="babosik">${(data.main.temp - 273.15).toFixed(1)}°C</p>
        <p class="bl"> <img src="${iconUrl}" alt="Weather Icon" /></p>
        <p>${dayOfWeek}</p>
        <p class="bal"> ${flar}</p>

        `

        
          
        
      })
      .catch(error => {   console.error("Ошибка при получении данных о погоде:", error);
        alert("Не удалось получить данные о погоде. Попробуйте снова.");
    });
    }
    const button = document.getElementById("col");
    button.addEventListener('click', function() {
      location.reload();}) // Обновляет страницу

     
     
     
     
     
     
      document.getElementById("city-input").addEventListener("input", function () {
        const query = this.value;
        if (query.length < 3) return; // Запросы начинаются при вводе 3+ символов
      
        const citiesApiUrl = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${query}&limit=5`;
      
        fetch(citiesApiUrl)
          .then(response => response.json())
          .then(data => {
            const suggestions = data.data.map(city => city.city);
            showSuggestions(suggestions);
          })
          .catch(error => console.error("Ошибка загрузки городов:", error));
      });
      
      function showSuggestions(suggestions) {
        const suggestionsBox = document.getElementById("suggestions");
        suggestionsBox.innerHTML = ""; // Очищаем предыдущие подсказки
      
        suggestions.forEach(city => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.textContent = city;
      
          // Добавляем обработчик для выбора города из списка
          suggestionItem.addEventListener("click", () => {
            document.getElementById("city-input").value = city;
            suggestionsBox.innerHTML = ""; // Очищаем подсказки после выбора
          });
      
          suggestionsBox.appendChild(suggestionItem);
        });
      }
      