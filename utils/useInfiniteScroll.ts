import { RefObject, useEffect, useRef } from "react";

type Options = {
  // スクロールする要素。null なら viewport を見る
  rootRef: RefObject<HTMLElement | null>;
  // 一覧の末尾に置く要素。これが見えたら次を読む
  sentinelRef: RefObject<HTMLElement | null>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  // 末尾の手前何 px で読み始めるか
  threshold?: number;
};

// 末尾の要素がスクロール領域に入ったら loadMore を呼ぶ。読み込み中は重ねて呼ばない
export const useInfiniteScroll = ({
  rootRef,
  sentinelRef,
  hasMore,
  loadMore,
  threshold = 250,
}: Options) => {
  // observer を作り直さずに最新の loadMore を呼ぶ
  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;
  const loadingRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!hasMore || !sentinel) return;
    let disposed = false;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        try {
          await loadMoreRef.current();
        } finally {
          loadingRef.current = false;
        }
        if (disposed) return;
        // 読み込んだ後も末尾が見えたままなら、もう一度観測し直して続きを読む
        observer.unobserve(sentinel);
        observer.observe(sentinel);
      },
      {
        root: rootRef.current,
        rootMargin: `0px 0px ${threshold}px 0px`,
      }
    );
    observer.observe(sentinel);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [rootRef, sentinelRef, hasMore, threshold]);
};
