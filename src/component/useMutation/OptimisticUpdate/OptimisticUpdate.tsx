import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, patchUpdateLike } from "src/api";
import { KEY_PROFILE } from "src/utils/queryKey";

type IProfile = {
  id: number;
  name: string;
  like: number;
  comment: string;
};

// 낙관적 업데이트
// 좋아요나 댓글 업로드 같은 에러가 나도 크리티컬 하지 않는 요청에 한해서 사용
function OptimisticUpdate() {
  const queryClient = useQueryClient();
  const { data } = useQuery<IProfile>(KEY_PROFILE, getUserProfile);
  const { mutate } = useMutation(patchUpdateLike, {
    onMutate: async () => {
      // 쿼리의 중복 실행이나 예상치 못한 패칭으로 사용자가 잘못된 데이터를 보는 것을 방지하기 위한 cancelQueries
      await queryClient.cancelQueries({ queryKey: KEY_PROFILE });
      const prevLike = queryClient.getQueryData<IProfile>(KEY_PROFILE);

      if (prevLike) {
        const data: IProfile = {
          ...prevLike,
          like: prevLike.like + 1,
        };
        queryClient.setQueryData<IProfile>(KEY_PROFILE, data);
      }
    },
    onError: () => {
      // 에러가 날 시 낙관적 업데이트가 된 부분을 원복해주는 로직
      const prevLike = queryClient.getQueryData<IProfile>(KEY_PROFILE);

      if (prevLike) {
        queryClient.setQueryData<IProfile>(KEY_PROFILE, {
          ...prevLike,
          like: prevLike.like - 1,
        });
      }
    },
  });

  const handleClick = () => {
    if (data) {
      const like = data.like + 1;
      mutate(like);
    }
  };

  return (
    <div>
      <div>{data?.name}</div>
      <div>
        <span>{data ? data.like : "loading..."}</span>
        <button onClick={handleClick}>like</button>
      </div>
    </div>
  );
}

export default OptimisticUpdate;
