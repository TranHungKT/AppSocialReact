import {SET_USER,LOADING_USER,LOADING_UI,CLEAR_ERRORS,SET_ERRORS, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ} from '../type';
import axios from 'axios';


export const loginUser = (userData,history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/login',userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/user')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
        .then(()=>{
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
} 

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image',formData)
        .then(()=> {
            dispatch(getUserData());
        })
        .catch(err=> console.log(err))
}


export const signupUser = (newUserData,history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/signup',newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken',FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}


export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
      .post('/notifications', notificationIds)
      .then(() => {
        dispatch({
          type: MARK_NOTIFICATIONS_READ
        })
      })
      .catch((err) => console.log(err));
  };