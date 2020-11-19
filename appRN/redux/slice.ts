import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {IdolVideoPost, VideoData} from '../Types/types';
import {getAllIdolVideos} from './asyncFunctions';
import {RootState} from './store';

export const getAllVideos = createAsyncThunk(
  'videos/getAll',
  async (userID: string, {rejectWithValue}) => {
    try {
      const response = await getAllIdolVideos(userID);
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  },
);

type VideoState = {
  videos: IdolVideoPost[];
  video: VideoData;
  loading: 'pending' | 'idle';
  errorMessage: SerializedError;
};

const videoInitialState: VideoState = {} as VideoState;

export const videoSlice = createSlice({
  name: 'videos',
  initialState: videoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = {};
    }),
      builder.addCase(getAllVideos.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.videos = action.payload;
        }
        state.loading = 'idle';
      }),
      builder.addCase(getAllVideos.rejected, (state, action) => {
        state.loading = 'idle';
        state.videos = [];
        state.errorMessage = action.error;
      });
  },
});

export const selectVideoData = (state: RootState) => state.videoData;

export default videoSlice.reducer;
