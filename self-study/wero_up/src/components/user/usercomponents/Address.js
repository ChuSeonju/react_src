import { useState } from "react";
// import Button from "../../Button";
import DaumPostCode from "react-daum-postcode";

const Address = ({ name, onChange }) => {
  // const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [detail2Address, setDetail2Address] = useState("");
  // const [addDocument, setAddDocument] = useState("mannual");
  const [openPostCode, setOpenPostCode] = useState(false);

  const clickButton = () => {
    setOpenPostCode((current) => !current);
  };

  const selectAddress = (data) => {
    setDetailAddress(data.address);
    setOpenPostCode(false);
    if (onChange) {
      onChange({
        target: { name, value: `${data.address}, ${detail2Address}` },
      });
    }
  };

  const handleDetail2Change = (e) => {
    const newDetail2Address = e.target.value;
    setDetail2Address(newDetail2Address);
    if (onChange) {
      onChange({
        target: { name, value: `${detailAddress}, ${newDetail2Address}` },
      });
    }
  };

  return (
    <div>
      <label htmlFor={name}>주소 </label>
      {openPostCode && (
        <DaumPostCode autoClose={false} onComplete={selectAddress} />
      )}
      <input
        onChange={onChange}
        name={name}
        onClick={clickButton}
        value={detailAddress}
        size="50"
      />
      <br />
      <input value={detail2Address} onChange={handleDetail2Change} />
    </div>
  );
};

export default Address;
