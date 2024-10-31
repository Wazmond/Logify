import { editForm } from "@/slices/formSlice";
import {
  addToGarage,
  clearGarage,
  editVehicle,
  GarageObject,
  removeVehicle,
} from "@/slices/garageSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useForm = () => {
  const dispatch = useDispatch();

  const form = useSelector((state: RootState) => state.form);
  const setForm = (e: GarageObject) => dispatch(editForm(e));

  return {
    form,
    setForm,
  };
};

export const useGarage = () => {
  const dispatch = useDispatch();

  const garage = useSelector((state: RootState) => state.myGarage);
  const addVeh = (veh: GarageObject) => dispatch(addToGarage(veh));
  const rmVeh = (veh: string) => dispatch(removeVehicle(veh));
  const editVeh = (veh: GarageObject) => dispatch(editVehicle(veh));
  const clrVeh = () => dispatch(clearGarage());

  return {
    garage,
    addVeh,
    rmVeh,
    editVeh,
    clrVeh,
  };
};

// export const useLogs = () => {
//   const dispatch = useDispatch();

//   const logs = useSelector((state: RootState) => state.logs)
// }