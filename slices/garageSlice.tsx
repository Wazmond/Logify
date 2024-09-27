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

interface GarageStore {
  [vehUUID: string]: GarageObject;
}

const initialState: GarageStore = {};

export const garageSlice = createSlice({
  name: "garageSlice",
  initialState,
  reducers: {
    addToGarage: (state, action: PayloadAction<GarageObject>) => {
      const vehUUID = action.payload.vehUUID;
      state[vehUUID] = action.payload;
    },
    clearGarage: (state) => {
      return {};
    },
  },
});

export const { addToGarage, clearGarage } = garageSlice.actions;

export const garageSelector = (state: RootState) => state.myGarage.garage;

export default garageSlice.reducer;
