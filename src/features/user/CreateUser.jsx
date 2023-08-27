import { useState } from 'react';
import Button from '../../components/Button';
import {useDispatch} from "react-redux"
import { updateName } from './userSlice';
import {useNavigate} from "react-router-dom"

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return
    dispatch(updateName(username))
    setUsername("")
    navigate("/menu")
  }

  return (
    <form onSubmit={handleSubmit}>
      <p   className='mb-4 text-sm px-3 text-stone-600 md:text-base' >👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        className='w-72 inputs mb-7'
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type = "primary" >Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
