import imagebackground from "./images/weather.jpg";
// import {format} from "date-fns";
const searchbtn = document.querySelector(".searchbtn");
const mainContainer = document.getElementById("main_container");
const descriptionContainer = document.querySelector(".description_container");
const cityContainer = document.querySelector(".city_container");
const tempDisplay = document.querySelector(".temp_display");
const tempfeelContainer = document.querySelector(".feels");
const humidityContainer = document.querySelector(".humidity");
const windspeedContainer = document.querySelector(".wind");
const tempbtn = document.querySelector(".tempbtn");
let tempObject;

const backgroundImage = () => {
    let myImage = new Image();
    myImage.src = imagebackground;
    myImage.setAttribute("alt", "photo by Vincenth Guth");
    document.body.append(myImage);
}
const ctof = function (num) {
    let convertedNum = (Math.round(((parseInt(num) * 9 / 5) + 32) * 10) / 10);
    return convertedNum;
}
class Temp {
    constructor(temp, feel) {
        this.temp = temp;
        this.feel = feel;
    }
}

function addTempToClass(num, num2) {
    let tempInt = Math.round(num);
    let tempFeel = Math.round(num2);
    tempObject = new Temp(tempInt, tempFeel);
    tempbtn.setAttribute("id", `${tempObject.temp}`);
    tempbtn.setAttribute("class", `${tempObject.feel}`);
    console.log(tempObject);
}

function toggleTemp(num, num2) {
    let fahrenheitNum = ctof(num);
    let fahrenheitNumFeels = ctof(num2);
    if (tempObject.temp == num && tempObject.feel == num2) {
        tempObject.temp = fahrenheitNum;
        tempObject.feel = fahrenheitNumFeels;
    } else {
        tempObject.temp = num;
        tempObject.feel = num2;
    }
    tempDisplay.textContent = `${Math.round(tempObject.temp)}`;
    tempfeelContainer.textContent = `Feels like ${Math.round(tempObject.feel)}`;
    console.log(tempObject);
}

async function getWeatherApi(url) {
    const response = await fetch(url, {
        mode: "cors"
    });
    let responses = await response.json();
    return responses;
}

async function loadJson() {
    let getLocation = document.querySelector("#search").value;
    let weatherApi = getWeatherApi(`https://api.openweathermap.org/data/2.5/weather?q=${getLocation}&units=metric&appid=faa4a0770c3a396ae2aa2262e23c2e0c`, {
        mode: "cors"
    });
    let weatherData = await weatherApi;
    return weatherData
}

async function getWeatherDescription() {
    let returnedData = await loadJson();
    console.log(returnedData);
    let weatherDescription = returnedData.weather
    weatherDescription.forEach((data) => {
        descriptionContainer.textContent = (data.description);
    });
}
async function getCity() {
    // let dateContainer = document.querySelector(".date");
    // let timeContainer = document.querySelector(".time");
    let returnedData = await loadJson();
    let cityName = returnedData.name;
    // let date = format(new Date(), "dd-MM-yyyy");
    // console.log(finalTime);
    cityContainer.textContent = (cityName);
}

async function getTemp() {
    let returnedData = await loadJson();
    let feelsLike = await getTempFeel();
    let tempNumber = returnedData.main;
    let temp = tempNumber.temp;
    let tempFeel = feelsLike.feels_like;
    tempDisplay.textContent = (Math.round(temp));
    addTempToClass(temp, tempFeel);
    console.log(feelsLike);
}

async function getTempFeel() {
    let returnedData = await loadJson();
    let feelsLike = returnedData.main;
    tempfeelContainer.textContent = (`Feels like ${Math.round(feelsLike.feels_like)}`);
    return feelsLike;
}

async function getHumidity() {
    let returnedData = await loadJson();
    let humidity = returnedData.main;
    humidityContainer.textContent = (`Humidity ${humidity.humidity}%`);
}

async function getWind() {
    let returnedData = await loadJson();
    let wind = returnedData.wind;
    windspeedContainer.textContent = (`Wind ${Math.round(wind.speed)}KM/hr`);
}
function allComponents() {
    getWeatherDescription();
    getCity();
    getTemp();
    getTempFeel();
    getHumidity();
    getWind();
}
searchbtn.addEventListener("click", allComponents);
tempbtn.addEventListener("click", (e) => {
    let className = e.target.className;
    toggleTemp(e.target.id, className);
});
backgroundImage();