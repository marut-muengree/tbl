import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import "./styles/nvBar.css";

class NvBarU2 extends React.Component {
  constructor(props) {
    super(props);
  }
  onclick() {
    this.props.props.history.push({
      pathname: "/"
    });
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          color="default"
          // elevation={0}
          className="appBar"
        >
          <Toolbar className="toolbar">
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className="toolbarTitle"
            >
              <img
                src={require("./styles/image/logo_nvbar.png")}
                className="size_icon"
              ></img>
            </Typography>
            <nav className="test">
              <Link
                variant="button"
                color="textPrimary"
                href="/HomeU2"
                className="link"
              >
                <HomeIcon fontSize="default"></HomeIcon>
                <div className="font_size">หน้าหลัก</div>
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                href="/WorkListU2"
                className="link"
              >
                <LibraryBooksIcon fontSize="default"></LibraryBooksIcon>
                <div className="font_size">งานที่ได้รับ</div>
              </Link>
            </nav>

            <Button
              variant="outlined"
              size="large"
              color="primary"
              className="link"
              onClick={this.onclick.bind(this)}
            >
              ออกจากระบบ
            </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}

        {/* End footer */}
      </React.Fragment>
    );
  }
}
export default NvBarU2;
