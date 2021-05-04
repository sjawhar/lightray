import React, { Component } from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.dark.css";

import { Layout } from "antd";
import moment from "moment";

import Clock from "./components/Clock";
import Settings from "./components/Settings";

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
      endTime: moment(endTime, "HH:mm"),
      startTime: moment(startTime, "HH:mm"),
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onTimeChange = ({ startTime: newStartTime, endTime: newEndTime }) => {
    let startTime = newStartTime || this.state.startTime;
    let endTime = newEndTime || this.state.endTime;

    if (startTime.isSameOrAfter(endTime)) {
      const duration = moment.duration(30, "minutes");
      if (newEndTime) {
        startTime = endTime.clone().subtract(duration);
      } else {
        endTime = startTime.clone().add(duration);
      }
    }

    localStorage.setItem("endTime", endTime.format("HH:mm"));
    localStorage.setItem("startTime", startTime.format("HH:mm"));
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
          <Clock style={{ flex: 1 }} endTime={endTime} startTime={startTime} />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
