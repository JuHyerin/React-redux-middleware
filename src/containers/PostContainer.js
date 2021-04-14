import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {clearPost, getPost, goToHome} from '../modules/posts';
import Post from '../components/Post';

function PostContainer ({postId}) {
    const {data, loading, error} = useSelector(
        state => {
            console.log(state);
            return state.posts.post[postId]
        }
    ) || {
        loading: false,
        data: null,
        error: null
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if(data) return;
        dispatch(getPost(postId));
        // return () => {
        //     dispatch(clearPost());
        // }
    }, [dispatch, postId, data]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        <>
            <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
            <Post post={data}/>
        </>
    );
}

export default PostContainer;