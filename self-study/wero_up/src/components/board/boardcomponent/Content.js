import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Content({
  value,
  placeholder,
  setEditorHtml,
  modules,
  ref,
  onChange,
  theme,
  style,
  ...rest
}) {
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];

  return (
    <div>
      <ReactQuill
        {...rest}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // theme={theme}
        modules={modules}
        formats={formats}
        style={style}
        preserveWhitespace
      />
    </div>
  );
}

export default Content;
