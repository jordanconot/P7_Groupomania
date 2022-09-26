import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty } from '../Utils';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState('');
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append('file', file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert('Veuillez entrer un message');
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setFile('');
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/uploadimg.png" alt="upload" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".png, .jpeg, .jpg"
                  title="Envoyer une image"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {!isEmpty(error.format) && <p>{error.format}</p>}
      {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
      <div className="btn-send">
        {message || postPicture ? (
          <button className="cancel" onClick={cancelPost}>
            Annuler le message
          </button>
        ) : null}
        <button className="send" onClick={handlePost}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
