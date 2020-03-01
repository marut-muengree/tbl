import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);

    this.invokeParentMethod = this.invokeParentMethod.bind(this);
  }

  invokeParentMethod() {
    // this.props.context.componentParent.methodFromParent(
    //   `Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`
    // );
  }

  render() {
    return (
      <div
        style={{
          textAlignVertical: "center",
          textAlign: "center"
        }}
      >
        <Link
          to={{
            pathname: "/info",
            state: {
              rowData: this.props.agGridReact.gridOptions.rowData,
              studentInfo: this.props.node.data,
              index: this.props.node.rowIndex,
              add: false,
              edit: true
            }
          }}
        >
          <button
            style={{ height: 20, lineHeight: 0.5 }}
            onClick={this.invokeParentMethod}
            className="btn btn-info"
          >
            Edit
          </button>
        </Link>
      </div>
    );
  }
}
