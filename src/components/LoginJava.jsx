import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { firebaseConfig } from "./configs/db_config";
import firebase, { app } from "firebase";
import "./styles/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "test", user_name: "" };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.usersData = firebase.database().ref("users");
  }
  componentDidMount() {}
  onclick() {
    this.usersData.on("value", gotdata => {
      var user_data = gotdata.val();
      for (var i in user_data) {
        if (this.state.user_name === user_data[i].userName) {
          console.log(this.state.user_name);
          if (user_data[i].status === 1) {
            this.props.history.push({
              pathname: "/Home"
            });
          } else if (user_data[i].status === 2) {
            this.props.history.push({
              pathname: "/HomeU2"
            });
          }
        }
      }
    });
  }
  onChangeUser(e) {
    this.state.user_name = e.target.value;
  }
  render() {
    return (
      <Grid container component="main" className="root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="test_image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paper">
            <img
              src={require("./styles/image/logo_login.png")}
              className="logo-size"
            ></img>
            <Typography component="h1" variant="h5">
              เข้าสู่ระบบ
            </Typography>
            <form className="form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="ชื่อผู้ใช้"
                name="email"
                autoComplete="email"
                onChange={this.onChangeUser.bind(this)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <br></br>
              <br></br>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onclick.bind(this)}
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default Login;
