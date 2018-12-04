import React from 'react';

const login = ({ authenticate }) => {
  const handleOnClick = (event) => {
    const buttonText = event.target.firstChild.nodeValue;
    authenticate(getLoginType(buttonText));
  };

  const getLoginType = (text) => {
    const whitespaceBeforeLoginType = text.lastIndexOf(` `);
    const loginType = `${text.substring(whitespaceBeforeLoginType + 1)}`;
    return loginType;
  }

  return (
    <nav className='login'>
      <h2>
        Inventory Login
      </h2>
      <p>
        Sign in to manage your store's inventory.
      </p>
      <button className='github' onClick={handleOnClick}>
        Login with Github
      </button>
      <button className='facebook' onClick={handleOnClick}>
        Login with Facebook
      </button>
      <button className='twitter' onClick={handleOnClick}>
        Login with Twitter
      </button>
      <button className='google' onClick={handleOnClick}>
        Login with Google
      </button>
    </nav>
  );
};

export default login;