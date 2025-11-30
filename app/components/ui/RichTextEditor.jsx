'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Minus,
  Link2,
  ImagePlus,
  Grid3x3,
  Type,
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const colorPickerRef = useRef(null)
  const highlightPickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false)
      }
      if (
        highlightPickerRef.current &&
        !highlightPickerRef.current.contains(event.target)
      ) {
        setShowHighlightPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!editor) return null

  const colors = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
  ]

  const addLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()
  }

  const handleButtonClick = (callback) => (e) => {
    e.preventDefault()
    callback()
  }

  return (
    <div
      className='border-b border-gray-300 bg-gray-50 px-2 py-1 flex flex-wrap gap-1 sticky top-0 z-10'
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        type='button'
        onClick={handleButtonClick(() => editor.chain().focus().undo().run())}
        disabled={!editor.can().undo()}
        className='p-2 rounded hover:bg-gray-200 disabled:opacity-30'
        title='Undo'
      >
        <Undo size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() => editor.chain().focus().redo().run())}
        disabled={!editor.can().redo()}
        className='p-2 rounded hover:bg-gray-200 disabled:opacity-30'
        title='Redo'
      >
        <Redo size={18} />
      </button>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleBold().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('bold') ? 'bg-blue-100' : ''
        }`}
        title='Bold'
      >
        <Bold size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleItalic().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('italic') ? 'bg-blue-100' : ''
        }`}
        title='Italic'
      >
        <Italic size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleUnderline().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('underline') ? 'bg-blue-100' : ''
        }`}
        title='Underline'
      >
        <Type size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleStrike().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('strike') ? 'bg-blue-100' : ''
        }`}
        title='Strikethrough'
      >
        <Strikethrough size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleCode().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('code') ? 'bg-blue-100' : ''
        }`}
        title='Code'
      >
        <Code size={18} />
      </button>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <div className='relative' ref={colorPickerRef}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault()
            setShowColorPicker(!showColorPicker)
            setShowHighlightPicker(false)
          }}
          className='p-2 rounded hover:bg-gray-200'
          title='Text Color'
        >
          <Palette size={18} />
        </button>
        {showColorPicker && (
          <div className='absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 grid grid-cols-5 gap-1 z-20'>
            {colors.map((color) => (
              <button
                key={color}
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().setColor(color).run()
                  setShowColorPicker(false)
                }}
                className='w-6 h-6 rounded border border-gray-300'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className='relative' ref={highlightPickerRef}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault()
            setShowHighlightPicker(!showHighlightPicker)
            setShowColorPicker(false)
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('highlight') ? 'bg-blue-100' : ''
          }`}
          title='Highlight'
        >
          <Highlighter size={18} />
        </button>
        {showHighlightPicker && (
          <div className='absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 grid grid-cols-5 gap-1 z-20'>
            {colors.map((color) => (
              <button
                key={color}
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleHighlight({ color }).run()
                  setShowHighlightPicker(false)
                }}
                className='w-6 h-6 rounded border border-gray-300'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        )}
        className={`p-2 px-3 rounded hover:bg-gray-200 font-bold ${
          editor.isActive('heading', { level: 2 }) ? 'bg-blue-100' : ''
        }`}
        title='Heading 2'
      >
        H2
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        )}
        className={`p-2 px-3 rounded hover:bg-gray-200 font-bold ${
          editor.isActive('heading', { level: 3 }) ? 'bg-blue-100' : ''
        }`}
        title='Heading 3'
      >
        H3
      </button>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().setTextAlign('left').run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100' : ''
        }`}
        title='Align Left'
      >
        <AlignLeft size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().setTextAlign('center').run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100' : ''
        }`}
        title='Align Center'
      >
        <AlignCenter size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().setTextAlign('right').run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100' : ''
        }`}
        title='Align Right'
      >
        <AlignRight size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().setTextAlign('justify').run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-100' : ''
        }`}
        title='Justify'
      >
        <AlignJustify size={18} />
      </button>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleBulletList().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('bulletList') ? 'bg-blue-100' : ''
        }`}
        title='Bullet List'
      >
        <List size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleOrderedList().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('orderedList') ? 'bg-blue-100' : ''
        }`}
        title='Numbered List'
      >
        <ListOrdered size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleBlockquote().run()
        )}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('blockquote') ? 'bg-blue-100' : ''
        }`}
        title='Quote'
      >
        <Quote size={18} />
      </button>

      <div className='w-px h-8 bg-gray-300 mx-1' />

      <button
        type='button'
        onClick={handleButtonClick(addLink)}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('link') ? 'bg-blue-100' : ''
        }`}
        title='Add Link'
      >
        <Link2 size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(addImage)}
        className='p-2 rounded hover:bg-gray-200'
        title='Add Image'
      >
        <ImagePlus size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(insertTable)}
        className='p-2 rounded hover:bg-gray-200'
        title='Insert Table'
      >
        <Grid3x3 size={18} />
      </button>
      <button
        type='button'
        onClick={handleButtonClick(() =>
          editor.chain().focus().setHorizontalRule().run()
        )}
        className='p-2 rounded hover:bg-gray-200'
        title='Horizontal Rule'
      >
        <Minus size={18} />
      </button>
    </div>
  )
}

export default function RichTextEditor({ initialContent = '', onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4',
      },
    },
  })

  // Only set initial content once when editor is first created
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent, false)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
      const html = editor.getHTML()
      if (typeof onChange === 'function') onChange(html)
    }

    editor.on('update', handleUpdate)
    handleUpdate()

    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor, onChange])

  return (
    <div className='w-full h-screen flex flex-col bg-gray-100 overflow-hidden'>
      <div className='flex-1 overflow-hidden flex flex-col  bg-white rounded-lg'>
        <MenuBar editor={editor} />
        <div className='flex-1 overflow-y-auto'>
          <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          min-height: 100%;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror h2 {
          font-size: 1.17em;
          font-weight: bold;
          margin-top: 0.75em;
          margin-bottom: 0.75em;
        }
        .ProseMirror h3 {
          font-size: 1em;
          font-weight: bold;
          margin-top: 0.83em;
          margin-bottom: 0.83em;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 2em;
          margin: 1em 0;
        }
        .ProseMirror li {
          margin: 0.5em 0;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #4b5563;
          background: #f9fafb;
          padding: 1em;
          border-radius: 4px;
        }
        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #dc2626;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        .ProseMirror a:hover {
          color: #2563eb;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1em 0;
          overflow: hidden;
          border-radius: 4px;
        }
        .ProseMirror table td,
        .ProseMirror table th {
          border: 2px solid #d1d5db;
          padding: 0.5em;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror table th {
          background-color: #f3f4f6;
          font-weight: bold;
          text-align: left;
        }
        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2em 0;
        }
        .ProseMirror p {
          margin: 0.2em 0;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
