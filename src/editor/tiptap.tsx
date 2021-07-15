import React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import './tiptap.scss'
import { Box, Button, ButtonGroup, Divider, Icon, IconButton } from '@chakra-ui/react'
import { MdFormatBold, MdFormatAlignLeft, MdFormatAlignRight, MdFormatAlignCenter, MdFormatAlignJustify, MdFormatItalic, MdRedo, MdFormatStrikethrough, MdUndo, MdFormatClear, MdFormatListBulleted, MdFormatListNumbered, MdRemove } from 'react-icons/md'

const MenuBar = (args: { editor: Editor | null }) => {
  const editor = args.editor
  if (!editor) {
    return null
  }

  return (
    <>
      <ButtonGroup>
        <ButtonGroup variant="ghost" isAttached>
          <IconButton
            borderRadius={0}
            aria-label="toggle bold"
            icon={<Icon w={5} h={5} as={MdFormatBold} />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          />
          <IconButton
            borderRadius={0}
            aria-label="toggle italic"
            icon={<Icon w={5} h={5} as={MdFormatItalic} />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          />
          <IconButton
            borderRadius={0}
            aria-label="toggle strike"
            icon={<Icon w={5} h={5} as={MdFormatStrikethrough} />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          />
        </ButtonGroup>
        <Divider orientation="vertical" h="40px" />
        <IconButton
          borderRadius={0}
          variant="ghost"
          aria-label="clear format"
          icon={<Icon w={5} h={5} as={MdFormatClear} />}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        />
        <Divider orientation="vertical" h="40px" />
        <ButtonGroup variant="ghost" isAttached>
          <IconButton
            borderRadius={0}
            aria-label=""
            icon={<Icon w={5} h={5} as={MdFormatListBulleted} />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          />
          <IconButton
            borderRadius={0}
            aria-label=""
            icon={<Icon w={5} h={5} as={MdFormatListNumbered} />}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          />
        </ButtonGroup>
        <Divider orientation="vertical" h="40px" />
        <ButtonGroup variant="ghost" isAttached>
          <IconButton
            borderRadius={0}
            aria-label="align left"
            icon={<Icon w={5} h={5} as={MdFormatAlignLeft} />}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
          />
          <IconButton
            borderRadius={0}
            aria-label="align center"
            icon={<Icon w={5} h={5} as={MdFormatAlignCenter} />}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
          /><IconButton
            borderRadius={0}
            aria-label="align right"
            icon={<Icon w={5} h={5} as={MdFormatAlignRight} />}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
          />
          <IconButton
            borderRadius={0}
            aria-label="align justify"
            icon={<Icon w={5} h={5} as={MdFormatAlignJustify} />}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
          />
        </ButtonGroup>
        <Divider orientation="vertical" h="40px" />
        <ButtonGroup variant="ghost" isAttached>
          <Button
            borderRadius={0}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
          >
            제목
          </Button>
          <Button
            borderRadius={0}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          >
            부제목
          </Button>
          <Button
            borderRadius={0}
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
          >
            일반
          </Button>
        </ButtonGroup>
        <Divider orientation="vertical" h="40px" />
        <IconButton
          borderRadius={0}
          variant="ghost"
          aria-label="horizontal line"
          icon={<Icon w={5} h={5} as={MdRemove} />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <Divider orientation="vertical" h="40px" />
        <ButtonGroup variant="ghost" isAttached>
          <IconButton
            borderRadius={0}
            aria-label="undo"
            icon={<Icon w={5} h={5} as={MdUndo} />}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <IconButton
            borderRadius={0}
            aria-label="redo"
            icon={<Icon w={5} h={5} as={MdRedo} />}
            onClick={() => editor.chain().focus().redo().run()}
          />
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

interface IProps {
  setGetContent: (args0: () => any) => void;
}

export default (props: IProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 적어주세요...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ]
  })

  props.setGetContent(() => {
    console.log(editor?.getHTML())
    return editor?.getHTML()
  })

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="2" flex="1" display="flex" flexDirection="column">
      <MenuBar editor={editor} />
      <Divider />
      <Box mt={2} height="100%" id="editor-wrapper">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}