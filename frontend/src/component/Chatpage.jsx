import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "./ToastOptions";
import { FaLaughBeam, FaComments } from "react-icons/fa";
import axios from "axios";

const Chatpage = () => {
  const [input, setInput] = useState("");
  const [joke, setJoke] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast("Please enter a prompt", ToastOptions);
    } else {
      // handle the input prompt logic here if needed
      setInput("");
    }
  };

  const getJoke = async () => {
    try {
      const response = await axios.get("http://localhost:8686/api/v1/ai/generate/joke");
      setJoke(response.data.joke); // Assuming the joke is inside `response.data.joke`
    } catch (error) {
      toast("Failed to fetch joke", ToastOptions);
    }
  };

  return (
    <div className="chat bg-black min-h-screen p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-lg max-w-lg w-full text-center mx-auto mt-6 border-[1px] border-gray-500">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
          Welcome to HiQueRY
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-10 w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8 mx-auto">
        <button onClick={getJoke} className="tellJoke flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-lg w-full md:w-2/5 h-52 border-[1px] border-gray-500 cursor-pointer hover:bg-neutral-800 hover:border-[2px] hover:border-blue-900">
          <FaLaughBeam className="text-5xl text-yellow-400 mb-4 animate-bounce" />
          <h2 className="text-xl font-semibold text-white">Tell Me a Joke</h2>
        </button>

        <button className="startChat flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-lg w-full md:w-2/5 h-52 border-[1px] border-gray-500 cursor-pointer hover:bg-neutral-800 hover:border-[2px] hover:border-blue-900">
          <FaComments className="text-5xl text-blue-400 mb-4 animate-bounce" />
          <h2 className="text-xl font-semibold text-white">Start Chat</h2>
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="flexinputtext w-3/5 h-20 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg mt-10 mx-auto fixed bottom-16">
          <div className="flex w-full h-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your prompt here"
              className="text-white flex-grow h-full bg-black bg-opacity-10 backdrop-blur-2xl rounded-l-2xl text-2xl p-4"
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-xl w-2/12 h-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r-2xl p-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="response">
        <p className="text-white text-2xl mt-16 w-4/5 mx-auto">{joke}</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Chatpage;
