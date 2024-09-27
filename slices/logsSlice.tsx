import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LogsObject {
  logUUID: number;
  vehUUID: string;
  date: string;
  time: string;
  label: string;
  data: {
    title: string;
    desc: string;
  };
  additionals: {
    odo: string;
    location: string;
    price: string;
    notes: string;
  };
}

export interface LogsState {
  [vehUUID: string]: {
    [logUUID: string]: LogsObject;
  };
}

const initialState: LogsState = {};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog: (
      state,
      action: PayloadAction<{ vehUUID: string; log: LogsObject }>
    ) => {
      const { vehUUID, log } = action.payload;
      if (!state[vehUUID]) {
        state[vehUUID] = {};
      }
      state[vehUUID][log.logUUID] = log;
    },
    editLog: (
      state,
      action: PayloadAction<{ vehUUID: string; log: LogsObject }>
    ) => {
      const { vehUUID, log } = action.payload;
      if (state[vehUUID]) {
        state[vehUUID][log.logUUID] = log;
      }
    },
    clearLog: (state) => {
      return {};
    },
  },
});

export const { addLog, clearLog } = logsSlice.actions;

export default logsSlice.reducer;
