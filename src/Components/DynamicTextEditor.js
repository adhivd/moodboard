import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
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
import numlist from '../content/img/toolbar/num-list.png';
import bulletList from '../content/img/toolbar/bullet-list.png';
import aligncenter from '../content/img/toolbar/align-center.png';
import alignright from '../content/img/toolbar/align-right.png';
import alignleft from '../content/img/toolbar/align-left.png';



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
		textAlign: 'left',
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
	let readOnly = true;

	const [font, setFont] = React.useState('');

	if(props.isEditable) {
		textStyle.zIndex = 0;
		readOnly = false;
		toolbar = (<div className={"DynamicTextEditorToolbar"} style={toolBarStyle}> 
				<MarkButton format="bold" icon={bold} />
				<MarkButton format="italic" icon={italic} />
				<MarkButton format="underline" icon={underline} />
				<MarkButton format="code" icon={code} />
				<BlockButton format="heading-one" icon={h1} />
				<BlockButton format="heading-two" icon={h2} />
				<BlockButton format="block-quote" icon={quote} />
				<BlockButton format="numbered-list" icon={numlist} />
				<BlockButton format="bulleted-list" icon={bulletList} />
				<FontBlockButton format="font-select" icon={bold} setFont={setFont} />
		</div>);
	}

	// if there is textContent already stored, use that instead of initial value (i.e. copy pasted block)
	const [value, setValue] = useState(props.textContent ? props.textContent : initialValue)
	
	// send changes up to Canvas on text change
	useEffect(() => {
		props.updateTextContent(props.uuidkey, value);
	}, [value]);

	useEffect(() => {
		console.log("is my font changing: ", font);
	}, [font]);

	console.log("font before render element: ", font);
	const renderElement = useCallback((props) => {console.log("font before literal elemet: ", font); return <Element {...props} font={font} />}, [font])
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
				placeholder="Enter some text..."
				spellCheck
				autoFocus
				readOnly={readOnly}
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

const toggleFontBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format)

	const isList = LIST_TYPES.includes(format)
  
	console.log("this happened", editor, format)
	Transforms.unwrapNodes(editor, {
	  match: n =>
		!Editor.isEditor(n) &&
		SlateElement.isElement(n) &&
		LIST_TYPES.includes(n.type),
	  split: true,
	})

	const newProperties = {
		type: format,
	}
  
	Transforms.setNodes(editor, newProperties)
  
	if (!isActive && isList) {
	  const block = { type: format, children: [] }
	  Transforms.wrapNodes(editor, block)
	}
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  console.log("this happened", editor, format)
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

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
	const block = { type: format, children: [] }
	Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  console.log("active:", isActive)

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

const Element = ({ attributes, children, element, font}) => {
	console.log("element props: ", font);
	// console.log("FONT STATE: ", this.props.font);
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
		console.log("what is children here: ", children);
		console.log("number attributes: ", attributes);
		console.log("number element: ", element);
	  return <ol {...attributes}>{children}</ol>
	case 'font-select':
		console.log("what is children for font select: ", children);
		console.log("font attributes: ", attributes);
		console.log("font element: ", element);
		return <span {...attributes} style={{"font-family": font}}>{children}</span>
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
		console.log("regular block event: ", event);
		event.preventDefault()
		toggleBlock(editor, format)
	  }}
	>
	  <img src={icon} />
	</button>
  )
}

const handleSelectChange = (event, editor, format, setFont) => {
	console.log("select on change: ", event.target.value);
	event.preventDefault()
	setFont(event.target.value);
	toggleFontBlock(editor, format)
};

const FontBlockButton = ({format, icon, setFont}) => {
	const editor = useSlate()
	console.log("format editor: ", editor);
	console.log("what is format: ", format);
	return (
	<select name="fonts" id="fonts"
		onChange={(event) => handleSelectChange(event, editor, format, setFont)}
		active={isBlockActive(editor, format)}
	>
		<option value="Arial">Arial</option>
		<option value="Georgia">Georgia</option>
		<option value="mercedes">Mercedes</option>
		<option value="Times New Roman">Times New Roman</option>
	</select>
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
	  { text: 'This is' },
	  { text: ' editable ', italic: true },
	  { text: 'rich', bold: true },
	  { text: ' text!' },
	],
  }
]

export default DynamicTextEditor;