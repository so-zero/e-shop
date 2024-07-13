import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditor from "./TextEditor";

interface TextBoxProps {
  setDescription: React.Dispatch<React.SetStateAction<any>>;
  description: string;
}

const TextBox: React.FC<TextBoxProps> = ({ setDescription, description }) => {
  const [focus, setFocus] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose w-full focus:outline-none leading-5 prose-a:text-gray-600 prose-a:font-semibold prose-a:no-underline",
      },
    },
    content: description,
  });

  const html = editor?.getHTML();

  useEffect(() => {
    setDescription(html);
  }, [html]);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setFocus(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={menuRef}
      className={`mx-auto border-[1px] mt-4 rounded-lg ${
        focus ? "border-gray-600 border-[2px] ml-0" : ""
      }`}
    >
      <TextEditor editor={editor} />
      <EditorContent
        editor={editor}
        style={{ padding: "18px" }}
        onClick={() => setFocus(true)}
      />
    </div>
  );
};

export default TextBox;
