import React, { Component } from "react";

class ProductCategoryRow extends Component {
  render() {
    const category = this.props.category;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    const searchText = this.props.searchText;
    const inStock = this.props.inStock;

    const row = [];
    let prevCategory = null;

    this.props.product.map(product => {
      if (prevCategory !== product.category) {
        row.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }

      if (inStock && !product.stocked) return;

      if (product.name.indexOf(searchText) !== -1) {
        row.push(<ProductRow product={product} key={product.name} />);
      }
      prevCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
  }

  handleSearchChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  handleStockChange(e) {
    this.props.onStockChange(e.target.checked);
  }

  render() {
    return (
      <div>
        <input
          type="Search"
          placeholder="Search..."
          value={this.props.searchText}
          onChange={this.handleSearchChange}
        />
        <p>
          <input
            type="checkbox"
            onChange={this.handleStockChange}
            checked={this.props.inStock}
          />
          Show only items in stock.
        </p>
      </div>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);

    this.state = { searchText: "", inStock: false };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
  }

  handleSearchChange(searchText) {
    this.setState({ searchText: searchText });
  }

  handleStockChange(inStock) {
    this.setState({ inStock: inStock });
  }

  render() {
    return (
      <div>
        <SearchBar
          onSearchChange={this.handleSearchChange}
          onStockChange={this.handleStockChange}
          searchText={this.state.searchText}
          inStock={this.state.inStock}
        />
        <ProductTable
          product={this.props.product}
          searchText={this.state.searchText}
          inStock={this.state.inStock}
        />
      </div>
    );
  }
}

export default FilterableProductTable;
