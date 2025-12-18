import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    if (!title) return;
    document.title = `ImportExportHub | ${title}`;
  }, [title]);
}
