import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import Loader from './components/Loader';

const App = () => {
  const [uid, setUid] = useState(null);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}jwtid`, {
          credentials: 'include',
        });
        const data = await response.json();
        setUid(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchToken();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
