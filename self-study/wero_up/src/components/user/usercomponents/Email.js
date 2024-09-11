const Email = ({ name, onChange }) => {
  return (
    <div>
      <label name={name} htmlFor="email">
        이메일{" "}
      </label>
      <input onChange={onChange} id="email" name="email" type="text" required />
    </div>
  );
};

export default Email;
