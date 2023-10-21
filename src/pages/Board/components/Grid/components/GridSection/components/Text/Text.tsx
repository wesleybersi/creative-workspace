import { memo, useCallback, useEffect, useRef, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./story.module.scss";

import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";

import useStore from "../../../../../../../../store/store";
import Menu from "../Menu/Menu";

import { Editor, createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";

interface Props {
  section: Section;
  isEditable: boolean;
}

const Text: React.FC<Props> = ({ section, isEditable }) => {
  const { selectedSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "left"
  );
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  // useEffect(() => {
  //   if (selectedSection === section && isEditable) {
  //     textRef.current?.focus();
  //   } else {
  //     textRef.current?.blur();
  //   }
  // }, [selectedSection, isEditable]);

  // const renderElement = useCallback((props) => {
  //   switch (props.element.type) {
  //     case "quote":
  //       return <QuoteElement {...props} />;
  //     case "link":
  //       return <LinkElement {...props} />;
  //     default:
  //       return <DefaultElement {...props} />;
  //   }
  // }, []);

  return (
    <div
      className={styles.wrapper}
      style={{ textAlign, pointerEvents: isEditable ? "all" : "none" }}
    >
      <div className={styles.content} style={{ textAlign }}>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            renderLeaf={({ attributes, children, leaf }) => {
              return (
                <span
                  {...attributes}
                  style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
                >
                  {children}
                </span>
              );
            }}
            onKeyDown={(event) => {
              console.log(event.key);
              if (!event.metaKey) return;
              const marks = Editor.marks(editor);
              if (!marks) return;
              switch (event.key) {
                case "b":
                  event.preventDefault();
                  Editor.addMark(editor, "bold", !marks?.bold);
                  break;
                case "i":
                  event.preventDefault();
                  Editor.addMark(editor, "italic", true);
                  break;
                case "u":
                  event.preventDefault();
                  Editor.addMark(editor, "underline", true);
                  break;
              }
            }}
          />
        </Slate>
        {/* <textarea
          ref={textRef}
          spellCheck="false"
          placeholder={mode === "Edit" ? "Empty text node" : ""}
          onChange={(event) => setNoteValue(event.target.value)}
          value={noteValue}
          style={{ textAlign, fontSize: "var(--font-size)" }}
        /> */}
      </div>
      {isEditable && selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Align Left",
              icon: IconAlignLeft,
              isSelected: textAlign === "left",
              onClick: () => {
                setTextAlign("left");
              },
            },
            {
              tooltip: "Align Center",
              icon: IconAlignCenter,
              isSelected: textAlign === "center",
              onClick: () => {
                setTextAlign("center");
              },
            },
            {
              tooltip: "Align Right",
              icon: IconAlignRight,
              isSelected: textAlign === "right",
              onClick: () => {
                setTextAlign("right");
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default memo(Text);
