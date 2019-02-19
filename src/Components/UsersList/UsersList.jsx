import React from 'react'
import User from '../User/User';

const UsersList = ( {users} ) => {

    return (
      <ul>
        { 
          users.map( user => {
            return <User key={user.id} userData={user}/>
          })
        } 
      </ul>
    )
  }

export default  UsersList;