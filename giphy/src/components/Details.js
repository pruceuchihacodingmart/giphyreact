import React from 'react';
import './Detailscss.css';

class Details extends React.Component {
    render(){
        let { location } = this.props;
        return(
            <div className="DetailsSection">
                <img src={location && location.state && location.state.url}/>
                <h1>Title :{location && location.state && location.state.title}</h1>
                <h1>Rating: {location && location.state && location.state.rating}</h1>

            </div>
        );
    }
   
    }

export default Details;
