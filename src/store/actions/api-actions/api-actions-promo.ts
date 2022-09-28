import {ThunkActionResult} from '../../../types/action';
import {setFetchPromosStatus, setPromos} from '../actions';
import {LoadingStatus} from '../../../utils/const';
import axios from 'axios';
import {Promo} from '../../../types/types';
import {UrlRoute} from '../../../utils/const';


const fetchPromos = ():ThunkActionResult => async (dispatch, _getState): Promise<void> => {
  dispatch(setFetchPromosStatus(LoadingStatus.Loading));
  await axios.get(`${UrlRoute.Base}${UrlRoute.Promo}`)
    .then((response) => {
      const promos: Promo | Promo[] = response.data;
      const isList = Array.isArray(promos);

      const data = isList ? promos : [promos];
      dispatch(setPromos(data));
      dispatch(setFetchPromosStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchPromosStatus(LoadingStatus.Error)));
};

export {fetchPromos};
