const rightArrows = document.querySelectorAll(".right-arrow");
const leftArrows = document.querySelectorAll(".left-arrow");
const movieLists = document.querySelectorAll(".movie-list");

const apiKey = 'api_key=7a7ca2a3552b35dc7d3779b5cdd1208d';
const base_url = 'https://api.themoviedb.org/3/';
const urlTrending = base_url + 'discover/movie?&sort_by=popularity.desc&' + apiKey;
const urlToprated = base_url + 'movie/top_rated?language=en-US&page=1&' + apiKey;
const urlUpcoming = base_url + 'movie/upcoming?language=en-US&page=1&' + apiKey;
const urlSearch = base_url + 'search/movie?' + apiKey + '&query=';

const trendingMovies = await getMovies(urlTrending);
const topRatedMovies = await getMovies(urlToprated);
const upcomingMovies = await getMovies(urlUpcoming);
const movieDisplay = document.querySelector('.movie-top1');

movieDisplay.innerHTML = `<img src="https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}" class="background">
                      <div class="movie-infor">
                          <p id="nameMovie">${trendingMovies[0].title}</p>
                          <p id="descMovie" style="line-height: 1.5;">${trendingMovies[0].overview}</p>
                      </div>
                      <div style="display: flex; justify-content: flex-start; margin-bottom: 20px;">
                          <button id="playBtn"><i class="fi fi-sr-play"></i> Play</button>
                          <button id="infoBtn">More info</button>
                      </div>`;
  
document.getElementById('infoBtn').addEventListener('click', () => showMovieDetail(trendingMovies[0]));

showMovies(trendingMovies, 'trendingMovies');
showMovies(topRatedMovies, 'topRatedMovies');
showMovies(upcomingMovies, 'upcomingMovies');

async function getMovies(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Could not fetch resource');
    
    const movies = await response.json();
    console.log(movies);
    return movies.results;
  }
  catch(error) {
    console.log(error);
  }
}

async function showMovieDetail(movie) {
  const { title, backdrop_path, poster_path, id: movieID, overview } = movie;
  const { runtime, year, genres, country, rate } = await getMovieDetail(movieID);

  const main = document.querySelector('body');
  // Tạo overlay
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  // Ẩn nội dung nền
  document.querySelector('main').setAttribute('inert', '');

  const movieInfo = document.createElement('div');
  movieInfo.classList.add('more-info');

  movieInfo.innerHTML = `<button class="close-btn">✖</button>
          <img src="https://image.tmdb.org/t/p/original${backdrop_path}" class="background2">
            <div class="info-container">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="poster">

                <div class="info-text">
                    <p class="title">${title}</p>
                    <p class="meta">${year} | ${runtime} min</p>

                    <div style="margin-bottom: 10px;">
                        <button class="overview">OVERVIEW</button>
                        <button class="trailer">TRAILER</button>
                        <button class="similar">MORE LIKE THIS</button>
                    </div>

                    <div class="Overview section">
                        <p>${overview}</p>
                        <div style="display: flex; justify-content: flex-start; align-items: center; gap: 20px; margin-left: 20px;">
                          <div style="color: grey; font-weight: 400;">
                            <p>Genres:</p>
                            <p>Country:</p>
                            <p>Rate:</p>
                          </div>
                          <div>
                            <p>${genres}</p>
                            <p>${country}</p>
                            <p>${rate}</p>
                          </div>
                        </div>
                    </div>

                    <div class="Trailer section" style="display:none;">
                    </div>

                    <div class="Similar section" style="display:none;">
                      
                    </div>
                </div>
            </div>`;
  main.appendChild(movieInfo);
  const infoText = movieInfo.querySelector('.info-text');
  const sections = infoText.querySelectorAll('.section');

  async function showSection(className) {
    sections.forEach(s => {
      if (s.classList.contains('Trailer')) s.innerHTML = ``;
      s.style.display = 'none';
    });
  
    const target = infoText.querySelector('.' + className);
    if (!target) return;
  
    if (className === 'Trailer') {
      const key = await getTrailer(movieID);
      target.innerHTML = `<iframe src="https://www.youtube.com/embed/${key}?autoplay=1" 
                              allow="pictute-in-picture; encrypted-media" 
                              allowfullscreen></iframe>`;
    }

    if (className === 'Similar') {
      const similars = await getSimilar(movieID);
      target.innerHTML = ` 
      <div class="Movies">
            <div class="movie-list similar-movies" >
               
            </div>
      </div>`;
      const movieList = target.querySelector('.similar-movies');
      similars.forEach(s => {
        const { backdrop_path } = s;
        if (!backdrop_path) return;
        const similar = document.createElement('div');
        similar.classList.add('Movie');
        similar.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${backdrop_path}" class="backdrop">`;
        similar.addEventListener('click', () => showMovieDetail(s));
        movieList.appendChild(similar);
      });
    }
  
    target.style.display = 'block';
    const allBtns = infoText.querySelectorAll('button');
    allBtns.forEach(b => b.classList.remove('active-tab'));

    const clickedBtn = infoText.querySelector(`.${className.toLowerCase()}`);
    clickedBtn.classList.add('active-tab');
  }      

  showSection('Overview');

  infoText.querySelector('.overview').addEventListener('click', () => {
    showSection('Overview');

  });

  infoText.querySelector('.trailer').addEventListener('click', () => {
    showSection('Trailer');
  });

  infoText.querySelector('.similar').addEventListener('click', () => {
    showSection('Similar');
  });

  // Đóng modal
  movieInfo.querySelector('.close-btn').addEventListener('click', () => {
    movieInfo.remove();
    overlay.classList.add('hidden');
    document.querySelector('main').removeAttribute('inert');
  });
}

function showMovies(movies, id) {
  const mainList = document.getElementById(id);

  mainList.innerHTML = ``;
  movies.forEach((movie) => {
    const { title, backdrop_path, poster_path, id:movieID, overview } = movie;
    if (!backdrop_path) return;

    const movieE = document.createElement('div');
    movieE.classList.add('Movie');
    movieE.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${backdrop_path}" class="backdrop">`;

    movieE.addEventListener('click', () => showMovieDetail(movie));
    const existingInfo = document.querySelector('.more-info');
    if (existingInfo) existingInfo.remove();

    mainList.appendChild(movieE);
  });
}

async function getTrailer(id) {
  const response = await fetch(base_url + 'movie/' + id + '/videos?language=en-US&' + apiKey);
  if (!response.ok) throw new Error('could not fetch trailer');
  const videos = await response.json();
  return videos.results[0].key;
}

async function getMovieDetail(id) {
  const response = await fetch (base_url + 'movie/' + id + '?language=en-US&' + apiKey);
  if (!response.ok) throw new Error('could not fetch detail');
  const detail = await response.json();
  return {
    runtime: detail.runtime,
    year: detail.release_date ? detail.release_date.slice(0, 4) : 'Unknown',
    genres: detail.genres.map(g=>g.name).join (', '),
    country: detail.production_countries.length > 0 ? detail.production_countries.map(c=>c.name).join(', ') : 'Unknown',
    rate: detail.vote_average
  }
}

async function getSimilar (id) {
  const response = await fetch(base_url + 'movie/' + id + '/similar?language=en-US&' + apiKey);
  if (!response.ok) throw new Error('could not fetch similar');
  const similars = await response.json();
  console.log(similars);
  return similars.results;
}

// Vị trí hiện tại
let scrollX = Array(movieLists.length).fill(0);
const slideAmount = 270;

rightArrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    const movieList = movieLists[i];
    const maxScroll = movieList.scrollWidth - movieList.offsetWidth;

    // Giới hạn: không vượt quá maxScroll
    if (Math.abs(scrollX[i]) < maxScroll) {
      scrollX[i] -= slideAmount;
      if (Math.abs(scrollX[i]) > maxScroll) {
        scrollX[i] = -maxScroll;
      }
      movieList.style.transform = `translateX(${scrollX[i]}px)`;
    }
  });
});

leftArrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    // Giới hạn: không lớn hơn 0
    if (scrollX[i] < 0) {
      scrollX[i] += slideAmount;
      if (scrollX[i] > 0) {
        scrollX[i] = 0;
      }
      movieLists[i].style.transform = `translateX(${scrollX[i]}px)`;
    }
  });
});

const form = document.getElementById('search-box');
const search = document.getElementById('search');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = search.value;
  
  if (value) {
		const movies = await getMovies(urlSearch + value);
		const main = document.querySelector('body');

		// Xóa modal cũ nếu có
    const oldModal = document.querySelector('.listMovies');
		if (oldModal) oldModal.remove();
		
		// Tạo overlay
		const overlay = document.getElementById('overlay');
		overlay.classList.remove('hidden');
		document.querySelector('main').setAttribute('inert', '');

		const resultBox = document.createElement('div');
		resultBox.classList.add('resultBox');

		const listMovies = document.createElement('div');
		listMovies.classList.add('listMovies');
		resultBox.innerHTML = `<button class="close-btn">✖</button>`;
		
		movies.forEach(movie => {
			const { poster_path, title, vote_average } = movie;
			if (!poster_path) return;

			const movieInfo = document.createElement('div');
			movieInfo.classList.add('Movie');
			movieInfo.style.width = '250px';
			movieInfo.style.backgroundImage = 'linear-gradient(to right, #2C2C2C, #522546, #88304E, #F7374F)';
			movieInfo.style.borderRadius = '10px';
			movieInfo.innerHTML = `
				<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="poster2">
				<div style="display: flex; justify-content: space-evenly; align-items: center; font-size: 20px; font-weight: 500; padding: 10px; flex: 1;">
					<p style="margin:0;">${title}</p>
					<p style="font-size: 18px; margin:0;">${vote_average.toFixed(1)}</p>
				</div>
			`;
      
      movieInfo.addEventListener('click', () => showMovieDetail(movie));
			listMovies.appendChild(movieInfo);
		});
		resultBox.appendChild(listMovies);
    main.appendChild(resultBox);
    
		// Đóng modal
		resultBox.querySelector('.close-btn').addEventListener('click', () => {
			resultBox.remove();
			overlay.classList.add('hidden');
			document.querySelector('main').removeAttribute('inert');
		});
  }
});

document.getElementById('popular').addEventListener('click', () => {
  document.getElementById("popularSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById('topRated').addEventListener('click', () => {
  document.getElementById("topRatedSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById('upcoming').addEventListener('click', () => {
  document.getElementById("upcomingSection").scrollIntoView({ behavior: "smooth" });
});