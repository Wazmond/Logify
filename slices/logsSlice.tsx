import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LogsObject {
  logUUID: string;
  vehUUID: string;
  date: string;
  time: string;
  label: string;
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
  [vehUUID: string]: {
    [logUUID: string]: LogsObject
  };
}

const initialState: LogsState = {};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    // addLog: (state, action) => {
    //   state.logs.push(action.payload);
    // },
    // removeLog: (state, action) => {
    //   state.logs = state.logs.filter((log) => log.logUUID !== action.payload);
    // },
    addLog: (state, action: PayloadAction<{ vehUUID: string; log: LogsObject }>) => {
      const { vehUUID, log } = action.payload;
      if (!state[vehUUID]) {
        state[vehUUID] = {}; // Initialize if not present
      }
      state[vehUUID][log.logUUID] = log; // Add the log under the vehUUID
    },
  },
});

export const { addLog } = logsSlice.actions;

export default logsSlice.reducer;