import React, { useState } from "react";
import { Button } from "primereact/button";
import JobCalendar from "./JobCalendar";
// import './TabViewDemo.css';

type Props = {};

const TimeEntry = (props: Props) => {
  const [activeJobID, setActiveJobID] = useState(-1);
  return (
    <div className="card flex flex-column justify-content-center align-items-center">
      <h2>Job list</h2>
      <div className="pt-2 pb-4">
        <Button
        
          onClick={() => setActiveJobID(0)}
          className="p-button-text mr-2"
          label="Activate 1st"
        />
        <Button
          onClick={() => setActiveJobID(1)}
          className="p-button-text mr-2"
          label="Activate 2nd"
        />
        <Button
          onClick={() => setActiveJobID(2)}
          className="p-button-text "
          label="Activate 3rd"
        />
      </div>
      {activeJobID !== -1 ? <JobCalendar jobID={activeJobID}  /> :  <p>Choose a job</p>}
    </div>
  );
};

export default TimeEntry;
