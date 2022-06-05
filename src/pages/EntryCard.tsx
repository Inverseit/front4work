import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { JobHash } from "../types";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear' 
dayjs.extend(weekOfYear);

type Props = {
  date: Date;
  entries: JobHash;
};

const EntryCard = (props: Props) => {

  const date:dayjs.Dayjs = dayjs(props.date);

  const footer = (
    <span>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-secondary ml-2"
      />
    </span>
  );

  const getThisWeek = ():string => {
    const startOfWeek = date.startOf('w').format('MMM D, YYYY');
    const endOfWeek = date.endOf('w').format('MMM D, YYYY');
    return `${startOfWeek} - ${endOfWeek}`;
  }

  return (
    <Card
      title={date.format('MMMM D, YYYY')}
      subTitle={getThisWeek()}
      style={{ width: "25em" }}
      footer={footer}
    >
      <p className="m-0" style={{ lineHeight: "1.5" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    </Card>
  );
};

export default EntryCard;
