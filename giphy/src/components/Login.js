import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const axios = require("axios");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginusername: "",
      loginpassword: ""
    };
  }

  onChanging = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    await axios
      .post("http://localhost:3006/check/login/details", {
        username: this.state.loginusername,
        password: this.state.loginpassword
      })
      .then(res => {
        localStorage.setItem("token", res.data);
        localStorage.setItem("loginstatus", true);
        if (res.data !== "not loggedin") {
          this.props.loginviewer();
        }
      });
  };

  render() {
    return (
      <div className="mainme">
        <Modal
          show={this.props.showstate}
          style={{ marginTop: "15%", marginLeft: "2%" }}
        >
          <Modal.Header style={{ backgroundColor: "#202124", color: "white" }}>
            <Modal.Title>LOGIN</Modal.Title>
            <Button variant="secondary" onClick={this.props.closeHandler}>
              X
            </Button>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.closeHandler();
                this.handleSubmit();
              }}
            >
              <input
                type="text"
                name="loginusername"
                placeholder="Username:"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />

              <input
                type="text"
                name="loginpassword"
                placeholder="Paswword"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />

              <Modal.Footer>
                <div className="submit">
                  <button variant="primary">Login</button>
                </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
