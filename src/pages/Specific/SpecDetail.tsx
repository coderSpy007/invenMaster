import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import specService from "../../services/specService";
import Dropdown from "../../components/Dropdown";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";

function SpecDetail() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [specValue, setSpecValue] = useState("");
  const [responseCode, setResponseCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [categoryId, setCategoryId] = useState<any>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const [selectedValue, setSelectedValue] = useState<any>();

  // const options = [
  //   { value: 1, text: "Option 1" },
  //   { value: 2, text: "Option 2" },
  //   { value: 3, text: "Option 3" },
  // ];

  const handleSave = async () => {
    try {
      const id = state?.spec?.id ?? null;
      const response: any = await specService.saveSpec(
        id,
        selectedCategoryId,
        specValue
      );

      console.log(id, selectedCategoryId, specValue)

      if (response.code === "success") {
        setMessage("Save Success");
        setResponseCode(response.code);
      } else {
        setMessage("Save Failed");
        setResponseCode(response.code);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error saving spec:", error);
    }
  };

  const getCategoryId = async () => {
      try {
        const response: any = await specService.getCategoryId();
        setCategoryId(response);
        console.log(response)
        console.log(categoryId)
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (responseCode === "success") {
      navigate("/spec");
    }
  };

  const handleEditSpec = () => {
    if (state) {
      console.log(state)
      setSelectedCategoryId(state.spec.categoryId);
      setSelectedValue(state.spec.categoryName)
      setSpecValue(state.spec.specValue);
    }
  };

  const handleDropdownChange = (value: any) => {
    const selectedCategory = categoryId.find((id: any) => id.value === value); 
    if (selectedCategory) {
      setSelectedValue(selectedCategory.text); 
    }
    setSelectedCategoryId(value);
    console.log("Category Id", value); 
  };

  useEffect(() => {
    getCategoryId();
    handleEditSpec();
  }, []);

  // useEffect(() => {
  //   console.log("Updated categoryId:", categoryId);
  // }, [categoryId]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-[4rem] px-[2rem]">
        <div className="bg-white flex flex-col w-full md:w-[50rem] h-auto rounded-lg px-[4rem] py-6">
          <div className="flex justify-between mb-[1rem]">
            <h1 className="font-bold text-lg">Add Specific</h1>
            <button
              onClick={handleSave}
              className="bg-blue border-2 border-transparent text-white px-3 py-1 w-[5rem] rounded hover:bg-transparent hover:border-blue hover:border-2 hover:text-blue"
            >
              Save
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-center gap-[1rem] sm:gap-[2rem] mb-[2rem]">
            <Dropdown
              value={selectedValue}
              onChange={handleDropdownChange}
              options={categoryId}
            />
            <input
              type="text"
              placeholder="Specific Value"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
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

export default SpecDetail;
