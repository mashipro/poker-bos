import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import reducers from "./reducers";
import storage from "redux-persist/lib/storage";

const rootReducer = reducers;

export type RootStateType = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage: storage,
  // blacklist: ['banking', 'payees', 'transaction'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
});

const persistor = persistStore(store);
const exportObj = { store, persistor };

export default exportObj;
