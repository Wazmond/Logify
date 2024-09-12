import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GarageObject {
  vehUUID: string;
  car: {
    year: number;
    make: string;
    model: string;
  };
  rego: string;
  nickName: string;
}

type GarageStore = {
  garage: GarageObject[];
};

const initialState: GarageStore = {
  garage: [],
};

export const garageSlice = createSlice({
  name: "garageSlice",
  initialState,
  reducers: {
    addToGarage: (state, action: PayloadAction<GarageObject>) => {
      state.garage.push(action.payload);
    },
    clearGarage: (state) => {
      state.garage = [];
    },
  },
});

export const { addToGarage } = garageSlice.actions;

export default garageSlice.reducer;