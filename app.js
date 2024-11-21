let url = "http://api.weatherapi.com/v1/current.json?key=5a93e240f39a4107b37132927240808&q="
let country = "india";
let card = document.querySelector(".live-info");
 
async function getData(country) {
    try{
        let res = await axios.get(url+country);
        console.log(res.data);
        setData(res);
        return res;
    }catch(e) {
        let loca = document.querySelector(".location-text").innerHTML = "<u><b>Wrong Location</b></u>";
        return [];
    }
}

let serchBtn = document.querySelector(".search-icon");
let searchInp = document.querySelector(".search-inp");
let form = document.querySelector("form");

form.addEventListener("submit",(e) => {
    e.preventDefault();
    country = searchInp.value;
    console.log(country)
    searchInp.value = "";
    getData(country);
});


serchBtn.addEventListener("click",() => {
    country = searchInp.value;
    console.log(country)
    searchInp.value = "";
    getData(country);
});

function setData(res){
    card.classList.add("card-rotate-animation");
    setTimeout(() => {
        card.classList.remove("card-rotate-animation");
    }, 1000);

    setTimeout(()=> {
        document.querySelector(".location-text").innerHTML = res.data.location.name; 
    document.querySelector(".live-info-weather h1").innerHTML = `${res.data.current.temp_c}&#176C`;
    document.querySelector(".live-info-icon").setAttribute("src", `https:${res.data.current.condition.icon}`);
    document.querySelector(".live-info-weather p").innerHTML = res.data.current.condition.text;
    document.querySelector(".live-info-weather p").innerHTML = res.data.current.condition.text;
    document.querySelector(".weather-condition").innerHTML = res.data.current.condition.text;
    document.querySelector(".cloud-condition").innerHTML = res.data.current.cloud;
    document.querySelector(".humidity").innerHTML = `${res.data.current.humidity}%`;
    document.querySelector(".wind").innerHTML = `${res.data.current.wind_mph}mph`;
    let date = getDate(res);
    document.querySelector(".date").innerHTML = date;
    let day = getDayOfWeek(date);
    document.querySelector(".Day").innerHTML = day;
    let dayNight = res.data.current.is_day;
    let dayIcon = document.querySelector(".day-icon");
    if(dayNight){
        document.querySelector(".day-text").innerHTML = "Day";
        dayIcon.classList.remove("fa-moon");
        dayIcon.classList.add("fa-sun");
    }else{
        document.querySelector(".day-text").innerHTML = "Night";
        dayIcon.classList.remove("fa-sun");
        dayIcon.classList.add("fa-moon");
    }
    },500)
    
}

function getDate(res){
    let localTime = res.data.location.localtime;
    let localInfo = localTime.split(" ");
    let date = localInfo[0];
    return date;
}

function getDayOfWeek(date) {
    let d = new Date(date);
    let day = d.getDay();

    switch(day) {
        case 0:return "Sunday"
        case 1:return "Monday"
        case 2:return "Tuesday"
        case 3:return "Wednesday"
        case 4:return "Thursday"
        case 5:return "Friday"
        case 6:return "Saturday"
    }
}


