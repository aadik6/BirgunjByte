import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./tinyEditor.css";

interface TinyEditorProps {
  content: string; // Initial content for the editor
  setContent: (value: string) => void; // Callback to update content
  disabled?: boolean; // Whether the editor is disabled
  config?: object; // Additional TinyMCE configuration
  menuBar?: boolean; // Whether to show the menu bar
  Height?: number; // Height of the editor
}

const TinyEditor: React.FC<TinyEditorProps> = ({
  content,
  setContent,
  disabled = false,
  menuBar,
  config = {},
  Height = 150, // Default height
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <Editor
      value={content}
      onEditorChange={handleEditorChange}
      apiKey="q1r68jm37hbv18xe25cc689bcttxm6v7so24ycueyam14i1l"
      init={{
        // skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
        // content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
        placeholder: "बिस्तार मा लेख्नु होस.....",
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until May 9, 2025:
          // "checklist",
          // "mediaembed",
          // "casechange",
          // "formatpainter",
          // "pageembed",
          // "a11ychecker",
          // "tinymcespellchecker",
          // "permanentpen",
          // "powerpaste",
          // "advtable",
          // "advcode",
          // "editimage",
          // "advtemplate",
          // "mentions",
          // "tinycomments",
          // "tableofcontents",
          // "footnotes",
          // "mergetags",
          // "autocorrect",
          // "typography",
          // "inlinecss",
          // "markdown",
          // "importword",
          // "exportword",
          // "exportpdf",
        ],

        // blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags  | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat
        toolbar:
          "pramukhime |undo redo |",
        ...config,
        height: Height,
        external_plugins: {
          pramukhime: "/plugins/pramukhime/plugin.js",
        },
        menubar: menuBar,
        pramukhime_options: {
          // languages: [
          //   { text: "Nepali", value: "pramukhindic:nepali" },
          //   { text: "English", value: "pramukhime:english" },
          // ],
          selected_value: "pramukhindic:nepali",
          toggle_key: {
            key: 119, // F8 key
            ctrl: false,
            alt: false,
            title: "F8",
          },
        },
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
      }}
      disabled={disabled}
      onInit={(_, editor) => (editorRef.current = editor)}
    />
  );
};

export default TinyEditor;
