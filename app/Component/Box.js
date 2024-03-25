export default function Box({ children }) {
  return (
    <>
      <div className="container-main mx-auto borderck w-screen p-10">
        {children}
      </div>
    </>
  );
}
