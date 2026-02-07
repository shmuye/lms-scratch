import { useSelector, useDispatch, type TypedUseSelectorHook } from "react-redux";
import { type RootState, type AppDispatch } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()