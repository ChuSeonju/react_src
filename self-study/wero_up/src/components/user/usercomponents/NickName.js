const NickName = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="nickname">닉네임 </label>
      <input
        id="nickname"
        name="nickname"
        type="text"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default NickName;
