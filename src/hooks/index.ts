import { useDispatch, useSelector, TypedUseSelectorHook, shallowEqual } from 'react-redux'

import type { RootState, AppDispatch } from '../store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAuth = () =>
  useAppSelector((state) => {
    return {
      isAuth: !!state.auth.user?.username,
      ...state.auth.user,
    }
  }, shallowEqual)
