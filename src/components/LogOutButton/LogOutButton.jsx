import { useSelect } from '@mui/base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {

  const user = useSelector(store => store.user);

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        dispatch({ type: 'LOGOUT' });
        if(user.access_level == 0) {
          history.push('/feedback');
        }
        else {
          history.push('/home')
        }
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
