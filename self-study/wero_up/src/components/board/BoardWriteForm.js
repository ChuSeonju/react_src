import Title from "./boardcomponent/Title";
import NickName from "../user/usercomponents/NickName";
import Date from "./boardcomponent/Date";
import View from "./boardcomponent/View";
import Content from "./boardcomponent/Content";
import Button from "../Button";
import Comment from "./boardcomponent/Comment";
import { Quill } from "react-quill";
import { useState, useEffect, useRef } from "react";
// import ImageResize from "quill-image-resize-module-react";

function BoardWriteForm({ board, value, placeholder, ...rest }) {
  // const handleClick = () => {
  //   alert("ok");
  // };

  const handleChange = () => {
    console.log("changed");
  };

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize", "Toolbar"],
    // },
  };

  const [editorHtml, setEditorHtml] = useState(value || "");
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", imageHandler);
    }
  }, []);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  };

  const { nickname, title, date, content, view, comment } = board;

  return (
    <>
      <Title />
      <NickName />
      <Date />
      <label id="view">view</label>
      <View id="view" />
      <Content
        {...rest}
        ref={quillRef}
        placeholder="내용을 입력해주세요."
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        style={{ height: "300px" }}
        preserveWhitespace
      />
      <Comment />
      <Button>Upload</Button>
    </>
  );
}

export default BoardWriteForm;
