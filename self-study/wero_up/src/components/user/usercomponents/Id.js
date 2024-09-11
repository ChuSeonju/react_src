const Id = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="id">아이디 </label>
      <input id="id" name="id" type="text" onChange={onChange} required />
    </div>
  );
};

export default Id;
