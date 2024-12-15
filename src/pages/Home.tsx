function Home() {
  const id = localStorage.getItem("id");
  if (id !== null) {
    const userId = Number(id);
  }
  
  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Home
