import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
// If you're using shadcn/ui components in your project, swap the native input/button
// with shadcn imports like:
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Reusable TagInput component (JavaScript + React)
 * - Uses tailwind utility classes so it fits shadcn projects out of the box
 * - Props:
 *    - value (array)        controlled tags
 *    - defaultValue (array) initial tags for uncontrolled use
 *    - onChange (fn)        called whenever tags change
 *    - placeholder (string)
 *    - allowDuplicates (bool)
 *
 * Example: <TagInput defaultValue={["html","css","js"]} onChange={tags => console.log(tags)} />
 */

export default function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = 'علامات',
  allowDuplicates = false,
  name ="",
  id =""
}) {
  const [internalTags, setInternalTags] = useState(defaultValue)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  // If component is controlled (value provided), sync local state
  useEffect(() => {
    if (value) setInternalTags(value)
  }, [value])


  const emit = (next) => {
    if (!value) setInternalTags(next) // only manage local state if uncontrolled
    if (typeof onChange === 'function') onChange(next)
  }

  const normalize = (raw) => raw.trim().replace(/^,+|,+$/g, '')

  const addTag = (raw) => {
    const tag = normalize(raw)
    if (!tag) return
    const next = allowDuplicates
      ? [...internalTags, tag]
      : Array.from(new Set([...internalTags, tag]))
    // Avoid adding existing tag when duplicates not allowed
    if (!allowDuplicates && internalTags.includes(tag)) {
      setInput('')
      return
    }
    emit(next)
    setInput('')
  }

  const removeTag = (index) => {
    const next = internalTags.filter((_, i) => i !== index)
    emit(next)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input)
    }

    if (e.key === ',') {
      e.preventDefault()
      addTag(input)
    }

    if (e.key === 'Backspace' && input === '' && internalTags.length) {

      const last = internalTags[internalTags.length - 1]
      removeTag(internalTags.length - 1)
      setInput(last)
    }
  }

  const handlePaste = (e) => {
    const txt = e.clipboardData.getData('text')
    if (!txt) return
    const parts = txt
      .split(/[,;]+/)
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length === 0) return
    e.preventDefault()
    const next = allowDuplicates
      ? [...internalTags, ...parts]
      : Array.from(new Set([...internalTags, ...parts]))
    emit(next)
    setInput('')
  }

  return (
    <div>
      <div
        className=''
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        <div className="flex gap-2 flex-wrap">
          {internalTags.map((tag, idx) => (
            <span
              key={tag + '-' + idx}
              className='inline-flex items-center gap-2 px-2 py-1 rounded-full bg-muted text-sm'
            >
              <span className='select-none'>{tag}</span>
              <button
                type='button'
                aria-label={`Remove ${tag}`}
                onClick={() => removeTag(idx)}
                className='inline-flex items-center justify-center rounded-full p-1 hover:bg-muted/50'
              >
                <X className='h-3 w-3' />
              </button>
            </span>
          ))}
        </div>

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          name={name}
          placeholder={placeholder}
          id={id}
          className='flex-1 min-w-[120px] bg-transparent outline-none text-sm'
        />
      </div>
    </div>
  )
}

