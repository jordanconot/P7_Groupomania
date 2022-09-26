import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/user.actions';
import { useSelector } from 'react-redux';

const DeleteProfil = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const deleteProfil = () => {
    dispatch(deleteUser(userData._id));
  };

  return (
    <button
      onClick={() => {
        if (window.confirm('Voulez vous vraiment supprimer votre profil ?')) {
          deleteProfil();
          window.location = '/';
        }
      }}
    >
      Supprimer mon profil
    </button>
  );
};

export default DeleteProfil;
