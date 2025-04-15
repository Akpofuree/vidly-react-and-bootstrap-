import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  
  renderSortIcon = (column) => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return null;

    if (order === "asc") return <i className="fa fa-sort-asc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            if (!column.path && !column.label) return null; // Skip columns without path or label

            return (
              <th
                key={column.path || column.key}
                onClick={() => column.path && this.raiseSort(column.path)} // Only call raiseSort if path exists
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            );
          })}{" "}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
