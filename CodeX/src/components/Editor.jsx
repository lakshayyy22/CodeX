import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";

function Editor({ setEditor, roomId }) {
  const [ydoc] = useState(() => new Y.Doc());

  useEffect(() => {
    const p = new WebsocketProvider("ws://localhost:1234", roomId, ydoc);

    return () => p.destroy();
  }, [roomId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  });

  useEffect(() => {
    if (editor) setEditor(editor);
  }, [editor]);

  if (!editor) return <div className="editor">Loading...</div>;

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;