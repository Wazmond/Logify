import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GarageObject, initialGarageObject } from "./garageSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const initialState: GarageObject = initialGarageObject

export const formSlice = createSlice({
    name: "formSlice",
    initialState,
    reducers: {
        editForm: (state, action: PayloadAction<GarageObject>) => {
            return action.payload
        },
        clearForm: (state) => {
            return initialState
        }
    }
})

export const { editForm, clearForm } = formSlice.actions
export default formSlice.reducer