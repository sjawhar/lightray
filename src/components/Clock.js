import React, { Component } from "react";
import { Button } from "antd";
import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import moment from "moment";

import { FORMAT_TIME } from "../constants";

class Clock extends Component {
  state = {
    illumination: 0,
    lightSwitch: true,
    time: moment(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    const { startTime } = this.getTimes();
    const { lightSwitch, time: lastTime } = this.state;
    const time = moment();
    const newState = { time };
    if (
      !lightSwitch &&
      time.isSameOrAfter(startTime) &&
      lastTime.isSameOrBefore(startTime)
    ) {
      newState.lightSwitch = true;
    }
    this.setState(newState, this.illuminate);
  };

  illuminate = () => {
    const { lightSwitch, time } = this.state;
    const { endTime, startTime } = this.getTimes();

    const illumination =
      lightSwitch *
      Math.max(0, Math.min(1, (time - startTime) / (endTime - startTime)));
    this.setState({ illumination });
  };

  onSwitchFlip = () => {
    this.setState({ lightSwitch: !this.state.lightSwitch }, this.illuminate);
  };

  getTimes = () => ({
    endTime: moment(this.props.endTime, FORMAT_TIME),
    startTime: moment(this.props.startTime, FORMAT_TIME),
  });

  render() {
    const { style: propStyles = {} } = this.props;
    const { illumination, lightSwitch, time } = this.state;
    return (
      <div
        style={{
          ...containerStyles,
          ...propStyles,
          backgroundColor: `rgba(155, 216, 255, ${illumination.toFixed(2)})`,
        }}
      >
        <Button
          icon={lightSwitch ? <BulbFilled /> : <BulbOutlined />}
          onClick={this.onSwitchFlip}
          size="large"
          style={lightSwitchStyles}
          type="primary"
        />
        {illumination < 1 ? null : (
          <div style={timeStyles}>{time.format(FORMAT_TIME)}</div>
        )}
      </div>
    );
  }
}

const containerStyles = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
};

const lightSwitchStyles = {
  background: "#333333",
  borderColor: "#333333",
  borderTopRightRadius: 0,
  position: "absolute",
  bottom: 0,
  left: 0,
};

const timeStyles = {
  color: "black",
  flex: 1,
  fontSize: "9em",
};

export default Clock;
