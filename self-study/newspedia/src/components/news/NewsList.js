// components/news/NewsList.js

import { useState } from "react";
import Rating from "./Rating";
import NewsForm from "./NewsForm";
import "../../stylesheet/NewsList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function NewsListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => onDelete(item.aid);
  const { img, title, rating, date, content } = item;

  const handleEditClick = () => onEdit(item.aid);

  return (
    <div className="NewsListItem">
      <img className="NewsListItem-img" src={img} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{formatDate(date)}</p>
        <p>{content}</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function NewsList({ items = [], onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="NewsList">
      {items.map((item) => {
        if (item.aid === editingId) {
          const { aid, img, title, rating, content } = item;
          const initialValues = { title, rating, content, imgFile: null };

          const handleSubmit = (formData) => onUpdate(aid, formData);

          const handleSubmitSuccess = (news) => {
            onUpdateSuccess(news);
            setEditingId(null);
          };

          return (
            <li key={item.aid}>
              <NewsForm
                initialValues={initialValues}
                initialPreview={img}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }

        return (
          <li key={item.aid}>
            <NewsListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default NewsList;
