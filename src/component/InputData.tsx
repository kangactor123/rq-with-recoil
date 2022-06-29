import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { patchProjectId } from "../common/api";
import { projectId } from "../common/atom";
import { queryInvalidate } from "../common/helper";
import { KEY_PROJECT_ID } from "../common/key";

const Wrapper = styled.div`
  margin-top: 30px;
`;

function InputData() {
  const [val, setVal] = useState(0);
  const setProjectId = useSetRecoilState(projectId);

  const { mutate, isSuccess } = useMutation(patchProjectId, {
    onSuccess: () => queryInvalidate(KEY_PROJECT_ID),
  });

  const handleChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
    setVal(+event.currentTarget.value);
  };

  const handleChangeId = () => {
    mutate(val);

    if (isSuccess) {
      setProjectId(val);
    }
  };

  return (
    <Wrapper>
      <input value={val} onChange={handleChangeValue} />
      <button onClick={handleChangeId}>Change Id</button>
    </Wrapper>
  );
}

export default InputData;
