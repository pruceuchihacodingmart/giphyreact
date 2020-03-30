import React from "react";
import "./SearchBarcss.css";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const axios = require("axios");

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      loading: true,
      imageData: null,
      limit: 42,
      offset: 0,
      title: null,
      rating: null,
      favor: [],
      favorTitle: [],
      deleteData: [],
      loginShow: false,
      signupShow: false,
      showitems: false,
      loginitems: true
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.timerID = setInterval(() => this.tick(), 1000);
    axios
      .post("http://localhost:3006/auth/verification", {
        token: localStorage.getItem("token")
      })
      .then(res => {
        if (res) {
          this.setState({ showitems: true });
          this.setState({ loginitems: false });
        }
      });
  }

  async tick() {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=LgrCMG2vg1lwGS0XtYFgc8ztSKFkAsx9&q=${this.state.searchTerm}&limit=${this.state.limit}&offset=${this.state.offset}&rating=G&lang=en`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ imageData: data.data, loading: false });
    // console.log(data)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onInputChange(searchTerm) {
    this.setState({ searchTerm });
  }

  handleScroll = () => {
    const bottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight;
    // console.log(bottom)
    if (bottom) {
      this.setState({ limit: this.state.limit + 25 });
      this.setState({ offset: this.state.offset + 1 });
      //  console.log("BOTTOM REACHED:",bottom);
    }
  };

  render() {
    return (
      <div>
        <div className="fwrap">
          <div className={this.state.showitems ? "search" : "none"}>
            <input
              type="text"
              className="searchTerm"
              onChange={event => this.onInputChange(event.target.value)}
              placeholder="Search Your Mind"
            />
          </div>
          <div
            className={this.state.showitems ? "button-container" : "none"}
            onClick={async () => {
              await axios
                .post("http://localhost:3006/favourites", {
                  name: this.state.favor,
                  token: localStorage.getItem("token")
                })
                .then(res => {
                  console.log(res);
                });
            }}
          >
            <a className="btn">
              <span> ADD Favourites</span>
            </a>
          </div>
          <div className={this.state.showitems ? "button-container" : "none"}>
            <Link
              to={{
                pathname: "/favourites"
              }}
            >
              <a className="btn" id="fava">
                <span>Favourites</span>
              </a>
            </Link>
          </div>
          <div
            className={this.state.loginitems ? "button-container" : "none"}
            onClick={() => this.setState({ loginShow: !this.state.loginShow })}
          >
            <a className="btn" id="log">
              <span>Login</span>
            </a>
          </div>
          <div
            className={this.state.loginitems ? "button-container" : "none"}
            onClick={() =>
              this.setState({ signupShow: !this.state.signupShow })
            }
          >
            <a className="btn" id="sign">
              <span>SignUP</span>
            </a>
          </div>

          <div
            className={this.state.loginitems ? "none" : "button-container"}
            onClick={() => {
              this.setState({ showitems: false, loginitems: true });
              localStorage.removeItem("token");
              localStorage.removeItem("loginstatus")
            }}
          >
            <a className="btn" id="sign">
              <span>logout</span>
            </a>
          </div>
        </div>

        <div>
          {this.state.loading || !this.state.imageData ? (
            <div></div>
          ) : (
            <div className="giphy_flex">
              {this.state.imageData.map((items, index) => {
                return (
                  <div className="giphy_img" key={index}>
                    <div className="card">
                      <Link
                        key={index}
                        to={{
                          pathname: "/details",
                          state: {
                            url: items.images.original.url,
                            title: items.title,
                            rating: items.rating
                          }
                        }}
                      >
                        <img
                          className="card-img-top"
                          alt="yet to come"
                          src={items.images.original.url}
                        />
                      </Link>
                      <div
                        className="card-footer"
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        <input
                          type="checkbox"
                          onClick={() => {
                            var favObject = {
                              url: items.images.original.url,
                              title: items.title
                            };
                            // var favTitleObject = {};
                            this.state.favor.push(favObject);
                          }}
                        />
                        <small
                          style={{ fontSize: "12px" }}
                          className="text-muted"
                        >
                          {items.title}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Login
          showstate={this.state.loginShow}
          loginchecker={this.state.showitems}
          closeHandler={e => {
            this.setState({ loginShow: !this.state.loginShow });
          }}
          loginviewer={e => {
            this.setState({ showitems: true });
            this.setState({ loginitems: false });
          }}
        />
        <Signup
          showstate={this.state.signupShow}
          closeHandler={e => {
            this.setState({ signupShow: !this.state.signupShow });
          }}
        />
      </div>
    );
  }
}

export default SearchBar;
