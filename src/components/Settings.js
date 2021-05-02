import React from "react";
import { TimePicker } from "antd";

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
  format: "HH:mm",
  minuteStep: 5,
};

function Settings({ endTime, onChange, startTime }) {
  return (
    <div style={containerStyles}>
      <TimePicker
        {...timePickerProps}
        onChange={(startTime) => onChange({ startTime })}
        value={startTime}
      />
      <TimePicker
        {...timePickerProps}
        onChange={(endTime) => onChange({ endTime })}
        value={endTime}
      />
    </div>
  );
}

export default Settings;
