import firebase, { app } from "firebase";
import React from "react";
import Button from "@material-ui/core/Button";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { firebaseConfig } from "./configs/db_config";
import XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./styles/table.css";

class TableComp extends React.Component {
  constructor(props) {
    super(props);
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      columnDefsPlan: props.props.columnDefsPlan,
      rowDataPlan: [],
      rowDataOut: [],
      frameworkComponents: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // update data
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };
  // plan
  handleClick(e) {
    this.refs.fileUploader.click();
  }
  handleChange(e) {
    e.preventDefault();
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = e => {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 0 });
      // set data row in table
      this.setState({ rowDataPlan: dataParse });
      // update table
      this.gridApi.setRowData(this.state.rowDataPlan);
      if (this.props.props.text === "กรุณาเลือกไฟล์แผนงาน") {
        this.dataBase = firebase.database().ref("/work_result");
        this.dataBase.update({ dataParse });
      }
    };
    reader.readAsBinaryString(f);
  }
  // drive in source

  render() {
    return (
      <div>
        <Card className="padding">
          <CardActions className="btn-set">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              <input
                type="file"
                id="file"
                ref="fileUploader"
                style={{ display: "none" }}
                onChange={this.handleChange}
              />
              Choose file
            </Button>
            {/* chang to paramiter */}
            <div>{this.props.props.text}</div>
          </CardActions>
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
                columnDefs={this.state.columnDefsPlan}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.rowDataPlan}
                onGridReady={this.onGridReady}
                animateRows={true}
                frameworkComponents={this.state.frameworkComponents}
                // rowSelection={this.state.rowSelection}
                // onSelectionChanged={this.onSelectionChanged.bind(this)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default TableComp;
