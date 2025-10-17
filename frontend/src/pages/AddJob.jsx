import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";

import { JobCategories, JobLocations } from "../assets/assets";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          location,
          category,
          level,
          salary,
          description,
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success("Job Added Successfully");
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Error adding job");
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full item-start gap-3 "
    >
      <div className="w-full  ">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="Type Here"
          name=""
          id=""
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded-lg   "
        />
      </div>

      <div className="w-full max-w-lg ">
        <p className="my-2 ">Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className=" flex flex-col sm:flex:row gap-2 w-full sm:gap-8  ">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-60 px-3 py-2 border-2 rounded border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name=""
            id=""
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="my-2 ">Job Location</p>
          <select
            className="w-60 px-3 py-2 border-2 rounded border-gray-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name=""
            id=""
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="my-2 ">Job Level</p>
          <select
            className="w-60 px-3 py-2 border-2 rounded border-gray-300"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            name=""
            id=""
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Expert level">Expert level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="my-2 ">Job Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]   "
          onChange={(e) => {
            setSalary(e.target.value);
          }}
          type="number"
          value={salary}
          placeholder="20000"
        />
      </div>
      <button className="w-38 py-3 mt-4 rounded-xl bg-sky-200 text-blue border border-blue-600 cursor-pointer hover:bg-sky-100  ">
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
