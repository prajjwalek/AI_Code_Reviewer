import { useState, useEffect } from 'react'
import Editor from "react-simple-code-editor"
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Markdown from "react-markdown"
import axios from 'axios';
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";
//import 'prismjs/themes/prism-tomorrow-night.css';
import './App.css'
//import { set } from '../../Backend/src/app';

function App() {

  const [code, setCode] = useState(`Write your code here and click on below button
    
function add(a, b) {
    return a + b;
}`)

const [review, setReview] = useState(``)
  
  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode(code) {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code})
    setReview(response.data)
  }
  return (
    <>
    <main>
      <div className="left">
        <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 15,
                //  border: "1px solid #ddd",
                //height: "100%",
                width: "100%",
                backgroundColor: "#181a19",
                minHeight: "100%",
                color: "#ffffff",
                // outline: "none",
                //overflow: "auto",
                
              }}
            />
        </div>
        <div onClick={() => reviewCode(code)}
         className="review">Review</div>
      </div>
      <div className="right">
      <Markdown
        rehypePlugins={[rehypeHighlight]}>
        {review}        
      </Markdown>
      </div>
    </main>
    </>
  )
}



export default App
