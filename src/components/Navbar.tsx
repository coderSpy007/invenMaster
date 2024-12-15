import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface NavbarProps {
  stores: any[]; 
  selectedStore: string; 
  handleSelectedStore: (storeName: string) => void; 
  username: string;
}

function Navbar({ stores, selectedStore, handleSelectedStore, username }: NavbarProps) {
  const [storeToggle, setStoreToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);

  const toggleStoreDropdown = () => {
    setStoreToggle(!storeToggle);
    setUserToggle(false);
  };

  const toggleUserDropdown = () => {
    setUserToggle(!userToggle);
    setStoreToggle(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center gap-[4rem] mt-[3rem] bg-white h-[3rem] w-auto rounded-[1rem] px-[3rem]">
          <p>Home</p>
          <div className="flex gap-[2rem]">
            <p>Category</p>
            <p>Product</p>
            <p>Purchase</p>
            <p>Sale</p>
            <p>Vendor</p>
          </div>

          <div className="flex gap-[1rem]">
            <div className="flex space-x-4 cursor-pointer" onClick={toggleStoreDropdown}>
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
                          onClick={() => handleSelectedStore(store.store_name)}
                        >
                          {store.store_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 cursor-pointer" onClick={toggleUserDropdown}>
              <div className="relative">
                <div className="flex items-center">
                  <p>{username || "Default"}</p>
                  <RiArrowDropDownLine className="text-[2rem]" />
                </div>
                
                {userToggle && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[7rem]">
                    <ul className="p-2">
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
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
