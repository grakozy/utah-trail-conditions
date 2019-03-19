import React, { Component } from "react";
import "./App.css";
// import moment from "moment";

const API =
  "https://sheets.googleapis.com/v4/spreadsheets/19V3ktxaj4YnrO3C3ocp4-jj1QTJI1ZCEG7aRl2Jlt1Q/values:batchGet?ranges=user_entries&majorDimension=ROWS&key=AIzaSyC6GyiXpiMeYlcf8vhLygKe3FHQuOGoQUY";

class App extends Component {
  constructor() {
    super();
    this.state = {
      conditions: []
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;

        let rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        this.setState({ conditions: rows.reverse() });
        console.log(this.state.conditions);
      });
  }
  render() {
    return (
      <div>
        <h1>Recent Reports</h1>
        <div className="button">
          <a
            className="myButton"
            target="_blank"
            rel="noopener noreferrer"
            href="https://goo.gl/forms/qKQ92PIjBfslJL0y1"
          >
            Add New Report
          </a>
        </div>
        <div className="reports">
          <div className="report">
            {this.state.conditions.map(report => (
              <div
                key={report.id}
                className="report-details"
                id={report.status}
              >
                <div className="trail">
                  <p className="label">Trail</p>
                  {report.trail}
                </div>
                <div className="status">
                  <p className="label">{report.timestamp}</p>
                  {report.status}
                </div>
                <div className="details">
                  <p className="label">Details</p>
                  {report.conditions}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
