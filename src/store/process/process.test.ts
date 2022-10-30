import {
  process, cleanForm, setCamerasTotalCount, setCurrentPage,
  setReviewFormData, setCurrentSortingType, setCurrentSortingOrder, setCurrentPath, initialStateApp
} from './process';


import {FORM_ID_TYPE, InputName} from '../../utils/const';
import {getFakePostReview, UNKNOWN_TYPE, fakeType} from '../../utils/mocks';
import {AppProcess} from '../../types/state';


const state: AppProcess = initialStateApp;

const fakePostReview = getFakePostReview();


describe('reducer process', () => {
  it('without values should return initial values', () => {
    expect(process.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should set current catalog page', () => {
    expect(process.reducer(state, setCurrentPage(1)))
      .toEqual({...state, currentCatalogPage: 1});

    expect(process.reducer(state, setCurrentPage(5)))
      .toEqual({...state, currentCatalogPage: 5});
  });

  it('should set cameras total count', () => {
    expect(process.reducer(state, setCamerasTotalCount(40)))
      .toEqual({...state, camerasTotalCount: 40});

    expect(process.reducer(state, setCamerasTotalCount(20)))
      .toEqual({...state, camerasTotalCount: 20});
  });

  it('should set review form data user name', () => {
    expect(process.reducer(state, setReviewFormData({type: InputName.Name, value: fakePostReview.userName})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, userName: fakePostReview.userName}});
  });

  it('should set review form data cameras advantage', () => {
    expect(process.reducer(state, setReviewFormData({type: InputName.Advantage, value: fakePostReview.advantage})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, advantage: fakePostReview.advantage}});
  });

  it('should set review form data cameras disadvantage', () => {
    expect(process.reducer(state, setReviewFormData({type: InputName.Disadvantage, value: fakePostReview.disadvantage})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, disadvantage: fakePostReview.disadvantage}});
  });

  it('should set review form data cameras review', () => {
    expect(process.reducer(state, setReviewFormData({type: InputName.Review, value: fakePostReview.review})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, review: fakePostReview.review}});
  });

  it('should set review form data cameras rating', () => {
    expect(process.reducer(state, setReviewFormData({type: InputName.Rating, value: fakePostReview.rating})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, rating: fakePostReview.rating}});
  });

  it('should set review form data camera id', () => {
    expect(process.reducer(state, setReviewFormData({type: FORM_ID_TYPE, value: fakePostReview.cameraId})))
      .toEqual({...state, reviewFormData: {...state.reviewFormData, cameraId: fakePostReview.cameraId}});
  });

  it('should reset review form data values', () => {
    const stateWithReviewForm = {...state, reviewFormData: fakePostReview};

    expect(process.reducer(stateWithReviewForm, cleanForm()))
      .toEqual(state);
  });

  it('should set current sorting type', () => {
    expect(process.reducer(state, setCurrentSortingType(fakeType)))
      .toEqual({...state, currentSortingType: fakeType, allSorting: [fakeType]});
  });

  it ('should set current sorting order', () => {
    expect(process.reducer(state, setCurrentSortingOrder(fakeType)))
      .toEqual({...state, currentSortingOrder: fakeType, allSorting: [fakeType]});
  });

  it ('should set current path', () => {
    expect(process.reducer(state, setCurrentPath(fakeType)))
      .toEqual({...state, currentPath: fakeType});
  });
});
