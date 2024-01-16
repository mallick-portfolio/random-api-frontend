import Header from "../components/shared/Header";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
