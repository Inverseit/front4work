import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { JobTimeEntry } from "../types";
import dayjs from "dayjs";
import { Tag } from "primereact/tag";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

dayjs.extend(weekOfYear);
interface CardJobEntry extends JobTimeEntry {
  dayjsObject: dayjs.Dayjs;
}
export interface CardJobEntryHash {
  [key: string]: CardJobEntry;
}

type Props = {
  date: Date;
  toast: any;
  job_id: string;
  extendedEntries: CardJobEntryHash;
  setExtendedEntries: any;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EntryCard = (props: Props) => {
  const [hours, setHours] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const { isEditing, setIsEditing, extendedEntries, setExtendedEntries } =
    props;
  const date: dayjs.Dayjs = dayjs(props.date);

  const dateToKey = (date: dayjs.Dayjs): string => {
    return date.format("M/D/YYYY");
  };

  const getCountWeek = (): number => {
    let res: number = 0;
    const weekNumber = date.week();
    for (const key in extendedEntries) {
      if (Object.prototype.hasOwnProperty.call(extendedEntries, key)) {
        const entry = extendedEntries[key];
        if (entry.dayjsObject.week() === weekNumber) {
          res += parseInt(entry.hours);
        }
      }
    }
    return res;
  };

  const getSubtitle = (): string => {
    const countHoursThisWeek = getCountWeek();
    const startOfWeek = date.startOf("w").format("MMM D, YYYY");
    const endOfWeek = date.endOf("w").format("MMM D, YYYY");
    if (countHoursThisWeek === 0) {
      return `${startOfWeek} - ${endOfWeek}`;
    }
    return `${startOfWeek} - ${endOfWeek}. ${countHoursThisWeek} hours this week.`;
  };

  const title = (
    <div className="flex align-items-center justify-content-start">
      {" "}
      <Tag severity="success" className="mr-2">
        {date.format("ddd")}
      </Tag>
      {date.format("MMMM D, YYYY")}
    </div>
  );

  const form = () => {
    const key = dateToKey(date);
    if (!isEditing) {
      if (key in extendedEntries) {
        return (
          <>
            <p>
              <span className="font-bold">Hours:</span>{" "}
              {extendedEntries[key].hours}
            </p>
            {extendedEntries[key].notes && (
              <p>
                <span className="font-bold">Notes:</span>{" "}
                {extendedEntries[key].notes}
              </p>
            )}
          </>
        );
      }
      return <p>No hours entered.</p>;
    }
    return (
      <>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-6">
            <label htmlFor="hours">Hours</label>
            <InputNumber
              inputId="hours"
              value={hours}
              min={0}
              onValueChange={(e) => {
                if (e.value != null) {
                  setHours(e.value);
                }
              }}
              showButtons
              buttonLayout="horizontal"
              step={1}
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="notes">Notes</label>
            <InputTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              cols={30}
            />
          </div>
        </div>
      </>
    );
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: handleDelete,
      reject: () => {
        if (props.toast.current) {
          props.toast.current?.show({
            severity: "info",
            summary: "Cancelled",
            detail: "You are not deleting!",
            sticky: true,
          });
        }
      },
    });
  };

  const handleDelete = async () => {
    console.log("deleting");
    // in success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (props.toast.current) {
      props.toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: `Deleted entry on ${date.format("MMMM D, YYYY")}.`,
        life: 2000,
      });
    }
    setIsEditing(false);
    setHours(0);
    setNotes("");

    const key = dateToKey(date);
    const newList = { ...extendedEntries };
    delete newList[key];

    setExtendedEntries(newList);
  };

  const handleSave = async () => {
    console.log("saving");
    // in success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (props.toast.current) {
      props.toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: `Entered ${hours} for ${date.format("MMMM D, YYYY")}.`,
        life: 2000,
      });
    }
    setIsEditing(false);
    setHours(0);
    setNotes("");

    const key = dateToKey(date);
    const newList = {
      ...extendedEntries,
    };

    newList[key] = {
      tid: "230",
      jid: props.job_id,
      uid: "lol",
      hours: hours + "",
      dayjsObject: date.clone(),
      worked: key,
      entered: dateToKey(dayjs()),
      notes: notes,
    };

    setExtendedEntries(newList);
  };

  const handleSaveClick = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: handleSave,
      reject: () => {
        if (props.toast.current) {
          props.toast.current?.show({
            severity: "info",
            summary: "Cancelled",
            detail: "You are not saving",
            life: 1000,
          });
        }
      },
    });
  };

  const footer = () => {
    if (!isEditing) {
      return (
        <span>
          <ConfirmDialog />
          <Button
            label="Edit"
            onClick={() => setIsEditing(true)}
            icon="pi pi-pencil"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            onClick={confirmDelete}
            className="p-button-secondary ml-2"
          />
        </span>
      );
    }
    return (
      <span>
        <Button
          label="Save"
          disabled={hours === 0 || notes === ""}
          onClick={handleSaveClick}
          icon="pi pi-check"
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {
            setIsEditing(false);
            setHours(0);
            setNotes("");
          }}
          className="p-button-secondary ml-2"
        />
      </span>
    );
  };

  return (
    <Card
      title={title}
      subTitle={getSubtitle()}
      style={{ width: "25em" }}
      footer={footer}
    >
      {form()}
    </Card>
  );
};

export default EntryCard;
