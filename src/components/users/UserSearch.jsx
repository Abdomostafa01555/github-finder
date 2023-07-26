import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

function UserSearch() {
  // State for the search input
  const [text, setText] = useState('');

  // Get the users and dispatch function from the GithubContext
  const { users, dispatch } = useContext(GithubContext);

  // Get the setAlert function from the AlertContext
  const { setAlert } = useContext(AlertContext);

  // Handler for the search input change
  const handleChange = (e) => setText(e.target.value);

  // Handler for the search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });

      setText('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        {/* Search form */}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {/* Clear button */}
        {users.length > 0 ? (
          <button
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
            className='btn btn-ghost btn-lg'
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default UserSearch;