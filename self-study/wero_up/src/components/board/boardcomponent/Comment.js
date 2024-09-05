function Comment({ placeholder, value, onChange, rows, cols }) {
  return (
    <div>
      <textarea
        cols={cols}
        rows={rows}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </div>
  );
}

export default Comment;
