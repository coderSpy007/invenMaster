import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoryService";
import Modal from "../../components/Modal";

function Category() {
  const columns = [
    { label: "Category Code", field: "categoryCode" },
    { label: "Category Name", field: "categoryName" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<any>([]);
  const [initialCategory, setInitialCategory] = useState<any>([]);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [idDelete, setIdDelete] = useState(0);

  const navigate = useNavigate();

  const editCategory = (row: any) => {
    navigate("/category/detail", { state: { category: row } });
  };

  const getListCategory = async () => {
    try {
      const response: any = await categoryService.getListCategory();
      setCategory(response);
      setInitialCategory(response);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const deleteListCategory = async (id: number) => {
    try {
      setIsModalConfirmOpen(false); 
      
      const response: any = await categoryService.deleteListCategory(id);
      console.log(response);
  
      if (response.code === "success") {
        setMessage("Delete Success")
        setIsModalSuccessOpen(true);
      } else {
        setMessage("Delete Failed")
        setIsModalSuccessOpen(true);
        console.error("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setCategory(initialCategory);
    } else {
      const filteredData = initialCategory.filter((item: any) =>
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setCategory(filteredData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getListCategory();
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
            onClick={() => navigate("/category/detail")}
            className="bg-blue border-2 border-transparent text-white px-3 py-1 rounded hover:bg-transparent hover:border-blue hover:border-2 hover:text-blue"
          >
            Add
          </button>
        </div>

        <Table columns={columns} data={category}>
          {(row: any) => (
            <div className="flex justify-center gap-2">
              <button
                className="bg-amber-500 border-2 border-transparent text-white px-3 py-1 rounded hover:bg-transparent hover:border-amber-500 hover:text-amber-500"
                onClick={() => editCategory(row)}
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
              onClick={() => deleteListCategory(idDelete)}
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
                  getListCategory(); 
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

export default Category;
