import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Addtask from "./Addtask";

const Dashboard = () => {
  // References
  let titleref = useRef();
  let descriptionref = useRef();
  let selectref = useRef();
  let dateref = useRef();

  // React hooks
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // for search
  const [statusFilter, setStatusFilter] = useState(""); // for status filter
  const [loading, setLoading] = useState(false); // to show loading state

  // Auth
  const userstore = useSelector((state) => state.user);
  const token = userstore.token;
  const login = userstore.login;

  // Modal control
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Fetch all tasks
  const allusertasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://tasks-7nbg.onrender.com/task/gettasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      // toast.error("Error fetching tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (login) {
      allusertasks();
    }
  }, [login]); // Only fetch tasks if user is logged in

  // Delete task
  const handledelete = async (Id) => {
    try {
      let res = await axios.delete(`https://tasks-7nbg.onrender.com/task/delete/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        setTasks(tasks.filter((task) => task._id !== Id)); // Optimistic UI update
      }
    } catch (error) {
      toast.error("Error deleting task");
      console.log(error);
    }
  };

  // Open update modal with pre-filled data
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    if (titleref.current && descriptionref.current && selectref.current && dateref.current) {
      titleref.current.value = task.title;
      descriptionref.current.value = task.description;
      selectref.current.value = task.status;
      dateref.current.value = task.duedate;
    }
    showModal();
  };

  // Handle update submit
  const handleupdate = async (Id, e) => {
    e.preventDefault();
    try {
      let obj = {
        title: titleref.current.value,
        description: descriptionref.current.value,
        status: selectref.current.value,
        duedate: dateref.current.value,
      };

      let res = await axios.put(`https://tasks-7nbg.onrender.com/task/update/${Id}`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        setTasks(tasks.map((task) => (task._id === Id ? { ...task, ...obj } : task))); // Update UI optimistically
      }
    } catch (error) {
      toast.error("Error updating task");
      console.log(error);
    }
  };

  // Filtered tasks based on search + status
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || task.status === statusFilter)
  );

  return (
    <>
      {/* Navbar is always visible */}
      <div className="fixed z-50 w-full">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="p-6 pt-24">
        {login === true ? (
          <>
            {/* Filter Controls */}
            <h1 className="font-bold text-2xl mb-4">Filter Tasks</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 w-full sm:w-auto"
              />
              <select
                className="border px-3 py-2 w-full sm:w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Task Table Header + AddTask */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h1 className="font-bold text-2xl">List of Tasks</h1>
              <div className="mt-4 sm:mt-0">
                <Addtask allusertasks={allusertasks} />
              </div>
            </div>

            {loading ? (
              <div className="text-center">Loading tasks...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">S.No</th>
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">Title</th>
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">Status</th>
                     
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">Due Date</th>
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">Delete</th>
                      <th className="px-4 py-2 sm:px-6 text-sm md:text-base">Update</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                          <td className="px-4 py-2 sm:px-6">{index + 1}</td>
                          <td className="px-4 py-2 sm:px-6">{item.title}</td>
                          <td className="px-4 py-2 sm:px-6">{item.status}</td>
                          <td className="px-4 py-2 sm:px-6">{item.duedate}</td>
                          <td className="px-4 py-2 sm:px-6">
                            <button
                              onClick={() => handledelete(item._id)}
                              className="bg-red-700 px-4 py-1 rounded-md text-white text-xs sm:text-base"
                            >
                              Delete
                            </button>
                          </td>
                          <td className="px-4 py-2 sm:px-6">
                            <Button
                              type="text"
                              className="!bg-green-800 !text-white px-4 py-1 rounded-md shadow text-xs sm:text-base"
                              onClick={() => openUpdateModal(item)}
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-4 py-2 sm:px-6" colSpan="6">
                          No tasks available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <span className="font-bold text-3xl" >Please log in first to see your tasks.</span>
        )}
      </div>

      {/* Update Modal */}
      <Modal title="Update Task" open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedTask && (
          <form onSubmit={(e) => handleupdate(selectedTask._id, e)} className="space-y-4">
            <input ref={titleref} type="text" className="w-full border px-3 py-2" placeholder="Title" />
            <textarea ref={descriptionref} className="w-full border px-3 py-2" placeholder="Description"></textarea>
            <select ref={selectref} className="w-full border px-3 py-2">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <input ref={dateref} type="date" className="w-full border px-3 py-2" />
            <button type="submit" className="bg-green-500 text-white w-full py-2 rounded">
              Submit
            </button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
