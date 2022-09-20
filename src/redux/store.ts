import { combineReducers, configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(rootPersistConfig,combineReducers({score:scoreReducer}))

export const store = configureStore({
  reducer:persistedReducer,
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
