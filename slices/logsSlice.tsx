import { createSlice } from "@reduxjs/toolkit";

export interface LogsObject {
  logUUID: string;
  vehUUID: string;
  date: string;
  time: string;
  event: string;
  data: {
    title: string;
    desc: string;
  };
  additionals: {
    location: string;
    price: string;
    notes: string;
  };
}

interface LogsState {
  logs: LogsObject[];
}

const initialState: LogsState = {
  logs: [],
};

export const logsSlice = createSlice({
  name: "logsSlice",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
    removeLog: (state, action) => {
      state.logs = state.logs.filter((log) => log.logUUID !== action.payload);
    },
  },
});

export const { addLog, removeLog } = logsSlice.actions;

export default logsSlice.reducer;