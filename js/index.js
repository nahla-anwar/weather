// * HTML elements
let cardsContainer = document.getElementById("allCards");
let cityName = document.querySelector(".location .city");
const searchInput = document.getElementById("searchInput");

// * app variables
// * functions
async function getData(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=33e08c980f5e47e3b1811835240810&q=${city}&days=3`
  );
  let data = await response.json();
  display(data);
  cityName.innerHTML = data.location.name;
}
getData("cairo");

function display(data) {
  let daysArray = data.forecast.forecastday;
  let cardsHTML = "";
  for (let i = 0; i < daysArray.length; i++) {
    let date = new Date(daysArray[i].date);
    cardsHTML += `
            <div class="col-md-4">
              <div class="inner ${i === 0 ? "active" : ""}  overflow-hidden">
                <div class="d-flex justify-content-between card-head px-3 py-2">
                  <h4>${date.toLocaleDateString("eg-us", {
                    weekday: "long",
                  })}</h4>
                  <h4><span>${date.getDate()} </span><span>${date.toLocaleDateString(
      "eg-us",
      {
        month: "short",
      }
    )}</span></h4>
                </div>
                <div class="text-center p-3 mt-3">
                  <img src="http:${
                    daysArray[i].day.condition.icon
                  }" alt="status image" class="mb-2" />
                  <h3><span>${daysArray[i].day.avgtemp_c}</span>°C</h3>
                  <p class="mb-0">${daysArray[i].day.condition.text}</p>
                </div>
                <div class="d-flex align-items-center justify-content-between p-3">
                  <div class="disappear">
                    <span class="pe-3"
                        ><i class="fa-solid fa-umbrella pe-1"></i>${
                          daysArray[i].day.avghumidity
                        }%</span
                    >
                    <span class="pe-3"
                        ><i class="fa-solid fa-wind pe-1"></i>${
                          daysArray[i].day.maxwind_kph
                        }kph</span
                    >
                    <span class="pe-3"
                        ><i class="fa-regular fa-compass pe-1"></i>${
                          daysArray[i].hour[date.getHours()].wind_dir
                        }</span
                    >
                  </div>
                  <div class="cloud-icon">
                    <i class="fa-solid fa-cloud-sun-rain fa-bounce"></i>
                  </div>
                </div>
              </div>
            </div>
  `;
  }
  cardsContainer.innerHTML = cardsHTML;

  let cards = document.querySelectorAll(".inner");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function (e) {
      let activeLink = document.querySelector("#allCards .active");
      activeLink.classList.remove("active");
      e.currentTarget.classList.add("active");
    });
  }
}

function success(position) {
  const { coords } = position;
  let myPosition = `${coords.latitude + "," + coords.longitude}`;
  getData(myPosition);
}

navigator.geolocation.getCurrentPosition(success);

// * events
searchInput.addEventListener("input", function () {
  getData(searchInput.value);
});
