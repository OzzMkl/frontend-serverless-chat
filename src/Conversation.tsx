import React, { useEffect, useRef, useState } from "react";
import { Message } from "./App";

const Conversation = ({
        nickname,
        targetNickname,
        messages,
        sendMessage
    }: {
        nickname: string,
        targetNickname: string,
        messages: Message[],
        sendMessage:(message:string) => void;
    }) => {

    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    
    const scrollToTheBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    const submit = () => {
        sendMessage(message);
        setMessage("");
        scrollToTheBottom();
    };

    useEffect(() => {
        scrollToTheBottom();
    })

    const groupedMessages = messages.reduce<
        {
            sender: string;
            messages: string[]
        }[]
    >((acc, curr) =>{

        if(acc.length > 0 && acc[acc.length - 1].sender === curr.sender){
            acc[acc.length - 1].messages.push(curr.message);
        } else{
            acc.push({
                sender: curr.sender,
                messages: [curr.message],
            })
        }
        return acc;
    }, []);

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" 
                        alt="" 
                        className="w-10 sm:w-16 h-10 sm:h-16 rounded-full ml-2"/>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">{targetNickname}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                id="messages" 
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-screen">
                
                {groupedMessages.map((group) => 
                    group.sender === targetNickname ? (
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    {group.messages.map((message) =>
                                        <div>
                                            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{message}</span>
                                        </div>
                                    )}
                                </div>
                                <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1"/>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                        {group.messages.map((message) =>(
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                                    {message}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2"/>
                            </div>
                        </div>
                    )
                )}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <input 
                        type="text" 
                        placeholder="Write your message!" 
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                        onKeyUp={(e) => e.key === "Enter" ? submit() : null}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button 
                            type="button" 
                            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                            onClick={() => submit()}
                        >
                            <span className="font-bold">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;