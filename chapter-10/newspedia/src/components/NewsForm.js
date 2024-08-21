import { useState } from "react";
import { createNews } from "../api";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./NewsForm.css";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function NewsForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  // 비제어요소
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // 제어요소에는 value값 존재
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    // 중요 : 이미지 파일 존재 시에만
    if (values.imgFile) {
      formData.append("imgFile", values.imgFile);
    }

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true); // 등록중
      result = await onSubmit(formData); // 키포인트:  createNews, updateNews
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    const news = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(news);
  };

  return (
    <form className="NewsForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />

      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      {onCancel && <button onClick={onCancel}>취소</button>}
      <button disabled={isSubmitting} type="submit">
        등록
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default NewsForm;
