import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import unitService from "../../services/unitService"; 

function UnitDetail() {
  const [unitCode, setUnitCode] = useState("");
  const [unitName, setUnitName] = useState("");
  const [responseCode, setResponseCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const handleSave = async () => {
    try {
      const id = state?.unit?.id ?? null;
      const response: any = await unitService.saveUnit(id, unitCode, unitName);

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
      console.error("Error saving unit:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if(responseCode == "success")
    {
      navigate("/unit"); 
    }
  };

  const handleEditUnit = () => {
    if(state) {
      console.log(state);
      setUnitCode(state.unit.unitCode);
      setUnitName(state.unit.unitName);
    }
  }
  
  useEffect(() => {
    handleEditUnit();
    }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-[4rem] px-[2rem]">
        <div className="bg-white flex flex-col w-full md:w-[50rem] h-auto rounded-lg px-[4rem] py-6">
        
          <div className="flex justify-between mb-[1rem]">
          <h1 className="font-bold text-lg">Add Unit</h1>
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
              placeholder="Unit Code"
              value={unitCode}
              onChange={(e) => setUnitCode(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem] mb-4 sm:mb-0"
            />
            <input
              type="text"
              placeholder="Unit Name"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 h-[2.5rem]"
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

export default UnitDetail;
