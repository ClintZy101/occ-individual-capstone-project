import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import Input from '../forms/Input';




export default function DeleteUserModal({ isOpen, onClose, userName, userId,  handleDeleteUser }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const proceedDelete = () =>{
    if(inputValue === userName){
        handleDeleteUser(userId)
        onClose();
    }
  }

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Delete User</DialogHeader>
      <DialogBody>
        <p className="mb-2">
          Type the name of the user to confirm deletion:
          <strong className='px-2'>"{userName}"</strong>
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="User Name"
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="purple" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={proceedDelete}
          disabled={inputValue !== userName}
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
