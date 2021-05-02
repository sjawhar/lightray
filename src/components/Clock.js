import React, { Component } from "react";
import moment from "moment";

const containerStyles = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
};

const timeStyles = {
  color: "black",
  flex: 1,
  fontSize: "9em",
};

class Clock extends Component {
  state = {
    progress: 0,
    time: moment(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: moment(),
    });
  }

  render() {
    const { endTime, startTime, style: propStyles } = this.props;
    const { time } = this.state;
    // TODO: Check time next day
    const progress = Math.min(1, (time - startTime) / (endTime - startTime));

    return (
      <div
        style={{
          ...containerStyles,
          ...propStyles,
          backgroundColor: `rgba(155, 216, 255, ${progress.toFixed(2)})`,
        }}
      >
        {progress < 1 ? null : (
          <div style={timeStyles}>{time.format("HH:mm")}</div>
        )}
      </div>
    );
  }
}

export default Clock;
