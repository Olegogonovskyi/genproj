import {axiosInstanse} from "./axios.api.service";
import {urls} from "../costants/Urls";
import {IPaginationModel} from "../Models/IPaginationModel";
import {IMovieModel} from "../Models/IMovieModel";
import {IMovieDetailInfo} from "../Models/IMovieDetailInfo";
import {IVideoModel} from "../Models/IVideoModel";
import {IGenreModel} from "../Models/IGenreModel";
import {IgnreServiceType} from "../Models/IgnreServiceType";
import {ISearchServiceType} from "../Models/ISearchServiceType";

export const genApiService = {
    getAllMovies: async (page: string): Promise<IPaginationModel<IMovieModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IMovieModel>>(urls.movieUrls.allMovie, {params: {page: page}})
        return data
    },
    getNowPlayingMovies: async (): Promise<IMovieModel[]> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IMovieModel>>(urls.movieUrls.nowPlayingMovies)
        return data.results
    },
    searchMovie: async ({query: {query}, page}: ISearchServiceType): Promise<IPaginationModel<IMovieModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IMovieModel>>(urls.search.searchMovie(query), {params: {page: page}})
        return data
    },
    movieDetails: async (movieId: string): Promise<IMovieDetailInfo> => {
        const {data} = await axiosInstanse.get<IMovieDetailInfo>(urls.movieUrls.detailsMovie(movieId))
        return data
    },
    getVideos: async (movieId: string): Promise<IVideoModel> => {
        const {data} = await axiosInstanse.get<IVideoModel>(urls.videoUrls.getVideos(movieId))
        return data
    },
    getGenres: async (): Promise<IGenreModel[]> => {
        const {data} = await axiosInstanse.get(urls.genreUrls.allGenres)
        return data
    },
    getMoviesByGenre: async ({page, id}: IgnreServiceType): Promise<IPaginationModel<IMovieModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IMovieModel>>(urls.genreUrls.getByIdGenre({page, id}))
        return data

    }
}