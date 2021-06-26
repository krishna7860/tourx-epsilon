/* eslint-disable no-restricted-globals */
import { AES } from "crypto-js";
import { Dispatch } from "redux";
import { GET, POST } from "../../api";
import { AUTH_ROUTES, BACKEND_BASE_URL } from "../../api/routes";
import { GET_LOGGED_IN_USER } from "../../containers/Landing/component/CategorySection/constant";
import { LOGOUT } from "../../containers/WelcomeGuide/constant";
import { LOGIN, SET_ISAUTH } from "../constant/constant";

export const setIsAuth = (isAuth: boolean) => ({
  type: SET_ISAUTH,
  payload: isAuth,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const authenticateUser =
  (token: string) => async (dispatch: Dispatch) => {
    const response: any = await GET(
      `${BACKEND_BASE_URL}/${AUTH_ROUTES}/me`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.isSuccess) {
      dispatch({
        type: GET_LOGGED_IN_USER,
        payload: response?.data || {},
      });
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  };

export const loginUser = (payload: any) => async (dispatch: Dispatch) => {
  const { REACT_APP_SALT } = process.env;
  const encryptPassword = AES.encrypt(
    payload.password,
    REACT_APP_SALT || ""
  ).toString();

  const data = {
    ...payload,
    password: encryptPassword,
  };
  const response: any = await POST(
    `${BACKEND_BASE_URL}/${AUTH_ROUTES}/login`,
    data
  );

  dispatch({
    type: LOGIN,
  });

  return response;
};
