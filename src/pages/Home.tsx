import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import homeService from "../services/homeService";

function Home() {
  const [stores, setStores] = useState<any[]>([]); // Store as an array of stores
  const [selectedStore, setSelectedStore] = useState<string>('Selected Store'); // Store selected store name
  const [id, setId] = useState<number | null>(null);
  const isFirstRender = useRef(true);

  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const savedId = parseInt(localStorage.getItem("id") || "0");
    setId(savedId);
  }, []); 

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Username"; 
    setUsername(savedUsername);

    if (id && id !== 0 && isFirstRender.current) {
      console.log(localStorage.getItem("username"));
      isFirstRender.current = false; 
      getStoreByUserId();
    } else if (id === 0) {
      console.error("missing Id");
    }
  }, [id]); 

  const getStoreByUserId = async () => {
    try {
      const result = await homeService.getStore(id!);
      console.log(result);

      if (Array.isArray(result)) {
        setStores(result); 
      } else {
        console.error("The response is not an array of stores", result);
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const handleSelectedStore = (storeName: string) => {
    setSelectedStore(storeName);
    const selectedStore = stores.find(store => store.store_name === storeName);

    if (selectedStore) {
      localStorage.setItem("store_id", selectedStore.id.toString());
    }

  };

  return (
    <>
      <Navbar stores={stores} selectedStore={selectedStore} handleSelectedStore={handleSelectedStore} username={username}/>
    </>
  );
}

export default Home;
