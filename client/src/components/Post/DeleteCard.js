import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deletePublication = () => {
    dispatch(deletePost(props.id));
  };
  return (
    <div
      onClick={() => {
        if (
          window.confirm('Voulez-vous vraiment supprimer cette publication ?')
        ) {
          deletePublication();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" title="Supprimer le post" />
    </div>
  );
};

export default DeleteCard;
