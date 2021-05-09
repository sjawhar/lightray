import React, { Component } from "react";
import { Button } from "antd";
import {
  BugFilled,
  BugOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { FORMAT_TIME } from "../constants";

class Clock extends Component {
  state = {
    debug: false,
    illumination: 0,
    lightSwitch: true,
    time: moment(),
  };

  componentDidMount() {
    this.setAlarm();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(prevProps) {
    this.setAlarm(prevProps);
  }

  tick = async () => {
    const { lightSwitch, time: lastTime } = this.state;
    const time = moment();
    if (time.date() > lastTime.date()) {
      await this.setAlarm();
    }
    const { startTime } = this.state;
    const newState = { time };
    if (
      !lightSwitch &&
      time.isSameOrAfter(startTime) &&
      lastTime.isSameOrBefore(startTime)
    ) {
      newState.lightSwitch = true;
    }
    this.setState(newState);
  };

  setAlarm = (prevProps) => {
    const { endTime, startTime } = this.props;
    if (
      prevProps &&
      endTime === prevProps.endTime &&
      startTime === prevProps.startTime
    ) {
      return Promise.resolve();
    }

    return new Promise((resolve) =>
      this.setState(
        {
          endTime: moment(endTime, FORMAT_TIME),
          startTime: moment(startTime, FORMAT_TIME),
        },
        resolve
      )
    );
  };

  onSwitchFlip = () => {
    this.setState({ lightSwitch: !this.state.lightSwitch });
  };

  render() {
    const { style: propStyles = {} } = this.props;
    const { debug, endTime, lightSwitch, startTime, time } = this.state;

    const illumination =
      lightSwitch *
      Math.max(0, Math.min(1, (time - startTime) / (endTime - startTime)));

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
          style={{
            ...buttonStyles,
            left: 0,
          }}
          type="primary"
        />
        <Button
          icon={debug ? <BugFilled /> : <BugOutlined />}
          onClick={() => this.setState({ debug: !debug })}
          size="large"
          style={{
            ...buttonStyles,
            right: 0,
          }}
          type="primary"
        />
        {illumination < 1 ? null : (
          <div style={displayStyles}>
            {debug && startTime && endTime ? (
              <div>
                {startTime.format("MMM DD HH:mm")} -{" "}
                {endTime.format("MMM DD HH:mm")}
              </div>
            ) : null}
            <div style={timeStyles}>{time.format(FORMAT_TIME)}</div>
            <div style={dateStyles}>{time.format("ddd, DD MMM, YYYY")}</div>
          </div>
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

const buttonStyles = {
  background: "#333333",
  borderColor: "#333333",
  borderRadius: 0,
  position: "absolute",
  bottom: 0,
};

const displayStyles = {
  flex: 1,
  color: "black",
};

const timeStyles = {
  fontSize: "8em",
};

const dateStyles = {
  fontSize: "2em",
  fontWeight: "bold",
};

export default Clock;
