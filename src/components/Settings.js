import React from "react";
import { Button, TimePicker } from "antd";
import { BugFilled, ReloadOutlined } from "@ant-design/icons";

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

function Settings({ debug, endTime, onChange, onDebug, startTime }) {
  return (
    <div style={containerStyles}>
      <TimePicker
        {...timePickerProps}
        onChange={(newStartTime) => onChange({ startTime: newStartTime })}
        value={startTime}
      />
      <TimePicker
        {...timePickerProps}
        onChange={(newEndTime) => onChange({ endTime: newEndTime })}
        value={endTime}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Button
          icon={<BugFilled />}
          onClick={onDebug}
          size="large"
          type={debug ? "primary" : "default"}
        >
          Debug
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => window.close()}
          size="large"
        >
          Restart
        </Button>
      </div>
    </div>
  );
}

export default Settings;
