import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import client from "../utils/axios";
import { authContext } from "../contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";
import EntryCard from "./EntryCard";
import { JobTimeEntry, JobHash} from "../types"

type Props = { jobID: string };


const JobCalendar = (props: Props) => {
  const [date, setDate] = useState<Date | Date[] | undefined>(undefined);
  const [choosenDate, setChoosenDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [workEntries, setWorkEntries] = useState<JobHash>({});
  const { auth } = React.useContext(authContext);

  const preProcessEntries = (entries: JobTimeEntry[]): JobHash => {
    const res: JobHash = {};
    entries.forEach((entry) => {
      res[entry.worked] = entry;
    });
    return res;
  };

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const res = await client.get("api/v1/user/hours", {
          params: { user_id: auth.id, job_id: props.jobID },
          headers: {
            "x-cookie-token": auth.cookie,
          },
        });
        console.log(res);
        console.log(res.data);
        setWorkEntries(preProcessEntries(res.data.entries));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.jobID]);

  

  const dateToString = (date: any) => {
    return date.month + 1 + "/" + date.day + "/" + date.year;
  };

  const dateTemplate = (date: any) => {
    if (dateToString(date) in workEntries) {
      return (
        <span style={{ color: "var(--pink-700)", fontWeight: "bold" }}>
          {date.day}
        </span>
      );
    } else {
      return <span>{date.day}</span>;
    }
  };

  const handleClick = (x: Date | Date[] | undefined) => {
    if (x && !Array.isArray(x)) {
      const date = x;
      const str =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      console.log(str);
      setDate(x);
      setChoosenDate(x);
    }
  };

  if (loading) {
    return <ProgressSpinner />;
  }

  return (
    <>
      <div>JobCalendar for jobID={props.jobID}</div>
      <div className="grid mt-3">
        <div className="col-12 md:col-6">
          <Calendar
            value={date}
            onChange={(e) => handleClick(e.value)}
            inline
            disabledDays={[5]}
            dateTemplate={dateTemplate}
          />
        </div>
        {choosenDate && (
          <div className="col-12 md:col-6">
            <EntryCard date={choosenDate} entries={workEntries} />
          </div>
        )}
      </div>
    </>
  );
};

export default JobCalendar;
