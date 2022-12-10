import React from "react";
import styled from "styled-components";

const InputBoxComponent = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  margin: 10px 0;
  input {
    width: 100%;
    height: 35px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 0;
  }
  .error {
    color: red;
    font-size: 12px;
  }
`;

function InputBox({ type, value, id, onChange }) {
  const errorMsg = value[id] && value[id].check;
  const deafultValue = value[id] && value[id].txt;
  return (
    <InputBoxComponent>
      <label>{id}</label>
      <input
        type={type}
        defaultValue={deafultValue}
        id={id}
        onChange={(e) => onChange(id, e.target.value)}
      />
      {errorMsg ? <div className="error">{errorMsg}</div> : <></>}
    </InputBoxComponent>
  );
}

export default InputBox;
