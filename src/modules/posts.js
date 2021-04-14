import * as postsAPI from '../api/posts';
import {
    createPromiseThunk,
    reducerUtils,
    handleAsyncAction,
    createPromiseThunkById,
    handleAsyncActionById
} from '../lib/asyncUtils';
import {call, put, takeEvery} from 'redux-saga/effects';


/*Action Type*/
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';


const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// const CLEAR_POST = 'CLEAR_POST';

// /*Thunk*/
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// // export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)
// // export const clearPost = () => ({type: CLEAR_POST});
// export const goToHome = () => (dispatch, getState, {history}) => {
//     history.push('/');
// };

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = id => ({ type: GET_POST, payload: id, meta: id });


/*Saga*/
function* getPostsSaga() {
    try {
        const posts = yield call(postsAPI.getPosts); // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
        yield put({
            type: GET_POSTS_SUCCESS,
            payload: posts
        });
    } catch (e) {
        yield put({
            type: GET_POSTS_ERROR,
            error: true,
            payload: e
        });
    }
}
function* getPostSaga(action){
    const param = action.payload;
    const id = action.meta;
    try {
        const post = yield call(postsAPI.getPostById, param);
        yield put({
            type: GET_POST_SUCCESS,
            payload: post,
            meta: id
        });
    } catch (e) {
        yield put({
            type: GET_POST_ERROR,
            error: true,
            payload: e,
            meta: id
        });
    }
};
export function* postsSaga () {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST,getPostSaga);
}


/*Thunk*/
export const goToHome = () => (dispatch, getState, { history }) => {
    history.push('/');
};


/*State*/
const initialState = {
    posts: reducerUtils.initial(),
    post: {}
};


/*Reducer*/
export default function posts(state = initialState,action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            const postsReducer = handleAsyncAction(GET_POSTS, 'posts', true);
            return postsReducer(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActionById(GET_POST,'post')(state,action);
        // case CLEAR_POST:
        //     return {
        //         ...state,
        //         post: reducerUtils.initial()
        //     }
        default:
            return state;
    }
}