import React from 'react';

interface RoleProps {
  name?: string;
}

const Role: React.FC<RoleProps> = ({ name }) => {

  return <div className="page-container">Role</div> ;
};

export default Role;
