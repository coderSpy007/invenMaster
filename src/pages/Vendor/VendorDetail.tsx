import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import vendorService from "../../services/vendorService"; 

function VendorDetail() {
  const [vendorCode, setVendorCode] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [responseCode, setResponseCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  const storeId: number = parseInt(localStorage.getItem("store_id") || "0");

  const handleSave = async () => {
    try {
      const id = state?.vendor?.id ?? null;
      const response: any = await vendorService.saveVendor(id, vendorCode, vendorName, address, email, phoneNumber, storeId);

      console.log(response)
      if(response.code == "success")
      {
        setMessage("Save Success")
        setResponseCode(response.code)
      }
      else 
      {
        setMessage("Save Failed")
        setResponseCode(response.code)
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error saving vendor:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if(responseCode == "success")
    {
      navigate("/vendor"); 
    }
  };

  const handleEditVendor = () => {
    if(state) {
      console.log(state);
      setVendorCode(state.vendor.vendorCode);
      setVendorName(state.vendor.vendorName);
      setAddress(state.vendor.address);
      setEmail(state.vendor.email);
      setPhoneNumber(state.vendor.phoneNumber);
    }
  }
  
  useEffect(() => {
    handleEditVendor();
    }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-[4rem] px-[2rem]">
        <div className="bg-white flex flex-col w-full md:w-[50rem] h-auto rounded-lg px-[2rem] py-6">
        
          <div className="flex justify-between mb-[1rem]">
          <h1 className="font-bold text-lg">Add Vendor</h1>
            <button
              onClick={handleSave}
              className="bg-blue border-2 border-transparent text-white px-3 py-1 w-[5rem] rounded hover:bg-transparent hover:border-blue hover:border-2 hover:text-blue"
            >
              Save
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-[2rem] mb-[2rem]">
            <input
              type="text"
              placeholder="Vendor Code"
              value={vendorCode}
              onChange={(e) => setVendorCode(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem] mb-4 sm:mb-0"
            />
            <input
              type="text"
              placeholder="Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem]"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-[2rem] mb-[2rem]">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem] mb-4 sm:mb-0"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem]"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-[2rem] mb-[2rem]">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                const number = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                setPhoneNumber(number)}
              }
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem] mb-4 sm:mb-0"
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">{message}</h2>
          <button
            onClick={() => handleModalClose()}
            className="bg-blue text-white border-2 border-transparent px-6 py-2 rounded hover:bg-transparent hover:border-blue hover:text-blue"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default VendorDetail;
