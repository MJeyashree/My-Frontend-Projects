const api="2f26c3ccd5cfa7ef292681044f9c2614";     //API KEY

// DOM Elements

const cityInput=document.getElementById('cityInput');
const searchBtn=document. getElementById('searchBtn');
const weatherResult=document.getElementById('weatherResult');   
const cityName=document.getElementById('cityName');
const temperature=document.getElementById('temperature');
const condition=document.getElementById('condition');
const humidity=document.getElementById('humidity');
const errorPopup=document.getElementById('errorPopup');
const errorMessage=document.getElementById('errorMessage');

searchBtn.addEventListener('click' , () => {
    const city = cityInput.value.trim();
    if(city == ""){
        showError("Please Enter City Name");
        return;
    }
    getWeather(city);
});

//Async Function

async function getWeather(city){
    try{   
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
        
        const response = await fetch(apiUrl);    //  Wait and Stores data from API URL

        if(!response.ok){              //If the data is avail or not
            throw new Error("City is Not Found...");     // For throwing Error Message
        }

        const data = await response.json();  // Data are converted by Json File

    // textContent - For retrieve and send text data from html file
        cityName.textContent = `${data.name},${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)} c`;
        condition.textContent = data.weather[0].description;
        humidity.textContent = `humidity: ${data.main.humidity}%`;

        weatherResult.classList.remove("hidden");    
        errorPopup.classList.add("hidden");
    }catch(error){

        showError(error.message);

    }
}

function showError(message){
    /*if(!errorPopup || !errorMessage){
        return;
    }
    errorPopup.textContent = message;
    errorPopup.classList.remove("hidden");
    errorPopup.classList.remove("hidden");
    errorPopup.classList.add("hidden");
    setTimeout(() => {
        errorPopup.classList.remove("opacity-100");
        errorPopup.classList.add('opacity-0');
        setTimeout(()=>{
            errorPopup.classList.remove('hidden');
        },500)
    },500)*/
    errorMessage.textContent = message;
    errorPopup.classList.remove("hidden");
}
