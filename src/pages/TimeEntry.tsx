import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import JobCalendar from "./JobCalendar";
import { authContext } from "../contexts/AuthContext";
import client from "../utils/axios";
import { ProgressSpinner } from "primereact/progressspinner";

const NOT_CHOOSEN_JOB = "-";

type Job = {
  jobID: string;
  ref: string;
  title: string;
  superviser: string;
  hours: {
    thisMonth: number;
    lastMonth: number;
    total: number;
  };
};

const TimeEntry = () => {
  const [activeJobID, setActiveJobID] = useState<string>(NOT_CHOOSEN_JOB);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { auth } = React.useContext(authContext);

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const res = await client.get("api/v1/user/jobs", {
          params: { user_id: auth.id },
          headers: {
            "x-cookie-token": auth.cookie,
          },
        });
        console.log(res);
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toast = useRef(null);

  if (loading) {
    return <ProgressSpinner />;
  }

  return (
    <>
    <Toast ref={toast} />
    <div className="card flex flex-column justify-content-center align-items-center">
      <div className="pt-2 pb-4">
        {jobs.map((job: Job) => (
          <Button
            key={job.jobID}
            onClick={() => setActiveJobID(job.jobID)}
            className={activeJobID !== job.jobID ? "p-button-text mr-2" : ""}
            label={job.ref + " " + job.title}
          />
        ))}
      </div>
      {activeJobID !== NOT_CHOOSEN_JOB ? (
        <JobCalendar jobID={activeJobID} toast={toast}/>
      ) : (
        <p>Choose a job</p>
      )}
    </div>
    </>
  );
};

export default TimeEntry;
