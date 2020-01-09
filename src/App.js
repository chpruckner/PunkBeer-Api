import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ListContainer from './Components/Main';
import Header from './Components/Header';
import Search from './Components/Search';
/*Components*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: false,
      searchInput: "",
      fav_ids: [],
      fav_beers: false
    };
  }

  componentDidMount = () => {
    fetch("https://api.punkapi.com/v2/beers")
    // Transform the returned json string data into a real json object.
    .then(response => response.json())
    // what to do with the data?
    .then(data => {
        const beerArr = [];
        data.map(beer => {
          beerArr.push({
              id: beer.id,
              name: beer.name,
              description: beer.description,
              image_url: beer.image_url
            })
          }
        );
        this.setState({
          beers: beerArr
        });
      }
    );
  }

  handleSearch = (e) => {
    this.setState({
      searchInput: e.target.value
    });
  };

  handleClick = (searchInput) => {
    const searchString = String(searchInput).trim();
    const noSpaceString = searchString.split(" ").join("_");
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${noSpaceString}`)
    // Transform the returned json string data into a real json object.
    .then(response => response.json())
    // what to do with the data?
    .then(data => {
      const beerArr = [];
      data.map(beer => {
        beerArr.push({
            id: beer.id,
            name: beer.name,
            description: beer.description,
            image_url: beer.image_url
          })
        }
      );
      this.setState({
        beers: beerArr
      });
    }
  );
  }

  setFav = (id) => {
    //alert(id);
    const beerID = String(id);
    let favList = this.state.fav_ids;

    if (!favList.includes(beerID)) {
      favList.push(beerID);
      this.setState({
        fav_ids: favList
      });
    } else if (favList.includes(beerID)) {
      let index = favList.indexOf(beerID);
      favList.splice(index, 1);
      this.setState({
        fav_ids: favList
      });
    }
    console.log("FavIds", this.state.fav_ids);
    return (
      this.fetchFav(this.state.fav_ids)
      )
  }

  fetchFav = (id) => {
    const ids = id.join("|");
    fetch(`https://api.punkapi.com/v2/beers?ids=${ids}`)
    // Transform the returned json string data into a real json object.
    .then(response => response.json())
    // what to do with the data?
    .then(data => {
      const beerArr = [];
      data.map(beer => {
        beerArr.push({
            id: beer.id,
            name: beer.name,
            description: beer.description,
            image_url: beer.image_url
          })
        }
      );
      this.setState({
        fav_beers: beerArr
      });
    }
  );
  }

  render() {
    return (
      <Router>
          <Header />
          <Switch>
            <Route path="/favourites">
            <div className="App">
              <ListContainer beers1={this.state.fav_beers} setFav={this.setFav} ids={this.state.fav_ids}/>
            </div>
            </Route>
            <Route path="/">
              <div className="App">
                  <Search handleClick={this.handleClick}/>
                {this.state.beers && <ListContainer beers1={this.state.beers} setFav={this.setFav} ids={this.state.fav_ids} />}
                {this.state.fav_beers && console.log("render fav", this.state.fav_ids)}
                {console.log('fav state', this.state.fav_beers)}
              </div>
            </Route>
          </Switch>
      </Router>
    )
  };
}
export default App;
