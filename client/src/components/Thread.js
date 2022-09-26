import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Post/Card';
import ScrollTopButton from './ScrollTopButton';
import { isEmpty } from './Utils';

const Thread = () => {
  const posts = useSelector((state) => state.postReducer);
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <div className="thread-container">
        <ul>
          {!isEmpty(posts[0]) &&
            userData.pseudo !== undefined &&
            posts.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </ul>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default Thread;
