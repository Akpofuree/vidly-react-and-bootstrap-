import React, { Component } from "react";
import Like from "../common/like";

import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          onClick={() => this.props.onHandleClick(movie)}
          liked={movie.liked}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onDelete, onHandleClick, onSort, sortColumn } = this.props;
    return (
      <div className="table-responsive">
        <table className="table">
          <TableHeader
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </div>
    );
  }
}

export default MoviesTable;
