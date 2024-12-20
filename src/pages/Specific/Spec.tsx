import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import specService from "../../services/specService";
import Modal from "../../components/Modal";

function Spec() {
  const columns = [
    { label: "Category", field: "categoryName" },
    { label: "Specific Value", field: "specValue" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [spec, setSpec] = useState<any>([]);
  const [initialSpec, setInitialSpec] = useState<any>([]);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [idDelete, setIdDelete] = useState(0);

  const navigate = useNavigate();

  const editSpec = (row: any) => {
    navigate("/spec/detail", { state: { spec: row } });
  };

  const getListSpec = async () => {
    try {
      const response: any = await specService.getListSpec();
      setSpec(response);
      setInitialSpec(response);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const deleteListSpec = async (id: number) => {
    try {
        setIsModalConfirmOpen(false); 
      
        const response: any = await specService.deleteListSpec(id);
        console.log(response);
  
      if (response.code === "success") {
        setMessage("Delete Success")
        setIsModalSuccessOpen(true);
      } else {
        setMessage("Delete Failed")
        setIsModalSuccessOpen(true);
        console.error("Failed to delete spec.");
      }
    } catch (error) {
      console.error("Error deleting spec:", error);
    }
  };
  

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSpec(initialSpec);
    } else {
      const filteredData = initialSpec.filter((item: any) =>
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSpec(filteredData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getListSpec();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mt-[4rem] flex-col">
        <div className="mb-4 flex justify-center gap-[4rem] md:gap-[30rem]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="border rounded px-4 py-2 w-64 pr-10"
            />
            <IoSearchOutline
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            />
          </div>
          <button
            onClick={() => navigate("/spec/detail")}
            className="bg-blue border-2 border-transparent text-white px-3 py-1 rounded hover:bg-transparent hover:border-blue hover:border-2 hover:text-blue"
          >
            Add
          </button>
        </div>

        <Table columns={columns} data={spec}>
          {(row: any) => (
            <div className="flex justify-center gap-2">
              <button
                className="bg-amber-500 border-2 border-transparent text-white px-3 py-1 rounded hover:bg-transparent hover:border-amber-500 hover:text-amber-500"
                onClick={() => editSpec(row)}
              >
                Edit
              </button>
              <button className="bg-red-500 border-2 border-transparent text-white px-3 py-1 rounded hover:bg-transparent hover:border-red-500 hover:text-red-500"
                onClick={() => {
                  setIdDelete(row.id);
                  setIsModalConfirmOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </Table>
      </div>

      <Modal isOpen={isModalConfirmOpen} onClose={() => setIsModalConfirmOpen(false)}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <div className="flex gap-[3rem]">
            <button
              onClick={() => deleteListSpec(idDelete)}
              className="bg-red-500 text-white border-2 border-transparent px-6 py-2 rounded hover:bg-transparent hover:border-red-500 hover:text-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => setIsModalConfirmOpen(false)}
              className="bg-blue text-white border-2 border-transparent px-6 py-2 rounded hover:bg-transparent hover:border-blue hover:text-blue"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalSuccessOpen} onClose={() => setIsModalSuccessOpen(false)}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">{message}</h2>
          <div className="flex justify-center gap-[3rem]">
            <button
              onClick={() => {
                  setIsModalSuccessOpen(false)
                  getListSpec(); 
                }
              }
              className="bg-blue text-white border-2 border-transparent px-6 py-2 rounded hover:bg-transparent hover:border-blue hover:text-blue"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      
    </>
  );
}

export default Spec;
