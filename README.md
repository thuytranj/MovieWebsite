# 🎬 Movie Explorer

Movie Explorer is a web application that uses the TMDb (The Movie Database) API to let users explore movies. You can browse popular, top-rated, upcoming movies, search by title, and view detailed movie info including trailers, genres, countries, and similar movies.

---

## 🚀 Features

- 🔥 Display Trending, Top Rated, and Upcoming movies  
- 🎥 View detailed movie info with:  
  - Title, description, runtime, release year  
  - Genres, production countries  
  - Rating score  
  - Movie trailer embedded  
  - Similar movies recommendation  
- 🔍 Search movies by title with instant modal results  
- 🧭 Smooth scroll navigation to Trending, Top Rated, Upcoming sections  
- ⬅️➡️ Horizontal scrolling with left/right arrow controls

---

## 🛠️ Technologies Used

- JavaScript (ES6+)  
- Fetch API for TMDb API calls  
- HTML5 & CSS3 for UI  
- TMDb API v3

---

## ⚙️ Usage

1. Download or clone this repository  
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge)  
3. Browse movies in Trending, Top Rated, Upcoming categories  
4. Click on a movie poster to open the detail modal  
5. Search movies using the search box

---

## 🔑 API Key

This app uses TMDb API key:  
`7a7ca2a3552b35dc7d3779b5cdd1208d`  

You can replace it with your own API key inside the source code if you prefer.

---

## 📁 Main Code Structure

- `getMovies(url)` — fetches movies list from TMDb API  
- `showMovies(movies, id)` — renders movies into respective sections  
- `showMovieDetail(movie)` — displays detailed modal for a movie  
- `getMovieDetail(id)` — fetches detailed info of a movie  
- `getTrailer(id)` — fetches movie trailer videos  
- `getSimilar(id)` — fetches list of similar movies  
- Scroll controls for horizontal movie lists  
- Search input event handling with modal result display

---

## 🎞️ Demo

Open the `index.html` file in your browser to try the app.

---

## 📷 Screenshot

![Screenshot](https://github.com/thuytranj/MovieWebsite/blob/5cdba9d6863953e159dbe86df6352b78f151c43b/Image/movieWeb.html.png)
![Screenshot](https://github.com/thuytranj/MovieWebsite/blob/5cdba9d6863953e159dbe86df6352b78f151c43b/Image/searchResult.png)
![Screenshot](https://github.com/thuytranj/MovieWebsite/blob/5cdba9d6863953e159dbe86df6352b78f151c43b/Image/overviewTab.png)
![Screenshot](https://github.com/thuytranj/MovieWebsite/blob/5cdba9d6863953e159dbe86df6352b78f151c43b/Image/similarTab.png)
![Screenshot](https://github.com/thuytranj/MovieWebsite/blob/5cdba9d6863953e159dbe86df6352b78f151c43b/Image/trailerTab.png)

---
