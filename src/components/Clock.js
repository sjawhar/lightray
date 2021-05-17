import React, { Component } from "react";
import { Button } from "antd";
import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import moment from "moment";

import { FORMAT_TIME } from "../constants";

class Clock extends Component {
  state = {
    backlight: 0,
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

  getDebugText = () => {
    const { endTime, startTime } = this.state;
    if (!this.props.debug) {
      return null;
    }
    const startTimeDay = startTime.format("DD MMM");
    const endTimeDay = endTime.format("DD MMM");
    if (startTimeDay === endTimeDay) {
      return startTimeDay;
    }
    return `${startTimeDay} - ${endTimeDay}`;
  };

  interpolate = (start, end, progress) => {
    return Math.round(start + progress * (end - start));
  };

  getBacklight = () => {
    const { endTime, lightSwitch, startTime, time } = this.state;

    const progress = Math.max(
      0,
      Math.min(1, (time - startTime) / (endTime - startTime))
    );

    const backlight = lightSwitch * progress;

    if (backlight === 0) {
      return {
        backlight,
        backgroundColor: "black",
      };
    }

    const red = this.interpolate(25, 225, backlight);
    const green = this.interpolate(50, 255, backlight);
    const blue = this.interpolate(100, 255, backlight);

    return {
      backlight,
      backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    };
  };

  render() {
    const { style: propStyles = {} } = this.props;
    const { lightSwitch, time } = this.state;

    const { backlight, backgroundColor } = this.getBacklight();

    return (
      <div
        style={{
          ...containerStyles,
          ...propStyles,
          backgroundColor,
        }}
      >
        <Button
          icon={lightSwitch ? <BulbFilled /> : <BulbOutlined />}
          onClick={this.onSwitchFlip}
          size="large"
          style={buttonStyles}
          type="primary"
        />
        {backlight < 1 ? null : (
          <div style={displayStyles}>
            <div>{this.getDebugText()}</div>
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
  position: "relative",
  textAlign: "center",
};

const buttonStyles = {
  background: "rgb(31, 31, 31)",
  borderColor: "rgb(31, 31, 31)",
  borderRadius: 0,
  bottom: 0,
  left: 0,
  position: "absolute",
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
