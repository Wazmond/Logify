import { editForm } from "@/slices/formSlice";
import { GarageObject } from "@/slices/garageSlice";
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
