import { useEffect, useRef, useState } from 'react';

function FileInput({ name, value, initialPreview, onChange }) {
  // 이미지 파일 미리보기
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    //console.log(e.target.files);
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
    //Clean Up
    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div>
      <img
        className="NewsListItem-img"
        src={preview}
        alt="이미지 미리보기"
        width="250"
      />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jfif, image/webp"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
