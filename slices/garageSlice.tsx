import { RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GarageObject {
  vehUUID: string;
  name: string;
  car: {
    year: number;
    make: string;
    model: string;
  };
  rego: string;
  nickName: string;
}

export interface GarageState {
  [vehUUID: string]: GarageObject;
}

const initialState: GarageState = {};

export const garageSlice = createSlice({
  name: "garageSlice",
  initialState,
  reducers: {
    addToGarage: (state, action: PayloadAction<GarageObject>) => {
      const { vehUUID } = action.payload;
      if (state[vehUUID]) {
        state[vehUUID] = action.payload;
      }
    },
    removeVehicle: (state, action: PayloadAction<{ vehUUID: string }>) => {
      const { vehUUID } = action.payload
      if (state[vehUUID]) { 
        delete state[vehUUID]
      }
    },
    editVehicle: (state, action: PayloadAction<GarageObject> ) => {
      const { vehUUID } = action.payload
      if (state[vehUUID]) {
        state[vehUUID] = action.payload
      }
    },
    clearGarage: () => {
      return {};
    },
  },
});

export const { addToGarage, clearGarage } = garageSlice.actions;

export const garageSelector = (state: RootState) => state.myGarage;

export default garageSlice.reducer;
