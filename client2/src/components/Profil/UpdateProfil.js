import { useSelector } from 'react-redux';
import LeftNav from '../LeftNav';
import { dateParserProfil } from '../Utils';
import DeleteProfil from './DeleteProfil';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-profile" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="option-update">
            <h3>Option</h3>
            <DeleteProfil />
          </div>
          <h4>Membre depuis le : {dateParserProfil(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
