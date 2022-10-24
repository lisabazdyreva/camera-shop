import {AppFilterCameras} from '../../types/state';
import {filterCameras, removeCurrentFilter, resetFilters, setCurrentFilter, setHighPrice, setLowPrice} from './filter-cameras';
import {UNKNOWN_TYPE} from '../../utils/mocks';
import {QueryRoute} from '../../utils/const';
import faker from 'faker';
import {fetchHighPriceAction, fetchLowPriceAction, fetchPricesAction} from '../api-actions/api-actions-filters/api-actions-filters';

const state: AppFilterCameras = {
  currentFilterCategory: [],
  currentFilterType: [],
  currentFilterLevel: [],
  allFilters: [],
  minPrice: 0,
  maxPrice: 0,
  lowPrice: '',
  highPrice: '',
};

describe('reducer filter cameras', () => {
  it('without values should return initial values', () => {
    expect(filterCameras.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should reset filters', () => {
    expect(filterCameras.reducer(state, resetFilters()))
      .toEqual(state);
  });

  it('should set current filter', () => {
    const fakeCategory = faker.datatype.string();
    expect(filterCameras.reducer(state, setCurrentFilter({filter: QueryRoute.Category, value: fakeCategory})))
      .toEqual({...state, currentFilterCategory: [fakeCategory], allFilters: [fakeCategory]});
  });

  it('should remove current filter', () => {
    const fakeCategory = faker.datatype.string();
    expect(filterCameras.reducer({...state, currentFilterCategory: [fakeCategory], allFilters: [fakeCategory]}, removeCurrentFilter({filter: QueryRoute.Category, value: fakeCategory})))
      .toEqual(state);
  });

  it('should set low price', () => {
    const fakeValue = faker.datatype.number();
    expect(filterCameras.reducer(state, setLowPrice({value: fakeValue})))
      .toEqual({...state, lowPrice: fakeValue, allFilters: [fakeValue]});
  });

  it('should set high price', () => {
    const fakeValue = faker.datatype.number();
    expect(filterCameras.reducer(state, setHighPrice({value: fakeValue})))
      .toEqual({...state, highPrice: fakeValue, allFilters: [fakeValue]});
  });

  it('should set min ans max prices', () => {
    const fakeMin = faker.datatype.number();
    const fakeMax = faker.datatype.number();
    expect(filterCameras.reducer(state, {type: fetchPricesAction.fulfilled.type, payload: {minPrice: fakeMin, maxPrice: fakeMax}}))
      .toEqual({...state, maxPrice: fakeMax, minPrice: fakeMin});
  });

  it('should react min ans max prices error', () => {
    expect(filterCameras.reducer(state, {type: fetchPricesAction.rejected.type}))
      .toEqual(state);
  });

  it('should set fetch low price', () => {
    const fakeLowPrice = faker.datatype.number();
    expect(filterCameras.reducer(state, {type: fetchLowPriceAction.fulfilled.type, payload: {lowPrice: fakeLowPrice}}))
      .toEqual({...state, lowPrice: fakeLowPrice, allFilters: [fakeLowPrice]});
  });

  it('should set fetch high price', () => {
    const fakeHighPrice = faker.datatype.number();
    expect(filterCameras.reducer(state, {type: fetchHighPriceAction.fulfilled.type, payload: {highPrice: fakeHighPrice}}))
      .toEqual({...state, highPrice: fakeHighPrice, allFilters: [fakeHighPrice]});
  });

  it('should set nothing when low price error', () => {
    expect(filterCameras.reducer(state, {type: fetchLowPriceAction.rejected.type}))
      .toEqual(state);
  });

  it('should set nothing when high price error', () => {
    expect(filterCameras.reducer(state, {type: fetchHighPriceAction.rejected.type}))
      .toEqual(state);
  });
});
