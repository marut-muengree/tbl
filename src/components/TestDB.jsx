import firebase, { app } from "firebase";

import React from "react";
import Button from "@material-ui/core/Button";
import { firebaseConfig } from "./configs/db_config";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./styles/table.css";
import NvBar from "./NvBar";
import TableComp from "./TableComp";

class TestDB extends React.Component {
  constructor(props) {
    super(props);
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state1 = {
      columnDefsPlan: [
        {
          headerName: "รหัสงาน",
          field: "รหัสงาน",
          sortable: true,
          filter: true,
          suppressSizeToFit: true
        },
        {
          headerName: "ต้นทาง",
          field: "ต้นทาง",
          sortable: true,
          filter: true
        },
        {
          headerName: "ปลายทาง",
          field: "ปลายทาง",
          sortable: true,
          filter: true
        },
        //   {
        //     headerName: "Edit",
        //     cellRenderer: "ButtonEdit"
        //   },
        {
          headerName: "ชนิดรถ",
          field: "type",
          sortable: true,
          filter: true
        }
      ],
      rowDataPlan: [],
      text: "กรุณาเลือกไฟล์แผนงาน"
    };
    this.state2 = {
      columnDefsPlan: [
        {
          headerName: "รหัสงาน",
          field: "รหัสงาน",
          sortable: true,
          filter: true,
          suppressSizeToFit: true
        },
        {
          headerName: "ต้นทาง",
          field: "ต้นทาง",
          sortable: true,
          filter: true
        },
        {
          headerName: "ปลายทาง",
          field: "ปลายทาง",
          sortable: true,
          filter: true
        },
        {
          headerName: "ชนิดรถ",
          field: "type",
          sortable: true,
          filter: true
        }
      ],
      rowDataPlan: [],
      text: "กรุณาเลือกไฟล์ข้อมูลคนขับ(In source)"
    };
    this.state3 = {
      columnDefsPlan: [
        {
          headerName: "รหัสงาน",
          field: "รหัสงาน",
          sortable: true,
          filter: true,
          suppressSizeToFit: true
        },
        {
          headerName: "ต้นทาง",
          field: "ต้นทาง",
          sortable: true,
          filter: true
        },
        {
          headerName: "ปลายทาง",
          field: "ปลายทาง",
          sortable: true,
          filter: true
        },
        {
          headerName: "ชนิดรถ",
          field: "type",
          sortable: true,
          filter: true
        }
      ],
      rowDataPlan: [],
      text: "กรุณาเลือกไฟล์ข้อมูลคนขับ(Out source)"
    };
  }
  onClickVisulize() {
    this.dataBase = firebase.database().ref("/users/user2/work_list");
    this.dataBase.remove();
    this.props.history.push({
      pathname: "/Result"
    });
  }

  render() {
    return (
      <div>
        <NvBar props={this.props}></NvBar>
        <br></br>
        <TableComp props={this.state1}></TableComp>
        <TableComp props={this.state2}></TableComp>
        <TableComp props={this.state3}></TableComp>
        <div className="btn-center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClickVisulize.bind(this)}
          >
            ประมวลผล
          </Button>
        </div>
      </div>
    );
  }
}
export default TestDB;
