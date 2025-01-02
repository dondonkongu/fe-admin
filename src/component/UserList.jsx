import React, { useEffect, useState } from 'react';
import BASE_URL from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiUk9MRV9BRE1JTiIsImlzcyI6ImRldnRlcmlhLmNvbSIsImV4cCI6MTczNTg0ODk0NiwiaWF0IjoxNzM1ODQ1MzQ2LCJ1c2VySWQiOiI3MTQzMWYwMy0xMzYyLTRlZmMtOThjMS1jMDI0YjFhYjVkZTkiLCJqdGkiOiI4MmYzMzUyZi0zMjI1LTRlNDgtOTE2Yy05ZDdlMTg0ODA4ZTYifQ.b339uRdV5c-6MI_osBxeyfAnBU4dxJ-1e2WWcXeGWTY7khULCDMUNuz96oFjEPci8vPFsaiNfP_yXfeDSqr3qw';

  const fetchUsers = async () => {
    try {
      const response = await BASE_URL.get('/identity/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.code === 1000) {
        setUsers(response.data.result);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await BASE_URL.put(`/identity/users/${id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.code === 1000) {
        fetchUsers();
        setShowModal(false);
        setEditingUser(null);
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await BASE_URL.delete(`/identity/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.code === 1000) {
        fetchUsers();
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName || ''} {user.lastName || ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.address || ''}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setEditingUser(user);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(editingUser.id);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={editingUser.firstName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={editingUser.lastName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, lastName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={editingUser.address}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, address: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
