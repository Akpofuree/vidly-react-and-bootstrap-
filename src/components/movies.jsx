import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import Pagination from "../common/pagination";
import { paginate } from "../utilities/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    likedMovies: {},
    pageNumber: 4,
    currentNumber: 1,
    selectedGenre: null,
    selectedItem: null,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }
  deleteBtn = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleChangePage = (page) => {
    this.setState({ currentNumber: page });
  };
  handleGenreReset = (genre) => {
    this.setState({
      selectedItem: genre,
      selectedGenre: genre,

      currentNumber: 1,
    });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageNumber,
      currentNumber,
      movies: allMovies,
      genres,
      selectedGenre,
      selectedItem,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.sortBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentNumber, pageNumber);
    return (
      <>
        <div className="row">
          <div className="col-4">
            <ListGroup
              items={genres}
              textProperty="name"
              valueProperty="_id"
              onSelectItem={this.handleGenreReset}
              selectedItem={selectedItem}
            />
          </div>
          <div className="col">
            <p>{this.checkAmount()}</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onHandleClick={this.handleClick}
              onDelete={this.deleteBtn}
              onSort={this.handleSort}
            />
          </div>
        </div>
        <Pagination
          itemsCount={filteredMovies.length}
          pageNumber={pageNumber}
          currentNumber={currentNumber}
          selectedGenre={selectedGenre}
          onHandleChangePage={this.handleChangePage}
        />
      </>
    );
  }

  checkAmount() {
    const { length: count } = this.state.movies;
    return count === 0 ? (
      <p>Movies folder is empty</p>
    ) : (
      `you have ${count}movies left`
    );
  }
}

export default Movies;
