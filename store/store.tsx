import garageSlice from "@/slices/garageSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Local storage for web
import AsyncStorage from '@react-native-async-storage/async-storage'
import logsSlice from "@/slices/logsSlice";
import formSlice from "@/slices/formSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['form']
};

const reducers = combineReducers({
  myGarage: garageSlice,
  logs: logsSlice,
  form: formSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>