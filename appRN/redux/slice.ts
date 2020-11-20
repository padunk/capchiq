import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {IdolVideoPost, VideoData} from '../Types/types';
import {dataAPI} from './dataAPI';
import {RootState} from './store';

export const getVideosByIdol = createAsyncThunk(
  'data/getVideosByIdol',
  async (userID: string, {rejectWithValue}) => {
    try {
      const response = await dataAPI.getAllIdolVideos(userID);
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
  reducers: {
    fetchVideoDetail: (state, action) => {
      state.video = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideosByIdol.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = {};
    }),
      builder.addCase(getVideosByIdol.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.videos = action.payload;
        }
        state.loading = 'idle';
      }),
      builder.addCase(getVideosByIdol.rejected, (state, action) => {
        state.loading = 'idle';
        state.videos = [];
        state.errorMessage = action.error;
      });
  },
});

export const selectVideoData = (state: RootState) => state.videoData;

export default videoSlice.reducer;
