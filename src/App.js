import React, { Component } from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.dark.css";

import { Layout } from "antd";
import moment from "moment";

import Clock from "./components/Clock";
import Settings from "./components/Settings";

import { FORMAT_TIME } from "./constants";

const appStyle = {
  minHeight: "100vh",
};

const appBodyStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  flex: 1,
};

class App extends Component {
  constructor(props) {
    super(props);
    const startTime = localStorage.getItem("startTime") || "05:30";
    const endTime = localStorage.getItem("endTime") || "06:00";

    this.state = {
      collapsed: true,
      endTime: endTime,
      startTime: startTime,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onTimeChange = ({ startTime: newStartTime, endTime: newEndTime }) => {
    let startTimeObj =
      newStartTime || moment(this.state.startTime, FORMAT_TIME);
    let endTimeObj = newEndTime || moment(this.state.endTime, FORMAT_TIME);

    if (startTimeObj.isSameOrAfter(endTimeObj)) {
      const duration = moment.duration(30, "minutes");
      if (newEndTime) {
        startTimeObj = endTimeObj.clone().subtract(duration);
      } else {
        endTimeObj = startTimeObj.clone().add(duration);
      }
    }

    const startTime = startTimeObj.format(FORMAT_TIME);
    const endTime = endTimeObj.format(FORMAT_TIME);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("startTime", startTime);
    this.setState({ endTime, startTime });
  };

  render() {
    const { collapsed, endTime, startTime } = this.state;
    return (
      <Layout className="App" style={appStyle}>
        <Layout.Sider
          breakpoint="lg"
          collapsible
          collapsedWidth="0"
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          width="150"
          zeroWidthTriggerStyle={{ top: 0 }}
        >
          <Settings
            endTime={endTime}
            onChange={this.onTimeChange}
            startTime={startTime}
          />
        </Layout.Sider>
        <Layout.Content style={appBodyStyles}>
          <Clock endTime={endTime} startTime={startTime} style={{ flex: 1 }} />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
