import { useDispatch as dispatchHook } from 'react-redux';

import { TAppDispatch, TAppThunk } from '../utils/types';

export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();
