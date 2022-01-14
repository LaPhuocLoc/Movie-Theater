var moviesApi = "http://localhost:3000/movies";
var carouselApi = "http://localhost:3000/carousel";

function start() {
  getCarousels(renderCarousel);
  getMovies(renderRanking);
  getMovies(renderMoviesSection);
  getMovies(filterSearch)
}
start();
// Functions
function getMovies(callback) {
  fetch(moviesApi)
    .then((response) => response.json())
    .then(callback);
}

function getCarousels(callback) {
  fetch(carouselApi)
    .then((response) => response.json())
    .then(callback);
}

function renderRanking(movies) {
  var rankDiv = document.querySelector("#rank");
  var htmls = movies.map((movie) => {
    return `
        <div class="rank-item">
              <div class="rank-item__img-wrapper">
                <img src="${movie.imgUrl}" class="rank-item__img">
              </div>
              <div class="rank-item__title">
                <span class="rank-title rank-title--ranking"><i class="rank-icon rank-icon--one fas fa-crown"></i><span
                    class="rank-num">${movie.id}</span></span>
                <span class="rank-title rank-title--name">${movie.jpName}</span>
              </div>
            </div>
        `;
  });
  rankDiv.innerHTML = htmls.join("");
  slickSlider();
}

function renderCarousel(carousels) {
  var carouselInner = document.querySelector(".carousel-inner");
  var htmls = carousels.map((carousel) => {
    return `
        <div
              class="carousel-item"
              style="
                background: url(${carousel.imgUrl}) no-repeat
                  center/cover;
              "
            >
              <a
                href=""
                class="play-back-btn"
                data-bs-toggle="modal"
                data-bs-target="#trailerModal"
                data-bs-whatever="${carousel.videoLink}"
              ></a>
            </div>
        `;
  });
  carouselInner.innerHTML = htmls.join("");
  var carouselFirstItem = document.querySelector(".carousel-item:first-child");
  carouselFirstItem.classList.add("active");
}

function renderMoviesSection(movies) {
  var playingMoviesTab = document.querySelector("#playing-movies-tab");
  var comingMoviesTab = document.querySelector("#coming-movies-tab");
  var playingHtmls = movies.map((movie) => {
    if (movie.nowPlaying === "true") {
      return `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div
                  class="movie-bg-wrap"
                  style="
                    background: url(${movie.imgUrl}) no-repeat
                      center/cover;
                  "
                >
                  <a href="#" class="movie-ticket-btn white-btn">予約</a>
                </div>
                <div class="movie-title">
                  <h5 class="movie-title__heading">${movie.jpName}</h5>
                  <p class="movie-title__sub">${movie.enName}</p>
                </div>
              </div>
            `;
    }
  });
  var comingHtmls = movies.map((movie) => {
    if (movie.nowPlaying === "false") {
      return `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div
                  class="movie-bg-wrap"
                  style="
                    background: url(${movie.imgUrl}) no-repeat
                      center/cover;
                  "
                >
                  <a href="#" class="movie-ticket-btn white-btn">予約</a>
                </div>
                <div class="movie-title">
                  <h5 class="movie-title__heading">${movie.jpName}</h5>
                  <p class="movie-title__sub">${movie.enName}</p>
                </div>
              </div>
            `;
    }
  });
  playingMoviesTab.innerHTML = playingHtmls.join("");
  comingMoviesTab.innerHTML = comingHtmls.join("");
}
function filterSearch(movies) {
  var input = document.querySelector('.search-input')
  var ul = document.querySelector('.list-search')
  input.addEventListener('keyup', (e) => {
    var keyword = input.value.toLowerCase()
    var results = movies.filter((movie) => { 
      var filterWord = `${movie.enName}${movie.jpName}`.toLowerCase()
      console.log(filterWord);
      return filterWord.indexOf(keyword) > -1
    })
    var li = results.map((result) => {
      if ( result.nowPlaying === "true") {
        result.nowPlaying = "Now playing"
      }
      else if ( result.nowPlaying === "false") {
        result.nowPlaying = "Coming soon"
      }
      return `
              <li class="search-item">
                <div class="search-item_img">
                  <img src="${result.imgUrl}" alt="">
                </div>
                <div class="search-item_info">
                  <h5 class="search-item_info-title">${result.jpName}</h5>
                  <p class="search-item_info-subtitle">${result.enName}</p>
                  <p class="search-item_info-status">${result.nowPlaying}</p>
                </div>
              </li>
      `
    })
    ul.innerHTML = li.join('')
    if ( keyword === '') {
      ul.innerHTML = ''
    } 
  })
}
function slickSlider() {
  $("#rank").slick({
    centerMode: true,
    centerPadding: "250px",
    slidesToShow: 1,
    dots: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        centerMode: true,
        centerPadding: "200px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        centerMode: true,
        centerPadding: "150px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
    ],
  });
}