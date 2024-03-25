export default function Main({ children, main }) {
  return (
    <>
      <main className="w-screen  flex flex-col " main={main}>
        {children}
      </main>
    </>
  );
}
