import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
type Props = { jobID: number };

const JobCalendar = (props: Props) => {
  const [date, setDate] = useState<Date | Date[] | undefined>(undefined);

  const dateTemplate = (date: any) => {
    if (date.day > 10 && date.day < 15) {
      return <span style={{ color: "var(--primary-color)" }}  >{date.day}</span>;
    } else {
      return <span>{date.day}</span>;
    }
  };

  return (
    <>
      <div>JobCalendar for jobID={props.jobID}</div>
      <Calendar
        className="mt-3"
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        disabledDays={[5, 6]}
        dateTemplate={dateTemplate}
      />
    </>
  );
};

export default JobCalendar;
