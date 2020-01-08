import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { 
  FaHeart, 
  FaRegHeart 
} from 'react-icons/fa';

/*Components*/

const ListContainer = (props) => {
  return <Lists beers2={props.beers1} setFav={props.setFav} ids={props.ids} />;
};

const Lists = (props) => {
  const beers = props.beers2;
  const listItems = beers.map(beer => (
    <ListItem key={beer.id} id={beer.id} name={beer.name} description={beer.description} image_url={beer.image_url} setFav={props.setFav} ids={props.ids} />
  ));
  return <div className="row my-4 beer-list">{listItems}</div>;
};

const cutDescription = (str) => {
  const maxLength = 120;
  if (str.length > maxLength) {
    let cutString = str.substr(0, maxLength);
    const lastSpaceInString = cutString.lastIndexOf(" ");
    const limit = cutString.length > lastSpaceInString ? lastSpaceInString : cutString.length;
    cutString = cutString.substr(0, limit);
    return (cutString + " ...");
  }
  else {
    return str;
  }
}

const ListItem = (props) => {
    const { id, name, description, image_url } = props;
    const newDescription = cutDescription(description);
    /* const maxLength = 120;
    let cutString = description.length > maxLength && description.substring(0, maxLength);
    const lastSpace = cutString.lastIndexOf(" ");
    cutString = cutString.substring(0, Math.min(description.length, lastSpace));
    const tail = " ..." */
    //console.log(typeof(lastSpace));
    return ( 
      <div className="card-wrapper col-md-4 p-2 d-flex align-items-stretch">
      {/*console.log("Props IDS", typeof(props.ids))*/}
      {/*console.log("asdfa", typeof(props.id))*/}
        <div className="card mb-3 p-3">
          <div className="row">
            <div className="col-md-2 d-flex align-items-center">
              {image_url != null && <img src={image_url} className="card-img" alt="beer" />}
            </div>
            <div className="col-md-9 d-flex flex-column align-itmes-stretch">
              <div className="card-body text-left pt-0">
                <p className="card-text justify-content-end fav-icon">
                  {props.ids.hasOwnProperty(id) ? <FaHeart onClick={() => props.setFav(id)} /> : <FaRegHeart onClick={() => props.setFav(id)} /> }
                </p>
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{newDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <div>
          <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
            <span className="navbar-brand">We Love Beer</span>
            <ul className="nav">
              <li className="nav-item p-2">
                <Link className="nav-item" to="/">Home</Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-item" to="/favourites">Favourites</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/favourites">
              {this.state.fav_beers && <div className="App">
                <ListContainer beers1={this.state.fav_beers} setFav={this.setFav} ids={this.state.fav_ids} />
                </div>}
            </Route>
            <Route path="/">
              <div className="App">
                <form className="form-inline">
                  <input 
                    type="text" 
                    className="form-control mb-2 mr-sm-2" 
                    id="searchInput" 
                    placeholder="Search a beer ..." 
                    onChange={this.handleSearch} 
                    value={this.state.searchInput}
                  />
                  <button type="button" className="btn btn-primary mb-2" onClick={() => this.handleClick(this.state.searchInput)}>
                    Search
                  </button>
                </form>
                {this.state.beers && <ListContainer beers1={this.state.beers} setFav={this.setFav} ids={this.state.fav_ids} />}
                {this.state.searchInput && console.log("search input render", this.state.searchInput)}
                {this.state.fav_beers && console.log("render fav", this.state.fav_beers)}
                {console.log("render fav ids", typeof(this.state.fav_ids))}
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  };
}
export default App;
