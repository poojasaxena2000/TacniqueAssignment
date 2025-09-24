


import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-60 bg-blue-700 text-white">Prev</button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-60 bg-blue-700 text-white">Next</button>
    </div>
  )
}
