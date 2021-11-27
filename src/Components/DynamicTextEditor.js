import React, { useCallback, useMemo, useState, useRef } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import bold from '../content/img/toolbar/bold.png';
import italic from '../content/img/toolbar/italic.png';
import underline from '../content/img/toolbar/underline.png';
import code from '../content/img/toolbar/code.png';
import h1 from '../content/img/toolbar/h1.png';
import h2 from '../content/img/toolbar/h2.png';
import quote from '../content/img/toolbar/quote.png';
// import lineitem from '../content/img/toolbar/lineitem.png';
// import bulletitem from '../content/img/toolbar/bulletitem.png';


import { withHistory } from 'slate-history'
// import { Button, Icon, Toolbar } from '../components'
// 
// Hopefully Dynamic Text v2
// 

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const DynamicTextEditor = (props) => {

	let textStyle = {
		position: 'absolute',
		top: props.top, // bc of borders on rect
		left: props.left,
		width: props.width,
		height: props.height,
		fontFamily: 'Helvetica, sans-serif',
		display: 'inline-block',
		border: '1px solid transparent',
		transform: 'rotate(' + props.rotateAngle + 'deg)',
		zIndex: -1,
		padding: 0,
		margin:0,
	}

	let toolBarStyle = {
		position: 'absolute',
		top: props.top - 50,
		left: props.left,
	}

	let toolbar;

	if(props.isFocused) {
		toolbar = (<div className={"DynamicTextEditorToolbar"} style={toolBarStyle}> 
				<MarkButton format="bold" icon={bold} />
				<MarkButton format="italic" icon={italic} />
				<MarkButton format="underline" icon={underline} />
				<MarkButton format="code" icon={code} />
				<BlockButton format="heading-one" icon={h1} />
				<BlockButton format="heading-two" icon={h2} />
				<BlockButton format="block-quote" icon={quote} />
				<BlockButton format="numbered-list" icon="format_list_numbered" />
				<BlockButton format="bulleted-list" icon="format_list_bulleted" />
		</div>);
	}

	if(props.isEditable) {
		textStyle.zIndex = 0;
	}

	const [value, setValue] = useState(initialValue)
	const renderElement = useCallback(props => <Element {...props} />, [])
	const renderLeaf = useCallback(props => <Leaf {...props} />, [])
	const editorRef = useRef()
	if (!editorRef.current) editorRef.current = withReact(createEditor())
	const editor = editorRef.current

	return (
		<Slate editor={editor} value={value} onChange={value => setValue(value)}>
			{toolbar}
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder="Enter some rich text…"
				spellCheck
				autoFocus
				className={"textEditor"}
				style={textStyle}
				onKeyDown={event => {
				for (const hotkey in HOTKEYS) {
					if (isHotkey(hotkey, event)) {
					event.preventDefault()
					const mark = HOTKEYS[hotkey]
					toggleMark(editor, mark)
					}
				}
				}}
			/>
		</Slate>
	)
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
	match: n =>
	  !Editor.isEditor(n) &&
	  SlateElement.isElement(n) &&
	  LIST_TYPES.includes(n.type),
	split: true,
  })
  const newProperties = {
	type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
	const block = { type: format, children: [] }
	Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
	Editor.removeMark(editor, format)
  } else {
	Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
	at: Editor.unhangRange(editor, selection),
	match: n =>
	  !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
	case 'block-quote':
	  return <blockquote {...attributes}>{children}</blockquote>
	case 'bulleted-list':
	  return <ul {...attributes}>{children}</ul>
	case 'heading-one':
	  return <h1 {...attributes}>{children}</h1>
	case 'heading-two':
	  return <h2 {...attributes}>{children}</h2>
	case 'list-item':
	  return <li {...attributes}>{children}</li>
	case 'numbered-list':
	  return <ol {...attributes}>{children}</ol>
	default:
	  return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
	children = <strong>{children}</strong>
  }

  if (leaf.code) {
	children = <code>{children}</code>
  }

  if (leaf.italic) {
	children = <em>{children}</em>
  }

  if (leaf.underline) {
	children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
	<button
	  active={isBlockActive(editor, format)}
	  onMouseDown={event => {
		event.preventDefault()
		toggleBlock(editor, format)
	  }}
	>
	  <img src={icon} />
	</button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
	<button
	  active={isMarkActive(editor, format)}
	  onMouseDown={event => {
		event.preventDefault()
		toggleMark(editor, format)
	  }}
	>
	  <img src={icon} />
	</button>
  )
}

const initialValue = [
  {
	type: 'paragraph',
	children: [
	  { text: 'This is editable ' },
	  { text: 'rich', bold: true },
	  { text: ' text, ' },
	  { text: 'much', italic: true },
	  { text: ' better than a ' },
	  { text: '<textarea>', code: true },
	  { text: '!' },
	],
  },
  {
	type: 'paragraph',
	children: [
	  {
		text:
		  "Since it's rich text, you can do things like turn a selection of text ",
	  },
	  { text: 'bold', bold: true },
	  {
		text:
		  ', or add a semantically rendered block quote in the middle of the page, like this:',
	  },
	],
  },
  {
	type: 'block-quote',
	children: [{ text: 'A wise quote.' }],
  },
  {
	type: 'paragraph',
	children: [{ text: 'Try it out for yourself!' }],
  },
]

export default DynamicTextEditor;