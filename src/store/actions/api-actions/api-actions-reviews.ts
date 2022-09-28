import {ThunkActionResult} from '../../../types/action';
import axios, {AxiosResponse} from 'axios';
import {Review} from '../../../types/types';
import {setFetchReviewsStatus, setReviews} from '../actions';
import {LoadingStatus} from '../../../types/const';

const BASE_URL = 'https://camera-shop.accelerator.pages.academy';

const fetchReviews = (id: number): ThunkActionResult => async (dispatch, _setState): Promise<void> => {
  dispatch(setFetchReviewsStatus(LoadingStatus.Loading));
  await axios.get(`${BASE_URL}/cameras/${id}/reviews`)
    .then((response: AxiosResponse) => {
      const reviews: Review[] = response.data;
      dispatch(setReviews(reviews));
      dispatch(setFetchReviewsStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchReviewsStatus(LoadingStatus.Error)));
};

export {fetchReviews};
