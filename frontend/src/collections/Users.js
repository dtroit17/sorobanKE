const Users = {
    slug: 'users',
    fields: [
      { name: 'username', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'password', type: 'password', required: true },
    ],
  };
  
  module.exports = Users;