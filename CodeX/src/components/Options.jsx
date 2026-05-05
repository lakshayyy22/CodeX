import html2pdf from "html2pdf.js";

function Options({ editor }) {
  if (!editor) return null;  

  
  function downloadPDF() {
    const element = document.querySelector(".ProseMirror");

    if (!element) {
      alert("Editor not found!");
      return;
    }

    // clone element (important)
    const clone = element.cloneNode(true);

    // force styles for PDF
    clone.style.background = "white";
    clone.style.color = "black";
    clone.style.padding = "20px";
    clone.style.width = "800px";

    document.body.appendChild(clone);

    const opt = {
      margin: 10,
      filename: "document.pdf",
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
      },
    };

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        document.body.removeChild(clone);
      });
  }

  return (
    <div className="toolbar">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>

      <button onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </button>

      <button onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </button>
      <button onClick={downloadPDF}>⬇ Download PDF</button>
    </div>
  );
}

export default Options;