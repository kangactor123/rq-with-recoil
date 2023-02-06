import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { patchProjectId } from "src/api";
import { projectId } from "src/recoil/project";
import { KEY_PROJECT } from "src/utils/queryKey";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 30px;
`;

function InputData() {
  const [val, setVal] = useState(0);
  const queryClient = useQueryClient();
  const setProjectId = useSetRecoilState(projectId);
  const { mutate, isSuccess } = useMutation(patchProjectId, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(KEY_PROJECT)

      // setQueryData: mutation 성공 후 해당 서버 데이터를 패칭하지 않고도 데이터를 바꿔줄 수 있음
      // cached 된 쿼리의 데이터를 즉시 변경해줌
      queryClient.setQueryData(KEY_PROJECT, data);
    },
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
