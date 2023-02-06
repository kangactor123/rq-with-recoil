import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRepositories } from "src/api";
import { IRepository } from "src/utils/type";
import { Card, Target, Wrapper } from "./style";

export default function InfiniteScroll() {
  const targetRef = useRef<HTMLDivElement>(null);

  // 무한스크롤을 구현하는데 사용하는 useInfiniteQuery
  const { data, fetchNextPage } = useInfiniteQuery<
    IRepository,
    Error,
    IRepository,
    [string]
  >(
    ["github_repo"],
    async ({ pageParam = 1 }) => {
      return await fetchRepositories(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = lastPage.total_count / 30; //한번에 30개의 레포지토리
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
      retry: false, // 여러번 패칭을 통해 리소스 낭비하는 현상을 방지
    }
  );

  const observerCallback = useCallback(() => {
    if (targetRef.current) {
      console.log("fetch");
      fetchNextPage();
    }
  }, [targetRef, fetchNextPage]);

  const observer = useMemo(() => {
    return new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
  }, [observerCallback]);

  // useEffect 를 통해서 target 을 감지
  useEffect(() => {
    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [targetRef, observer]);

  return (
    <Wrapper>
      {data?.pages.map((page, index) => (
        <ul key={index}>
          {page.items.map((repo) => (
            <Card key={repo.id}>
              <h3>{repo.name}</h3>
              <div>
                owner: <span>{repo.owner.id}</span>
                <br />
                archive url: <span>{repo.archive_url}</span>
              </div>
            </Card>
          ))}
        </ul>
      ))}
      <Target ref={targetRef} />
    </Wrapper>
  );
}
