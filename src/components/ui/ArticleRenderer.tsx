'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export const ArticleRenderer = ({ content }: any) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  return <EditorContent editor={editor} />
}
