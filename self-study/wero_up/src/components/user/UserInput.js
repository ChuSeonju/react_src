import NickName from "./usercomponents/NickName";
import ID from "./usercomponents/Id";
import Password from "./usercomponents/Password";
import Email from "./usercomponents/Email";
import Address from "./usercomponents/Address";

const UserInput = () => {
  return (
    <div>
      <label>이름</label>
      <input type="text" />
      <NickName />
      <label>생년월일</label>
      <input type="text" />
      <ID />
      <Password />
      <Email />
      <Address />
      <label>핸드폰 번호</label>
      <input type="text" />
    </div>
  );
};

export default UserInput;
