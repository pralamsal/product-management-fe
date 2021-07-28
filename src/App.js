import React, {Component} from 'react';
import Products from './components/products';

class App extends Component {
    constructor(props) {
            super(props);
            this.state = {
                sortType: 'asc',
                products: [],
                categories: [],
                displayCategory: ""
                };

       this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
       this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/products')
            .then(res => res.json())
            .then((data) => {
                this.setState({ products: data })
            })
            .catch(console.log)

        fetch('http://localhost:8080/api/categories')
            .then(res => res.json())
            .then((data) => {
                this.setState({ categories: data })
            })
            .catch(console.log)
    }

    onSort = sortType => {
        this.setState({sortType})
    }

    handleSubmitCategory(event) {
        alert("Your selected value is: " + this.state.displayCategory);
            event.preventDefault();
        }

    handleCategoryChange = event => {
        this.setState({ displayCategory: event.target.value });
      };


    render() {

        const sorted  = this.state.products.sort( (a, b) => {
            const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
            return  isReversed * a.name.localeCompare(b.name)
        });

        const products= this.state.products;
        const displayCategory = this.state.displayCategory;

        const filterDropDown = products.filter(currentProduct => {
            console.log("displayCategory: " + displayCategory);
            console.log("current product: " + currentProduct.categoryId);
            if (displayCategory === "") {
                return currentProduct;
            } else {
                return currentProduct.categoryId === parseInt(displayCategory);
            }
        });

        const styles = {
            margin: {
              padding: "10px"
            },
            thead: {
              padding: "10px",
              border: "dotted 1px black",
              backgroundColor: "grey",
              color: "white"
            },
            td: {
              padding: "10px",
              border: "dotted 1px black"
            }
          };

        return (
            <div>
                <h1 style={styles.margin}>Product Management</h1>

                <div style={styles.margin}>
                    <p><b>Sort by product name</b></p>
                    <button onClick={() => this.onSort('asc')}>Asc</button>
                    <button onClick={() => this.onSort('desc')}>Desc</button>
                </div>

                <div style={styles.margin}>
                    <p><b>Filter by product category</b></p>
                    <select id="displayCategory"
                        value={this.state.displayCategory}
                        onChange={this.handleCategoryChange}
                    >

                        {this.state.categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name} </option>
                        ))}
                    </select>
                </div>


                <div style={styles.margin}>
                    <h3>List of Products</h3>
                    <table>
                        <thead>
                          <tr>
                            <th style={styles.thead}>NAME</th>
                            <th style={styles.thead}>ID</th>
                            <th style={styles.thead}>DESCRIPTION</th>
                            <th style={styles.thead}>CREATION_DATE</th>
                            <th style={styles.thead}>UPDATE_DATE</th>
                            <th style={styles.thead}>LAST_PURCHASED_DATE</th>
                          </tr>
                        </thead>

                        <tbody>
                            {filterDropDown.map(product => (
                                <tr>
                                    <td style={styles.td}>{product.name} </td>
                                    <td style={styles.td}>{product.id} </td>
                                    <td style={styles.td}>{product.description} </td>
                                    <td style={styles.td}>{product.creationDate} </td>
                                    <td style={styles.td}>{product.updateDate} </td>
                                    <td style={styles.td}>{product.lastPurchasedDate} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default App;