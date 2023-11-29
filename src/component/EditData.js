import React from 'react'
import styles from './EditData.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

const EditData = ({isOpen,user,onClose,onEdit}) => {
    const [editedUser, setEditedUser] = useState({...user});
    useEffect(() => {
        if(user){
            setEditedUser({...user});
        }
    },[user])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
      };

      const handleSaveData = () => {
        // console.log(editedUser);
        onEdit(editedUser);
        onClose();
        // setEditedUser(null);
    }
    if(!isOpen || !user){
        return null;
    }
  return (
    <div style={{display:isOpen ? 'block' : 'none'}}>
        <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}X
          </button>
          <div className={styles.modalContent}>
            <input className='input-name' type="text" name='name' placeholder='name' value={editedUser?.name} onChange={handleInputChange}/>
            <input className='input-mobile' type="text" name='mobile' placeholder='mobile' value={editedUser?.phone} onChange={handleInputChange}/>
            <input className='input-email' type="text" name='email' placeholder='email' value={editedUser?.email} onChange={handleInputChange}/>
            <input className='input-skill' type="text" name='skill' placeholder='skill' value={editedUser?.skill} onChange={handleInputChange}/>
            <input className='input-education' type="text" name='education' placeholder='education' value={editedUser?.education} onChange={handleInputChange}/>
            <input className='input-address' type="text" name='address' placeholder='address' value={editedUser?.address?.street} onChange={handleInputChange}/>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={handleSaveData}>
                Save
              </button>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditData