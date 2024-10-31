import { RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GarageObject {
  vehUUID: string;
  name: string;
  car: {
    year: string;
    make: string;
    model: string;
    variant: string;
  };
  rego: string;
  nickName: string;
  modifications: {
    body: string[];
    braking: string[];
    drivetrain: string[];
    electricals: string[];
    engine: string[];
    interior: string[];
    suspension: string[];
    wheels: string[];
  };
  imageUri: string;
}
export const initialGarageObject: GarageObject = {
  vehUUID: "",
  name: "",
  car: {
    year: "",
    make: "",
    model: "",
    variant: "",
  },
  rego: "",
  nickName: "",
  modifications: {
    body: [],
    braking: [],
    drivetrain: [],
    electricals: [],
    engine: [],
    interior: [],
    suspension: [],
    wheels: [],
  },
  imageUri: "",
};
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
      if (!state[vehUUID]) {
        state[vehUUID] = action.payload;
      }
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      const vehUUID = action.payload;
      if (state[vehUUID]) {
        delete state[vehUUID];
      }
    },
    editVehicle: (state, action: PayloadAction<GarageObject>) => {
      const { vehUUID } = action.payload;
      if (state[vehUUID]) {
        state[vehUUID] = action.payload;
      }
    },
    clearGarage: () => initialState,
  },
});

export const { addToGarage, clearGarage, editVehicle, removeVehicle } =
  garageSlice.actions;

export default garageSlice.reducer;
