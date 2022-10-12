import {createSlice} from '@reduxjs/toolkit';

import {AppReviews} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {fetchReviewsAction, postReviewAction} from '../api-actions/api-actions-reviews/api-actions-reviews';

const initialState: AppReviews = {
  reviews: [],
  reviewsFetchStatus: LoadingStatus.Default,
  reviewPostStatus: LoadingStatus.Default,
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsFetchStatus = LoadingStatus.Error;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewPostStatus = LoadingStatus.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.reviewPostStatus = LoadingStatus.Success;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewPostStatus = LoadingStatus.Error;
      });
  },
});
