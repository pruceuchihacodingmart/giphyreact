import React from "react";
import "./Favouritescss.css";
import Axios from "axios";

class Favourites extends React.Component {
  state = {
    data: {},
    check: false
  };
  componentDidMount = async () => {
    console.log("cm", this.state.data);

    await Axios.post("http://localhost:3006/list/lists", {
      token: localStorage.getItem("token")
    }).then(data => {
      console.log("data ", data);
      this.setState({ data: data.data.rows, check: true });
    });
  };

  handleclick = items => {
    let newData = this.state.data.filter(i => i.name !== items.name);
    this.setState({ data: newData });
    Axios.post("http://localhost:3006/delete/deletelist", {
      name: items.name,
      token: localStorage.getItem("token")
    });
  };

  cardview() {
    return (
      <div>
        {this.state.data.map((items, index) => {
          return (
            <div key={index} className="FavSec">
              <div className="card">
                <div class="card-header" style={{ display: "inline-flex" }}>
                  <span>{items.name}</span>
                  <span
                    onClick={() => {
                      //   //   console.log(items)
                      //   let data = this.state.data;
                      //   let newData = data.filter(i => i.title != items.title);
                      //   this.setState({ data: newData });

                      this.handleclick(items);
                    }}
                    className="Xmark"
                  >
                    X
                  </span>
                </div>
                <img src={items.url} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    console.log(this.state.data);

    var view = this.state.check ? <div>{this.cardview()}</div> : <div></div>;
    return (
      <div>
        <h1 style={{ color: "white", fontWeight: "bold" }}>FAVOURITES</h1>
        {view}
      </div>
    );
  }
}

export default Favourites;
