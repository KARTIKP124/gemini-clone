import { createContext } from "react";
import main from "../config/gemini";
import { useState } from "react";



export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextword);
        }, index * 100);
    };
    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }
    

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let r;
        if(prompt!==undefined){
            r  =    await main(prompt)
            setRecentPrompt(prompt)

        }

        else{
             setPrevPrompt((prev) => [...prev, input])
             setRecentPrompt(input)
             r  =    await main(input)
        }
       


        const response  =    await main(input)
let newResponse = response

    // Escape HTML tags
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    // Bold text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")

    // Code blocks
    .replace(/```([\s\S]*?)```/g,
        "<pre><code>$1</code></pre>")

    // Line breaks
    .replace(/\n/g, "<br/>");

let newResponseArray = newResponse.split(" ");

for (let i = 0; i < newResponseArray.length; i++) {

    const nextWord = newResponseArray[i] + " ";

    delayPara(i, nextWord);

}

        setLoading(false)
        setInput("")

    };

   
   
   

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
        
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;