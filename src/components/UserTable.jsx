







import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
 import "../styles.css";

export default function UserTable({ users, onEdit, onDelete, onSort, sortField, sortDir }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase cursor-pointer" onClick={() => onSort('id')}>
              ID {sortField === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase cursor-pointer" onClick={() => onSort('firstName')}>
              First Name {sortField === 'firstName' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase cursor-pointer" onClick={() => onSort('lastName')}>
              Last Name {sortField === 'lastName' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase cursor-pointer" onClick={() => onSort('email')}>
              Email {sortField === 'email' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase cursor-pointer" onClick={() => onSort('department')}>
              Department {sortField === 'department' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left text-md font-medium text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No users found.</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm text-gray-700">{u.id}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{u.firstName}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{u.lastName}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{u.email}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{u.department}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                    onClick={() => onEdit(u)}
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                    onClick={() => onDelete(u.id)}
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
