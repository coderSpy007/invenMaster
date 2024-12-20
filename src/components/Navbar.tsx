import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import homeService from "../services/homeService"; 
interface NavbarProps {
  onStoreSelect?: (storeId: number) => void; 
}

function Navbar({ onStoreSelect }: NavbarProps) {
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("Selected Store");
  const [username, setUsername] = useState<string>("Default");
  const [productDetailToggle, setProductDetailToggle] = useState(false);
  const [storeToggle, setStoreToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);

  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Default";
    setUsername(savedUsername);

    const savedStoreName = localStorage.getItem("store_name");
    if (savedStoreName) {
      setSelectedStore(savedStoreName);
    }

    const savedId = parseInt(localStorage.getItem("id") || "0");
    if (savedId && savedId !== 0 && isFirstRender.current) {
      isFirstRender.current = false;
      getStoreByUserId(savedId);
    }
  }, []);

  const getStoreByUserId = async (userId: number) => {
    try {
      const result:any = await homeService.getStore(userId); 
      setStores(result); 
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const toggleProductDetailDropdown = () => {
    setProductDetailToggle(!productDetailToggle);
    setStoreToggle(false);
    setUserToggle(false);
  };

  const toggleStoreDropdown = () => {
    setStoreToggle(!storeToggle);
    setProductDetailToggle(false);
    setUserToggle(false);
  };

  const toggleUserDropdown = () => {
    setUserToggle(!userToggle);
    setProductDetailToggle(false);
    setStoreToggle(false);
  };

  const handleStoreSelect = (storeName: string, storeId: number) => {
    setSelectedStore(storeName);
    localStorage.setItem("store_name", storeName); 
    localStorage.setItem("store_id", storeId.toString());  
    setStoreToggle(false);
    onStoreSelect ? onStoreSelect(storeId) : null; 
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("store_name");
    localStorage.removeItem("store_id");
    navigate("/"); 
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center gap-[4rem] mt-[3rem] bg-white h-[3rem] w-auto rounded-[1rem] px-[3rem]">
          <p
            className="text-blue-500 hover:text-blue cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Home
          </p>

          <div className="flex gap-[2rem]">
            <p>Product</p>
            <p>Purchase</p>
            <p>Sale</p>
            <li className="cursor-pointer list-none" onClick={() => navigate("/vendor")}>Vendor</li>
          </div>

          <div className="flex gap-[1rem]">
            <div
              className="flex cursor-pointer"
              onClick={toggleProductDetailDropdown}
            >
              <div className="relative">
                <div className="flex items-center">
                  <p>Product Detail</p>
                  <RiArrowDropDownLine className="text-[2rem]" />
                </div>

                {productDetailToggle && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[7rem]">
                    <ul className="p-2">
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => navigate("/category")}
                      >
                        Category
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => navigate("/unit")}
                      >
                        Unit
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => navigate("/spec")}
                      >
                        Specific
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div
              className="flex space-x-4 cursor-pointer"
              onClick={toggleStoreDropdown}
            >
              <div className="relative">
                <div className="flex items-center">
                  <p>{selectedStore}</p>
                  <RiArrowDropDownLine className="text-[2rem]" />
                </div>

                {storeToggle && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[8rem]">
                    <ul className="p-2">
                      {stores.map((store) => (
                        <li
                          key={store.id}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                          onClick={() =>
                            handleStoreSelect(store.store_name, store.id)
                          }
                        >
                          {store.store_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div
              className="flex space-x-4 cursor-pointer"
              onClick={toggleUserDropdown}
            >
              <div className="relative">
                <div className="flex items-center">
                  <p>{username}</p>
                  <RiArrowDropDownLine className="text-[2rem]" />
                </div>

                {userToggle && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[7rem]">
                    <ul className="p-2">
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
