import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {
  IdolVideoPost,
  PutVideoLikeByFilenameProps,
  VideoData,
} from '../Types/types';
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

export const getVideoLikeCountByFilename = createAsyncThunk(
  'data/getVideoLike',
  async (video: VideoData, {rejectWithValue}) => {
    try {
      const response = await dataAPI.getLikeCount(video);
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  },
);

export const putVideoLikeByFilename = createAsyncThunk(
  'data/putVideoLike',
  async ({video, likeByID}: PutVideoLikeByFilenameProps, {rejectWithValue}) => {
    try {
      const response = await dataAPI.updateVideoLike(video, likeByID);
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
        state.errorMessage = action.error;
      }),
      builder.addCase(getVideoLikeCountByFilename.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = {};
      }),
      builder.addCase(
        getVideoLikeCountByFilename.fulfilled,
        (state, action) => {
          if (action.payload !== undefined) {
            const {videoID} = action.payload;
            const videoIndex = state.videos.findIndex(
              (post) => post.video.videoID === videoID,
            );
            state.videos[videoIndex].video = action.payload;
            state.video = action.payload;
          }
          state.loading = 'idle';
        },
      ),
      builder.addCase(getVideoLikeCountByFilename.rejected, (state, action) => {
        state.loading = 'idle';
        state.errorMessage = action.error;
      }),
      builder.addCase(putVideoLikeByFilename.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = {};
      }),
      builder.addCase(putVideoLikeByFilename.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          const {videoID} = action.payload;
          const videoIndex = state.videos.findIndex(
            (post) => post.video.videoID === videoID,
          );
          state.videos[videoIndex].video = action.payload;
          state.video = action.payload;
        }
        state.loading = 'idle';
      }),
      builder.addCase(putVideoLikeByFilename.rejected, (state, action) => {
        state.loading = 'idle';
        state.errorMessage = action.error;
      });
  },
});

export const selectVideoData = (state: RootState) => state.videoData;

export default videoSlice.reducer;
