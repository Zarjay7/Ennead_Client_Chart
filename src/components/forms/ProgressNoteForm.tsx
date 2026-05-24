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
    <div className="max-w-[8.5in] mx-auto bg-white border-2 border-black shadow-lg font-sans text-[14px] leading-tight">
      {/* Official Header Style - mimicking the paper form */}
      <div className="border-b-2 border-black p-3 bg-gray-50">
        <div className="text-center">
          <div className="text-xl font-bold tracking-[3px]">PROGRESS NOTE</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Ennead • 2740 Fulton Ave Ste. 216 • Sacramento, CA 95821</div>
        </div>
      </div>

      {/* Client Header - exact paper style */}
      <div className="grid grid-cols-2 border-b border-black">
        <div className="p-2 border-r border-black">
          <div className="text-[10px] font-bold text-gray-500">CLIENT / RESIDENT NAME</div>
          <div className="text-base font-semibold">{clientName}</div>
        </div>
        <div className="p-2">
          <div className="text-[10px] font-bold text-gray-500">DATE OF BIRTH</div>
          <div className="text-base font-semibold">{clientDob}</div>
        </div>
      </div>

      {/* Form Body - trying to match the table structure of the paper */}
      <div className="p-3 space-y-4">

        {/* Date & Time Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-bold mb-0.5">SERVICE DATE</div>
            <input
              type="date"
              value={formData.serviceDate}
              onChange={(e) => handleChange('serviceDate', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-black px-2 py-1 text-sm"
            />
          </div>
          <div>
            <div className="text-[10px] font-bold mb-0.5">SERVICE TIME</div>
            <input
              type="time"
              value={formData.serviceTime}
              onChange={(e) => handleChange('serviceTime', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-black px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Contact Type + Service Type - with legend colors from the paper */}
        <div className="grid grid-cols-2 gap-3">
          {/* Contact Type - yellow/tan legend row from paper */}
          <div>
            <div className="text-[10px] font-bold mb-0.5 bg-amber-100 px-1">CONTACT TYPE CODE</div>
            <select
              value={formData.contactType}
              onChange={(e) => handleChange('contactType', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-black px-2 py-1 text-sm"
            >
              <option value="">Select...</option>
              {CONTACT_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.code} = {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type - green legend row from paper */}
          <div>
            <div className="text-[10px] font-bold mb-0.5 bg-emerald-100 px-1">SERVICE TYPE CODE</div>
            <select
              value={formData.serviceType}
              onChange={(e) => handleChange('serviceType', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-black px-2 py-1 text-sm"
            >
              <option value="">Select...</option>
              {SERVICE_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.code} = {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Narrative - large box like the paper */}
        <div>
          <div className="text-[10px] font-bold mb-0.5">NARRATIVE</div>
          <textarea
            value={formData.narrative}
            onChange={(e) => handleChange('narrative', e.target.value)}
            disabled={isFinalized}
            rows={10}
            className="w-full border-2 border-black px-3 py-2 text-sm leading-snug resize-y min-h-[180px]"
            placeholder="Enter clinical narrative here..."
          />
        </div>

        {/* Staff + Signature Row */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black">
          <div>
            <div className="text-[10px] font-bold mb-0.5">STAFF NAME / TITLE</div>
            <input
              type="text"
              value={formData.staffName}
              onChange={(e) => handleChange('staffName', e.target.value)}
              disabled={isFinalized}
              className="w-full border border-black px-2 py-1 text-sm"
            />
          </div>

          <div>
            <SignatureCanvas
              value={formData.signature}
              onChange={(sig) => handleChange('signature', sig)}
              label="Staff Signature"
              height={90}
            />
          </div>
        </div>
      </div>

      {/* Footer / Actions - paper style */}
      <div className="border-t-2 border-black p-3 flex items-center justify-between bg-gray-50 text-sm">
        <div className="text-gray-600">
          {isFinalized ? (
            <span className="font-semibold text-green-700">FINALIZED • {new Date().toLocaleDateString()}</span>
          ) : (
            "Complete all required fields then sign to finalize"
          )}
        </div>
        {!isFinalized && (
          <button
            onClick={handleFinalize}
            className="bg-black text-white px-5 py-1.5 text-sm hover:bg-gray-800 active:bg-black transition"
          >
            FINALIZE &amp; SIGN
          </button>
        )}
      </div>
    </div>
  )
}
