'use client'

import React, { useState } from 'react'
import { SignatureCanvas } from '../shared/SignatureCanvas'
import { CONTACT_TYPES, SERVICE_TYPES } from '@/lib/constants/formCodes'

interface ProgressNoteFormProps {
  clientName?: string
  clientDob?: string
  onSubmit?: (data: any) => void
}

export function ProgressNoteForm({
  clientName = 'John Doe',
  clientDob = '03/15/1978',
  onSubmit,
}: ProgressNoteFormProps) {
  const [formData, setFormData] = useState({
    serviceDate: '',
    serviceTime: '',
    contactType: '',
    serviceType: '',
    narrative: '',
    staffName: 'Jane Smith, LCSW',
    signature: '',
  })

  const [isFinalized, setIsFinalized] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFinalize = () => {
    if (!formData.signature) {
      alert('Signature is required to finalize.')
      return
    }
    const finalData = { ...formData, finalizedAt: new Date().toISOString() }
    setIsFinalized(true)
    onSubmit?.(finalData)
    console.log('Finalized Progress Note:', finalData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 shadow-sm">
      {/* Header - mimicking paper form style */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide">PROGRESS NOTE</h1>
      </div>

      {/* Client Info Row */}
      <div className="grid grid-cols-2 gap-4 mb-6 border-b pb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500">CLIENT NAME</label>
          <div className="text-lg font-medium">{clientName}</div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500">DOB</label>
          <div className="text-lg font-medium">{clientDob}</div>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-6">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Date</label>
            <input
              type="date"
              value={formData.serviceDate}
              onChange={(e) => handleChange('serviceDate', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service Time</label>
            <input
              type="time"
              value={formData.serviceTime}
              onChange={(e) => handleChange('serviceTime', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Contact Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Contact Type</label>
          <select
            value={formData.contactType}
            onChange={(e) => handleChange('contactType', e.target.value)}
            disabled={isFinalized}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Select...</option>
            {CONTACT_TYPES.map((type) => (
              <option key={type.code} value={type.code}>
                {type.code} — {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Type</label>
          <select
            value={formData.serviceType}
            onChange={(e) => handleChange('serviceType', e.target.value)}
            disabled={isFinalized}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Select...</option>
            {SERVICE_TYPES.map((type) => (
              <option key={type.code} value={type.code}>
                {type.code} — {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Narrative */}
        <div>
          <label className="block text-sm font-medium mb-1">Narrative</label>
          <textarea
            value={formData.narrative}
            onChange={(e) => handleChange('narrative', e.target.value)}
            disabled={isFinalized}
            rows={12}
            className="w-full border border-gray-300 px-4 py-3 rounded resize-y min-h-[200px]"
            placeholder="Enter clinical narrative here..."
          />
        </div>

        {/* Staff Info */}
        <div>
          <label className="block text-sm font-medium mb-1">Staff Name / Title</label>
          <input
            type="text"
            value={formData.staffName}
            onChange={(e) => handleChange('staffName', e.target.value)}
            disabled={isFinalized}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Signature */}
        <div>
          <SignatureCanvas
            value={formData.signature}
            onChange={(sig) => handleChange('signature', sig)}
            label="Staff Signature"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {isFinalized ? 'This note has been finalized.' : 'All fields required to finalize.'}
        </div>
        {!isFinalized && (
          <button
            onClick={handleFinalize}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Finalize & Sign
          </button>
        )}
      </div>
    </div>
  )
}
