




import React, { useEffect, useState, useMemo } from 'react'
import { getUsers, addUser, updateUser, deleteUser } from './services/api'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'
import Pagination from './components/Pagination'
import FilterModal from './components/FilterModal'
import { toast } from "react-toastify";

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // UI state here 
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' })

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)
    setError('')
    try {
      const res = await getUsers()
      const mapped = res.data.map((u) => {
        const nameParts = (u.name || '').split(' ')
        return {
          ...u,
          firstName: nameParts[0] || '',
          lastName: (nameParts.slice(1).join(' ')) || '',
          department: u.company?.name || ''
        }
      })
      setUsers(mapped)
    } catch (err) {
      setError('Failed to load users. Please try again later.')
      toast.warn("Failed to load users. Please try again later")
    } finally {
      setLoading(false)
    }
  }

  // Derived data filter data here
  const processedUsers = useMemo(() => {
    let data = [...users]
    if (filters.firstName) data = data.filter((u) => u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()))
    if (filters.lastName) data = data.filter((u) => u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()))
    if (filters.email) data = data.filter((u) => u.email.toLowerCase().includes(filters.email.toLowerCase()))
    if (filters.department) data = data.filter((u) => (u.department || '').toLowerCase().includes(filters.department.toLowerCase()))

    if (search) {
      const s = search.toLowerCase()
      data = data.filter((u) =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        (u.department || '').toLowerCase().includes(s)
      )
    }

    if (sortField) {
      data.sort((a, b) => {
        const A = (a[sortField] || '').toString().toLowerCase()
        const B = (b[sortField] || '').toString().toLowerCase()
        if (A < B) return sortDir === 'asc' ? -1 : 1
        if (A > B) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return data
  }, [users, filters, search, sortField, sortDir])

  const total = processedUsers.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(page, totalPages)
  const paginated = processedUsers.slice((currentPage - 1) * limit, currentPage * limit)

  // Handlers click functions
  const handleAddClick = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      alert('Failed to delete user. Try again.')
    
    }
  }



  const handleSave = async (formData) => {
    // formData contains id when editing; ensure id types match (numbers)
    if (formData.id) {
      try {
        await updateUser(formData.id, formData)
        setUsers((prev) => prev.map((u) => (u.id === formData.id ? { ...u, ...formData } : u)))
        setShowForm(false)
      } catch (err) {
        alert('Failed to update user. Try again.')
      }
    } else {
      try {
        const res = await addUser(formData)


        // JSONPlaceholder returns id 
        const newUser = { ...formData, id: res.data.id || Date.now() }
        setUsers((prev) => [newUser, ...prev])
        setShowForm(false)
      } catch (err) {
        alert('Failed to add user. Try again.')
      }
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-blue-500">User Management Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add User</button>
          <button onClick={() => setShowFilter(true)} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">Filters</button>
        </div>
      </header>

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="w-full sm:w-auto">
          <label className="block text-md text-blue-500 font-medium mb-1">Search User</label>
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name, email or department..."
            className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 border border-2 " />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Rows:</label>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="border border-gray-300 rounded-md px-2 py-1">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </section>

      {loading && <div className="p-3 bg-white shadow rounded-md mb-4">Loading users...</div>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">{error}</div>}

      <UserTable users={paginated} onEdit={handleEdit} onDelete={handleDelete} onSort={handleSort} sortField={sortField} sortDir={sortDir} />

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

      {showForm && <UserForm initial={editingUser} onClose={() => setShowForm(false)} onSave={handleSave} />}

      {showFilter && <FilterModal initial={filters} onApply={(f) => { setFilters(f); setShowFilter(false); setPage(1); }} onClose={() => setShowFilter(false)} />}

    </div>
  )
}
