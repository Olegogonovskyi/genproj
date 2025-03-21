import {IgnreServiceType} from "../Models/IgnreServiceType"

const baseUrl = 'https://api.themoviedb.org/3/'
const urls = {
    movieUrls: {
        allMovie: 'discover/movie',
        nowPlayingMovies: 'movie/now_playing',
        detailsMovie: (id: string) => '/movie/' + id
    },
    genreUrls: {
        allGenres: 'genre/movie/list',
        getByIdGenre: ({id, page}: IgnreServiceType) => urls.movieUrls.allMovie + '?page=' + page + '&with_genres=' + id
    },
    search: {
        searchPage: 'search',
        searchMovie: (query: string) => 'search/movie?query=' + query
    },
    image: (path: string) => 'https://image.tmdb.org/t/p/w500/' + path,
    videoUrls: {
        getVideos: (id: string) => 'movie/' + id + '/videos',
        showVideo: (key: string) => ' https://www.youtube.com/embed/' + key
    }
}

export {
    baseUrl, urls
}
