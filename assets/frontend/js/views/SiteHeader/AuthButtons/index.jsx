import React, { memo } from 'react';
import SignInButton from './buttons/SignInButton';
import RegisterButton from './buttons/RegisterButton';

function AuthButtons() {
  return (
    <>
      <SignInButton />
      <RegisterButton />
    </>
  );
}

export default memo(AuthButtons);
