import React from 'react';

function Post({ post }) {
    const { title, body } = post;
    console.log('post: ',title, body);
    return (
        <div>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    );
}

export default Post;