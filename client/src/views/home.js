import React from "react";
import workflow from "../photos/workflow.gif";
import { Link } from "react-router-dom";
import arrow from "../photos/arrow.png";
import "../css/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home_content">
        <div>
        <img className="photo" alt="" src={workflow} />
        </div>
        <div className="line"></div>
        <div className="button">
          <Link to="workflow" className="btn btn-xl">
            Create a workflow
            <img alt="" className="btn-icon" src={arrow} />
          </Link>
        </div>
      </div>
    </div>
  );
}
