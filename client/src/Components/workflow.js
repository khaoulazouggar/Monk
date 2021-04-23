import React, { useState } from "react";
import "antd/dist/antd.css";
import { Steps } from "antd";
import "../css/workflow.css"

export default function Workflow() {
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;

  const handelChange = (current) => {
    console.log("onChange:", current);
    setCurrent({ current });
  };

  return (
    <div className="workflow">
      <div className="workflow-content">
       <div className="content"></div>
       <div className="steps">
          <Steps
            current={current}
            onChange={() => {
              handelChange();
            }}
            direction="vertical"
          >
            <Step title="Step 1" description="This is a description." />
            <Step title="Step 2" description="This is a description." />
            <Step title="Step 3" description="This is a description." />
          </Steps>
        </div>
      </div>
    </div>
  );
}
