const Password = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="password">비밀번호 </label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Password;
