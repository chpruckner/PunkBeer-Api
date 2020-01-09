import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchInput: ""
      };
    }
  
    handleSearch = e => {
      this.setState({
        searchInput: e.target.value
      });
    };

    onKeyPress = (event) => {
      if (event.key === "Enter") {
        //alert(22);
        this.props.handleButtonSearch(this.state.searchInput)
      }}
  
    render() {
        return( 
            <form className="form-inline">
                <input type="text" className="form-control mb-2 mr-sm-2" id="searchInput" placeholder="Search a beer ..." onChange={this.handleSearch} value={this.state.searchInput} />
                <button type="button" className="btn btn-primary mb-2" onClick={() => this.props.handleClick(this.state.searchInput)}>Search</button>
            </form>
            
        )
    }
}

export default Search; 