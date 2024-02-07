import React, { useState } from 'react'
import { BiText } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaRegFileAudio } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa";


const Hero = () => {
    const languages = [
        {
            value: "1",
            lan: "English"
        },
        {
            value: "2",
            lan: "Hindi"
        },
        {
            value: "3",
            lan: "Marathi"
        },
        {
            value: "4",
            lan: "Gujarati"
        },
        {
            value: "5",
            lan: "Punjabi"
        },
    ];

    const [fromlan, setFromlan] = useState("");
    const [tolan, setTolan] = useState("");
    const [textField, setTextField] = useState("");
    const [voiceField, setVoiceField] = useState("");
    const [pic, setPic] = useState();
    const [typeText, setTypeText] = useState(false);
    const [typeVoice, setTypeVoice] = useState(false);
    const [typeImg, setTypeImg] = useState(false);

    const postImage = (pics) => {
        if (pics === undefined) {
            toast.warn("Please select an Image");
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Chatmi-App");
            data.append("cloud_name", "vaibhavpandey0");
            fetch("https://api.cloudinary.com/v1_1/vaibhavpandey0/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString());
                console.log(data.url.toString());
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            toast.warn("Please select an Image!");
        }
    }

    const postVoice = (recs) => {
        if (recs === undefined) {
            toast.warn("Please select an Image");
            return;
        }
    }

    return (
        <div className="w-full h-[51.8rem] flex items-center justify-center border">
            <div className="w-4/5 h-4/5 flex justify-center items-center bg-white shadow-2xl shadow-white rounded-lg border">
                <div className="h-full w-1/3 flex flex-col gap-5 justify-center p-6 border-r-2">
                    <p className="text-4xl p-4 border rounded-3xl bg-indigo-500 text-white font-extrabold">Upload your Document</p>
                    <p className="text-xl p-3 border-b-4">in text / voice / image</p>
                </div>
                <div className="h-full w-2/3 p-12 flex flex-col gap-5 rounded-lg border-r-2">
                    <div className="w-full h-2/5 p-7 rounded-xl border">
                        <div className="h-2/5 font-semibold text-xl">Chose your Input language and Output language
                        </div>
                        <div className="h-3/5 flex justify-center items-center gap-40">
                            <select className="cursor-pointer outline-none" onChange={(e) => {
                                setFromlan(e.target.value);
                                console.log(fromlan);
                            }}>
                                <option value="">None</option>
                                {languages.map((item, i) => (
                                    <option key={i} value={item.value}>{item.lan}</option>
                                ))}
                            </select>

                            <select className="cursor-pointer outline-none" onChange={(e) => {
                                setTolan(e.target.value);
                                console.log(tolan);
                            }}>
                                <option value="">None</option>
                                {languages.map((item, i) => (
                                    <option key={i} value={item.value}>{item.lan}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="w-full h-3/5 p-7 rounded-xl flex flex-col border">
                        <p className="h-1/4 font-semibold text-xl">Select Document type</p>
                        <div className="h-3/4 flex justify-center gap-10">

                            <div className="w-52 h-full flex flex-col justify-center items-center cursor-pointer text-xl hover:bg-indigo-500 hover:text-white duration-300 rounded-xl border" onClick={() => setTypeText(true)}><BiText />Text</div>

                            {typeText && (
                                <div className="w-full h-screen absolute top-0 left-0 backdrop-blur-sm bg-white/50 flex justify-center items-center">
                                    <div className="w-2/5 h-[51.8rem] rounded-xl flex flex-col justify-center items-center p-8 gap-3 bg-white border">
                                        <div className="w-full h-[4rem] flex items-center justify-between p-3">
                                            <div className="ml-5">
                                                <p className="h-1/4 font-semibold text-xl border-b-4 border-black">Input</p>
                                            </div>
                                            <div className="mr-5 cursor-pointer text-2xl" onClick={() => setTypeText(false)}><ImCancelCircle /></div>
                                        </div>
                                        <div className="w-full h-[40rem] flex items-center justify-center overflow-auto">
                                            <textarea id="" cols="90" rows="20" placeholder="Text here..." className="text-xl p-3 border-2 border-black"
                                                onChange={(e) => setTextField(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="w-full h-[4rem] flex justify-end items-center p-5">
                                            <div className="bg-indigo-500 text-white font-semibold px-7 py-3 rounded-lg border">Next</div> {/* Put what to do, backend on this button */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="w-52 h-full flex flex-col justify-center items-center cursor-pointer text-xl hover:bg-indigo-500 hover:text-white duration-300 rounded-xl border" onClick={() => setTypeVoice(true)}><MdKeyboardVoice />Voice</div>

                            {typeVoice && (
                                <div className="w-full h-screen absolute top-0 left-0 backdrop-blur-sm bg-white/50 flex justify-center items-center">
                                    <div className="w-2/5 h-[40rem] rounded-xl flex flex-col justify-center items-center p-8 gap-3 bg-white border">
                                        <div className="w-full h-[4rem] flex items-center justify-between p-3">
                                            <div className="ml-5">
                                                <p className="h-1/4 font-semibold text-xl border-b-4 border-black">Input</p>
                                            </div>
                                            <div className="mr-5 cursor-pointer text-2xl" onClick={() => setTypeVoice(false)}><ImCancelCircle /></div>
                                        </div>
                                        <div className="w-full h-[40rem] flex items-center justify-center overflow-auto">
                                            <label className="w-3/5 h-2/4 flex flex-col justify-center items-center gap-3 rounded-lg font-semibold text-xl text-white bg-indigo-500 border"><div>Select audio file</div><div><FaRegFileAudio /></div><input type="file" accept=".mp3,audio/*" onChange={(e) => postVoice(e.target.files[0])} className=" hidden" /></label>
                                        </div>
                                        <div className="w-full h-[4rem] flex justify-end items-center p-5">
                                            <div className="bg-indigo-500 text-white font-semibold px-7 py-3 rounded-lg border">Next</div> {/* Put what to do, backend on this button */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="w-52 h-full flex flex-col justify-center items-center cursor-pointer text-xl hover:bg-indigo-500 hover:text-white duration-300 rounded-xl border" onClick={() => setTypeImg(true)}><FaImage />Image</div>

                            {typeImg && (
                                <div className="w-full h-screen absolute top-0 left-0 backdrop-blur-sm bg-white/50 flex justify-center items-center">
                                    <div className="w-2/5 h-[40rem] rounded-xl flex flex-col justify-center items-center p-8 gap-3 bg-white border">
                                        <div className="w-full h-[4rem] flex items-center justify-between p-3">
                                            <div className="ml-5">
                                                <p className="h-1/4 font-semibold text-xl border-b-4 border-black">Input</p>
                                            </div>
                                            <div className="mr-5 cursor-pointer text-2xl" onClick={() => setTypeImg(false)}><ImCancelCircle /></div>
                                        </div>
                                        <div className="w-full h-[40rem] flex items-center justify-center overflow-auto">
                                            <label className="w-3/5 h-2/4 flex flex-col justify-center items-center gap-3 rounded-lg font-semibold text-xl text-white bg-indigo-500 border"><div>Select Image file</div><div><FaRegFileImage /></div><input type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e) => postImage(e.target.files[0])} className=" hidden" /></label>
                                        </div>
                                        <div className="w-full h-[4rem] flex justify-end items-center p-5">
                                            <div className="bg-indigo-500 text-white font-semibold px-7 py-3 rounded-lg border">Next</div> {/* Put what to do, backend on this button */}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero