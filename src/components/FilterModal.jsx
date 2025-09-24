


import React, { useState } from 'react'

export default function FilterModal({ initial, onApply, onClose }) {
  const [f, setF] = useState(initial || { firstName: '', lastName: '', email: '', department: '' })

  function change(e) {
    const { name, value } = e.target
    setF((s) => ({ ...s, [name]: value }))
  }

  function apply() {
    onApply(f)
  }

  function clearAll() {
    setF({ firstName: '', lastName: '', email: '', department: '' })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 z-50">
      <div className="bg-white rounded-md shadow p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input name="firstName" value={f.firstName} onChange={change}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input name="lastName" value={f.lastName} onChange={change}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" value={f.email} onChange={change}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Department</label>
            <input name="department" value={f.department} onChange={change}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={apply} className="px-4 py-2 bg-blue-600 text-white rounded-md">Apply</button>
          <button onClick={clearAll} className="px-4 py-2 border rounded-md">Clear</button>
          <button onClick={onClose} className="px-4 py-2 border rounded-md">Close</button>
        </div>
      </div>
    </div>
  )
}
