import firebase, { app } from "firebase";
import { firebaseConfig } from "./configs/db_config";
import React from "react";
import { Card, CardContent, List } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import "./styles/table.css";
import NvBarU2 from "./NvBarU2";
import CheckBox from "./checkbox";

class HomeU2 extends React.Component {
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
      total: 0,
      nameOS: [
        "นายแดง แกงเผ็ด",
        "นายขาว สาวเพียบ",
        "นายเอ เซเลิฟ",
        "นายบี ดีจังฮู่",
        "นายหนึ่ง บึงน้ำหวาว",
        "นายสอง คลองแสนแสบ",
        "นายดำ จำปาแดง"
      ]
    };
  }

  componentDidMount() {
    this.dataBase.on("value", gotdata => {
      var user_data = gotdata.val();
      var outData = [];
      for (var i in user_data) {
        if (user_data[i].In_Out == "Outsource") {
          outData[i] = user_data[i];
        }
      }
      this.setState({ rowData: outData });
    });
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };
  onClick(e) {
    this.dataBase = firebase.database().ref("/users/user2");
    this.dataBase.update({ work_list: this.state.rowselected });

    this.dataBase = firebase.database().ref("/work_result/dataParse");
    for (var i in this.state.rowselected) {
      this.dataBase
        .child("" + this.state.rowselected[i].index)
        .update({ company: "บริษัท ทวีพงษ์ ขนส่ง จำกัด" });
      this.dataBase
        .child("" + this.state.rowselected[i].index)
        .update({ status: "ยืนยัน" });
      this.dataBase
        .child("" + this.state.rowselected[i].index)
        .update({ driver: this.state.nameOS[i] });
    }
    this.props.history.push({
      pathname: "/WorkListU2"
    });
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.setState({ rowselected: selectedRows });
  }

  render() {
    return (
      <div>
        <NvBarU2 props={this.props} state={this.state}></NvBarU2>
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
                rowSelection="multiple"
                // rowSelection={this.state.rowSelection}
                onSelectionChanged={this.onSelectionChanged.bind(this)}
              />
            </div>
          </CardContent>
        </Card>
        <div className="total-cost">
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClick.bind(this)}
          >
            ตกลง
          </Button>
        </div>
      </div>
    );
  }
}
export default HomeU2;
