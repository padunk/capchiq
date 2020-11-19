import {configureStore} from '@reduxjs/toolkit';
import videoSlice from './slice';

export const _store = configureStore({
  reducer: {
    videoData: videoSlice,
  },
});

export type RootState = ReturnType<typeof _store.getState>;
