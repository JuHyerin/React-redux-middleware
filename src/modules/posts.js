import * as postsAPI from '../api/posts';
import {
    createPromiseThunk,
    reducerUtils,
    handleAsyncAction,
    createPromiseThunkById,
    handleAsyncActionById
} from '../lib/asyncUtils';

/*Action Type*/
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';


const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// const CLEAR_POST = 'CLEAR_POST';

/*Thunk*/
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)
// export const clearPost = () => ({type: CLEAR_POST});
export const goToHome = () => (dispatch, getState, {history}) => {
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