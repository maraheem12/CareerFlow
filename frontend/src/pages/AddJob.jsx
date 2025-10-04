import React, { useState,  useRef , useEffect } from "react";
import Quill from "quill";

import { JobCategories, JobLocations } from "../assets/assets";



const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

 useEffect(() => {
  if (!quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current, { theme: "snow", });
  }
}, []);


    return (
        <form>
        <div>
            <p>Job Title</p>
            <input
            type="text"
            placeholder="Type Here"
            name=""
            id=""
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            />
        </div>

        <div>
            <p>Job Description</p>
            <div ref={editorRef}></div>
        </div>

        <div>
            <div>
            <p>Job Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)} name="" id="">
                {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
                ))}
            </select>
            </div>

            <div>
            <p>Job Location</p>
            <select value={location} onChange={(e) => setLocation(e.target.value)} name="" id="">
                {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                    {location}
                </option>
                ))}
            </select>
            </div>

            <div>
            <p>Job Level</p>
            <select value={level} onChange={(e) => setLevel(e.target.value)} name="" id="">
                <option value="Beginner level">Beginner level</option>
                <option value="Intermediate level">Intermediate level</option>
                <option value="Expert level">Expert level</option>
            </select>
            </div>
        </div>
        <div>
            <p>Job Salary</p>
            <input onChange={e => {setSalary(e.target.value)}} type="number" value={salary} placeholder="20000" />
        </div>
        </form>
    );
};

export default AddJob;







    