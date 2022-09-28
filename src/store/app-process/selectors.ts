import {State} from '../../types/state';
import {Camera} from '../../types/types';
import {NameSpace} from '../root-reducer';

export const getBasket = (state: State): Camera[] => state[NameSpace.App].basket;
