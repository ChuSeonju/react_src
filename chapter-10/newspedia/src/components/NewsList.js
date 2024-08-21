import "./NewsList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function NewsListItem({ item, onDelete }) {
  const { aid, img, title, rating, date, content } = item;
  const handleDeleteClick = () => {
    onDelete(aid);
  };
  return (
    <div className="NewsListItem">
      <img className="NewsListItem-img" src={img} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{formatDate(date)}</p>
        <p>{content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function NewsList({ items, onDelete }) {
  //console.log(items);
  return (
    <ul className="NewsList">
      {items.map((item) => {
        return (
          <li key={item.aid}>
            <NewsListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default NewsList;
