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
      endTime: moment(endTime, FORMAT_TIME),
      startTime: moment(startTime, FORMAT_TIME),
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onDebug = () => {
    this.setState({ debug: !this.state.debug });
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

    localStorage.setItem("endTime", endTime.format(FORMAT_TIME));
    localStorage.setItem("startTime", startTime.format(FORMAT_TIME));
    this.setState({ endTime, startTime });
  };

  render() {
    const { collapsed, debug, endTime, startTime } = this.state;
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
            debug={debug}
            endTime={endTime}
            onChange={this.onTimeChange}
            onDebug={this.onDebug}
            startTime={startTime}
          />
        </Layout.Sider>
        <Layout.Content style={appBodyStyles}>
          <Clock
            debug={debug}
            endTime={endTime.format(FORMAT_TIME)}
            startTime={startTime.format(FORMAT_TIME)}
            style={{ flex: 1 }}
          />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
