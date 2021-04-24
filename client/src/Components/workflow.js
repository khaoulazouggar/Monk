import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Steps } from "antd";
import "../css/workflow.css";
import "../css/upload.css";
import { Upload } from "react-feather";
import jimp from "jimp";
import axios from "axios";

export default function Workflow() {
  const [current, setCurrent] = useState(0);
  const [picture, setPicture] = useState([]);
  const [Img, setImg] = useState([]);
  const { Step } = Steps;

  useEffect(() => {
    axios.get("http://localhost:3001/GetImages").then((res) => {
      setImg(res.data);
      // console.log(res);
    });
  }, []);

  const handelChange = (current) => {
    // console.log("onChange:", current);
    setCurrent(current);
  };
  
  const handlechangestate = (e) => {
    const id = Img[e].id;
    const status = Img[e].status;
    window.location.href = "/workflow";
    // console.log(Img[e].id)
    axios
      .post("http://localhost:3001/ChangeStatus", {
        id,
        status,
      })
      .then((res) => {
        // console.log(res);
      });
  };

  const handlepreviousState = (e) => {
    const id = Img[e].id;
    const status = Img[e].status;
    window.location.href = "/workflow";
    axios
      .post("http://localhost:3001/PreviousStatus", {
        id,
        status,
      })
      .then((res) => {
        // console.log(res);
      });
  };

  const handleFile = function () {
    const content = this.result;

    const base64Data = content
      ? content.replace(/^data:image\/\w+;base64,/, "")
      : "";
    const buffer = Buffer.from(base64Data, "base64");
    jimp.read(buffer, (err, rslt) => {
      if (err) {
        console.log(err);
      } else {
        setPicture([...picture, content]);
        axios
          .post("http://localhost:3001/createImage", {
            content,
          })
          .then((res) => {
            // console.log(res);
            window.location.href = "/workflow";
          });
      }
    });
  };

  const onDrop = (e, file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(file[0]);
    e.target.value = "";
  };

  return (
    <div className="workflow">
      <div className="workflow-content">
        <Steps current={current} onChange={handelChange}>
          <Step
            title={<input className="step-inpt" placeholder="Status 1" />}
          />
          <Step title="Status 2" />
          <Step title="Validated" />
          <Step title="Finished" />
        </Steps>

        {current === 0 ? (
          <div className="content">
            <div className="upload">
              <div className="file-upload">
                <div className="image-upload-wrap">
                  <input
                    className="file-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onDrop(e, e.target.files)}
                  />
                  <div className="drag-text">
                    <Upload style={{ paddingTop: "50px" }} size={40} />
                    <h3> Drag And Drop</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="upload-image">
              {picture?.map((p, i) => (
                <div className="test" key={i}>
                  <img className="file-upload-image" src={p} alt={p} />
                  <button
                    className="state"
                    onClick={() => handlechangestate(i)}
                  >
                    Next state
                  </button>
                </div>
              ))}
              {Img?.map((p, i) =>
                p.status === 1 ? (
                  <div className="test" key={i}>
                    <img
                      className="file-upload-image"
                      src={"http://localhost:3001/images/" + p.image}
                      alt={p}
                    />
                    <button
                      className="state"
                      onClick={() => handlechangestate(i)}
                    >
                      Next state
                    </button>
                  </div>
                ) : (
                  <div key={i}> </div>
                )
              )}
            </div>
          </div>
        ) : current === 1 ? (
          <div className="upload-image">
            {Img.map((p, i) =>
              p.status === 2 ? (
                <div className="test" key={i}>
                  <img
                    className="file-upload-image"
                    src={"http://localhost:3001/images/" + p.image}
                    alt={p}
                  />
                  <button
                    className="previous"
                    onClick={() => handlepreviousState(i)}
                  >
                    Previous state
                  </button>
                  <button
                    className="state"
                    onClick={() => handlechangestate(i)}
                  >
                    Next state
                  </button>
                </div>
              ) : (
                <div key={i}> </div>
              )
            )}
          </div>
        ) : current === 2 ? (
          <div className="upload-image">
            {Img.map((p, i) =>
              p.status === 3 ? (
                <div className="test" key={i}>
                  <img
                    className="file-upload-image"
                    src={"http://localhost:3001/images/" + p.image}
                    alt={p}
                  />
                  <button
                    className="previous"
                    onClick={() => handlepreviousState(i)}
                  >
                    Previous state
                  </button>
                  <button
                    className="state"
                    onClick={() => handlechangestate(i)}
                  >
                    Next state
                  </button>
                </div>
              ) : (
                <div key={i}> </div>
              )
            )}
          </div>
        ) : current === 3 ? (
          <div className="upload-image">
            {Img.map((p, i) =>
              p.status === 4 ? (
                <div className="test" key={i}>
                  <img
                    className="file-upload-image"
                    src={"http://localhost:3001/images/" + p.image}
                    alt={p}
                  />
                  <button
                    className="previous"
                    onClick={() => handlepreviousState(i)}
                  >
                    Previous state
                  </button>
                </div>
              ) : (
                <div key={i}> </div>
              )
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
