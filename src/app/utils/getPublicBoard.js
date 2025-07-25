import config from "@/lib/config";

export const getPublicBoard = async () => {
  const res = await fetch(`${config.BASE_URL}/api/v1/task-board/public/`, {
    next: { revalidate: 10 },
  });

  return res.json();
};
export const getBoardById = async (id) => {
  const res = await fetch(`${config.BASE_URL}api/v1/task-board/public/${id}/`, {
    next: { revalidate: 10 },
  });

  return res.json();
};
