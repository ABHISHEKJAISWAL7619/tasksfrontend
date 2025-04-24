// import { Button } from 'antd'
import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Addtask = ({allusertasks}) => {
    const userstore  = useSelector((state)=>state.user);
    console.log(userstore)
    const  userId = userstore.user._id;
    console.log(userId)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    let titleref = useRef();
    let descriptionref = useRef();
    let selectref = useRef();
    let dateref = useRef();
    let navigate  = useNavigate();


    const handlesubmit  = async(e)=>{
        e.preventDefault();
    
        let obj  = {
            title: titleref.current.value,
            description: descriptionref.current.value,
            status: selectref.current.value,
            duedate: dateref.current.value,
            userId: userId
        };
        console.log(obj.userId)
    
    
       
            const res  = await axios.post("https://tasks-7nbg.onrender.com/task/create", obj, 
            );
             if (res.data.success) {
                    toast.success(res.data.message);
                    setIsModalOpen(false);
                    allusertasks();
                    // allusertasks();
                    navigate("/")
                  }
    
    
        //
    }
    
  
  return (
    <div>
        <Button type="primary" onClick={showModal}>
        Add new Task
      </Button>
      <Modal title="Create new task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              ref={titleref}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              ref={descriptionref}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              ref={selectref}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="" disabled >Selectstatus</option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
            <input
              ref={dateref}
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <Button onClick={handlesubmit} className='!bg-blue-500 !w-full  items-center' >Submit</Button>
        </form>
      </Modal>
      
    </div>
  )
}

export default Addtask
