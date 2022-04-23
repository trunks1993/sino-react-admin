import React from 'react';

interface UserProps {
  name?: string;
}

const User: React.FC<UserProps> = ({ name }) => {

  return <div>User</div> ;
};

export default User;
