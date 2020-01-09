import React from 'react';

import { 
    FaHeart, 
    FaRegHeart 
  } from 'react-icons/fa';
  
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

    export default ListContainer;