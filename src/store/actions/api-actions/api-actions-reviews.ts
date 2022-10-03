import {ThunkActionResult} from '../../../types/action';
import axios, {AxiosResponse} from 'axios';
import {Review, ReviewPost} from '../../../types/types';
import {setFetchReviewsStatus, setPostReviewStatus, setReviews} from '../actions';
import {LoadingStatus, UrlRoute} from '../../../utils/const';
import { sortReviews} from '../../../utils/utils';


const fetchReviews = (id: number): ThunkActionResult => async (dispatch, _setState): Promise<void> => {
  dispatch(setFetchReviewsStatus(LoadingStatus.Loading));
  await axios.get(`${UrlRoute.Base}${UrlRoute.Cameras}/${id}${UrlRoute.Reviews}`)
    .then((response: AxiosResponse) => {
      const reviews: Review[] = response.data;
      const sortedReviews = sortReviews(reviews);

      dispatch(setReviews(sortedReviews ));
      dispatch(setFetchReviewsStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchReviewsStatus(LoadingStatus.Error)));
};

const postReview = (data: ReviewPost): ThunkActionResult => async (dispatch, _setState): Promise<void> => {
  dispatch(setPostReviewStatus(LoadingStatus.Loading));
  await axios.post(`${UrlRoute.Base}${UrlRoute.Reviews}`, data)
    .then((response) => {
      if (response.statusText === 'Created') {
        dispatch(setPostReviewStatus(LoadingStatus.Success));
      }
    })
    .catch(() => dispatch(setPostReviewStatus(LoadingStatus.Error)));
};

export {fetchReviews, postReview};
