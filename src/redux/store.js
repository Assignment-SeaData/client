import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { alertReducer } from "./slices/alertSlice";

export const store = configureStore({
    reducer: {
        alertState: alertReducer
    }
});

export function useSelectorAlert() {
    return useSelector(state => state.alertState);
}