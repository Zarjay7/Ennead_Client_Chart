'use client'

import { ProgressNoteForm } from '@/components/forms/ProgressNoteForm'

export default function ProgressNoteTestPage() {
  const handleSubmit = (data: any) => {
    console.log('Submitted Progress Note Data:', data)
    alert('Progress Note finalized! (Mock submission)')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Progress Note — Test View</h1>
          <p className="text-gray-600 mt-1">
            Early prototype (mock data). This is the highest-priority form per the implementation plan.
          </p>
        </div>

        <ProgressNoteForm
          clientName="Maria Gonzalez"
          clientDob="07/22/1989"
          onSubmit={handleSubmit}
        />

        <div className="mt-8 text-xs text-gray-500 text-center">
          Form layout and fields are designed to closely match the official paper version.
          Signature capture and finalize flow are functional in this prototype.
        </div>
      </div>
    </div>
  )
}
