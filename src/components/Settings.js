import React from "react";
import { TimePicker } from "antd";
import moment from "moment";

import { FORMAT_TIME } from "../constants";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",
};

const timePickerProps = {
  allowClear: false,
  allowEmpty: false,
  format: FORMAT_TIME,
  minuteStep: 5,
};

function Settings({ endTime, onChange, startTime }) {
  return (
    <div style={containerStyles}>
      <TimePicker
        {...timePickerProps}
        onChange={(newStartTime) => onChange({ startTime: newStartTime })}
        value={moment(startTime, FORMAT_TIME)}
      />
      <TimePicker
        {...timePickerProps}
        onChange={(newEndTime) => onChange({ endTime: newEndTime })}
        value={moment(endTime, FORMAT_TIME)}
      />
    </div>
  );
}

export default Settings;
