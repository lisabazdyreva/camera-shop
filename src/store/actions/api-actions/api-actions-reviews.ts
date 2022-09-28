import {ThunkActionResult} from '../../../types/action';
import axios, {AxiosResponse} from 'axios';
import {Review} from '../../../types/types';
import {setFetchReviewsStatus, setReviews} from '../actions';
import {LoadingStatus, UrlRoute} from '../../../utils/const';


const fetchReviews = (id: number): ThunkActionResult => async (dispatch, _setState): Promise<void> => {
  dispatch(setFetchReviewsStatus(LoadingStatus.Loading));
  await axios.get(`${UrlRoute.Base}${UrlRoute.Cameras}/${id}${UrlRoute.Reviews}`)
    .then((response: AxiosResponse) => {
      const reviews: Review[] = response.data;
      dispatch(setReviews(reviews));
      dispatch(setFetchReviewsStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchReviewsStatus(LoadingStatus.Error)));
};

export {fetchReviews};
