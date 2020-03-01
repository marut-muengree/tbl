import firebase, { app } from "firebase";
import { firebaseConfig } from "./configs/db_config";
import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./styles/table.css";
import NvBar from "./NvBar";
import numeral from "numeral";

class Result extends React.Component {
  constructor(props) {
    super(props);
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.dataBase = firebase.database().ref("/work_result/dataParse");
    this.state = {
      columnDefs: [
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
        },
        {
          headerName: "In Source/Out Source",
          field: "In_Out",
          sortable: true,
          filter: true
        },
        {
          headerName: "ราคา",
          field: "Baht",
          sortable: true,
          filter: true
        }
      ],
      rowData: [],
      frameworkComponents: {},
      total: 0
    };
    var sum = 0;
    this.dataBase.on("value", gotdata => {
      var user_data = gotdata.val();
      this.setState({ rowData: user_data });
      for (var i in this.state.rowData) {
        sum = sum + this.state.rowData[i].Baht;
      }
      var string = numeral(sum).format("0,0");
      this.setState({ total: string });
    });
  }
  componentDidMount() {
    var sum = 0;
    this.dataBase.on("value", gotdata => {
      var user_data = gotdata.val();
      this.setState({ rowData: user_data });
      for (var i in this.state.rowData) {
        sum = sum + this.state.rowData[i].Baht;
      }
      var string = numeral(sum).format("0,0");
      this.setState({ total: string });
    });
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    return (
      <div>
        <NvBar props={this.props} state={this.state}></NvBar>
        <br></br>
        {/* card for plan */}
        <Card className="padding">
          <CardContent>
            <div
              id="myGrid"
              style={{
                height: "500px",
                width: "100%"
              }}
              className="ag-theme-balham"
            >
              <AgGridReact
                modules={this.state.modules}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.rowData}
                onGridReady={this.onGridReady}
                animateRows={true}
                frameworkComponents={this.state.frameworkComponents}
                // rowSelection={this.state.rowSelection}
                // onSelectionChanged={this.onSelectionChanged.bind(this)}
              />
            </div>
          </CardContent>
        </Card>
        <div className="total-cost">Total Cost : {this.state.total} บาท</div>
      </div>
    );
  }
}
export default Result;
