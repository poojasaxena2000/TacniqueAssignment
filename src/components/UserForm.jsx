





import React, { useState, useEffect } from 'react'

export default function UserForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState({ id: null, firstName: '', lastName: '', email: '', department: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? null,
        firstName: initial.firstName ?? '',
        lastName: initial.lastName ?? '',
        email: initial.email ?? '',
        department: initial.department ?? ''
      })
    } else {
      setForm({ id: null, firstName: '', lastName: '', email: '', department: '' })
      setErrors({})
    }
  }, [initial])

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email is invalid'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      id: form.id,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      company: { name: form.department },
      firstName: form.firstName,
      lastName: form.lastName,
      department: form.department
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">{form.id ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select name="department" value={form.department} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value=""> Select Department</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
