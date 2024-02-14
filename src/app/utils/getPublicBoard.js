export const getPublicBoard = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task-board/public/`,
    {
      next: { revalidate: 10 },
    }
  );

  return res.json();
};
export const getBoardById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task-board/public/${id}/`,
    {
      next: { revalidate: 10 },
    }
  );

  return res.json();
};
