import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const axios = require("axios");

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      emailid: "",
      password: "",
      cpassword: ""
    };
  }

  onChanging = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    await axios
      .post("http://localhost:3006/save/signup/details", {
        username: this.state.username,
        emailid: this.state.emailid,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
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
            <Modal.Title>SIGNUP</Modal.Title>
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
                name="username"
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
                name="emailid"
                placeholder="email:"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />

              <input
                type="text"
                name="password"
                placeholder="Paswword"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />
              <input
                type="text"
                name="cpassword"
                placeholder="Confirm Password:"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />

              <Modal.Footer>
                <div className="submit">
                  <button variant="primary">Signup</button>
                </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
