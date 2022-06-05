export type UserAuth = {
    id: number;
    username: string;
    cookie : string
  };

 export type JobTimeEntry = {
    tid: string;
    jid: string;
    uid: string;
    hours: string;
    worked: string;
    entered: string;
    notes: string;
  };
  
  export interface JobHash {
    [key: string]: JobTimeEntry;
  }