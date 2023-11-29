import { useEffect, useState } from 'react';
import EditData from './component/EditData';
// import styles from './App.module.css';
import './App.css';


const API = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [showCount, setShowCount] = useState(10);
  const [searchquery, setSearchquery] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async(API) => {
    try{
      const res = await fetch(API);
      const data = await res.json();
      if(data.length > 0){
        setUsersData(data.slice(0,showCount));
      }
    }catch(e){
      console.error(e); 
    }
  }
  const handleShowCount = () => {
    if(showCount !== 110){
      setShowCount(showCount+10);
    }
  }
  const search = () => {
    return usersData.filter((row) => row.name.toLowerCase().indexOf(searchquery.toLowerCase()) > -1)
  }

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingUser(null);
  }
  const handleEditUser = async (editedUser) => {
    try {
      const userToUpdate = usersData.find((user) => user.id === editedUser.id);

      if (!userToUpdate) {
        console.error('User not found');
        return;
      }

      const response = await fetch(`${API}/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userToUpdate,
          name: editedUser.name, 
          email: editedUser.email, 
          mobile:editedUser.phone,
          skill: editedUser.skill,
          education:editedUser.education,
          address:editedUser.address
        }),
      });

      if (response.ok) {
        setUsersData((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? { ...user, name: editedUser.name, email: editedUser.email,mobile:editedUser.phone,skill:editedUser.skill,education:editedUser.education,address:editedUser.education } : user
          )
        );
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleSort = () => {
    const sortedUsers = [...usersData].sort((a, b) => {
      // Example: Sorting by name in ascending order
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setUsersData(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect( () => {
    fetchData(API);
  },[showCount]);

  return (
    <div className="App">
      <div className='searchbar'>
        <input type="text" className='searchbar-input' placeholder='search by name ...' value={searchquery} onChange={(e) => setSearchquery(e.target.value)}/>
      </div>
      <div className="table-data">
        <table>
          <thead className='table-header'>
            <th className='id-header'>ID</th>
            <th className='name-header'>name <button onClick={handleSort}>sort</button></th>
            <th className='mobile-header'>mobile</th>
            <th className='email-header'>email</th>
            <th className='skill-header'>skill</th>
            <th className='education-header'>education</th>
            <th className='address-header'>address</th>
            <th className='other-header'>other options</th>
          </thead>
          <tbody className='table-body'>
            {
              search(usersData).map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.skill}</td>
                  <td>{user.education}</td>
                  <td>{user.address.street}</td>
                  <td><button onClick={() => openEditModal(user)}>edit</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <EditData isOpen={isOpen} user ={editingUser} onClose={handleCloseModal} onEdit={handleEditUser}/>
      </div>
      <div><button onClick={handleShowCount}>show more...</button></div>
    </div>
  );
}

export default App;
