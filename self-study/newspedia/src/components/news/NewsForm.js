import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "../../api_axios"; // 뉴스 ID로 데이터를 가져오는 함수 추가

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function NewsForm({ onSubmit, onSubmitSuccess }) {
  const { id } = useParams(); // 뉴스 ID를 URL에서 가져옴
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const news = await getNewsById(id);
          setValues({
            title: news.title,
            rating: news.rating,
            content: news.content,
            imgFile: null, // 파일은 별도로 처리
          });
        } catch (error) {
          console.error("Failed to fetch news", error);
        }
      };
      fetchNews();
    }
  }, [id]);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
    if (values.imgFile) {
      formData.append("imgFile", values.imgFile);
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      const result = await onSubmit(id, formData);
      onSubmitSuccess(result);
      navigate('/news'); // 성공 후 뉴스 목록 페이지로 이동
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="NewsForm" onSubmit={handleSubmit}>
      {/* Form Fields */}
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
      />
      {/* Add other fields similarly */}
      <button disabled={isSubmitting} type="submit">
        {id ? "수정" : "등록"}
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default NewsForm;
