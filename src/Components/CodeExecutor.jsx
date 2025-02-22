import { useState } from "react";

export default function CodeExecutor() {
  const [code, setCode] = useState(""); // JavaScript code input
  const [output, setOutput] = useState(""); // Output

  const executeCode = () => {
    try {
      // Console output ko capture karne ke liye ek custom console banayenge
      let logOutput = "";
      const customConsole = {
        log: (...args) => {
          logOutput += args.map(arg => String(arg)).join(" ") + "\n";
        }
      };

      // Eval ko custom console ke sath bind karenge
      const script = `(function() { 
        const console = arguments[0]; 
        return eval(arguments[1]); 
      })`;

      const result = new Function(script)(customConsole, code);

      // Agar kuch return ho raha hai toh usko output me dikhaye
      const finalOutput = logOutput || (result !== undefined ? result.toString() : "No output");
      setOutput(finalOutput);
      
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
      <h2>JavaScript Code Executor</h2>
      <textarea
        rows="5"
        cols="40"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter JavaScript code..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <br />
      <button onClick={executeCode} style={{ padding: "10px 15px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Run Code
      </button>
      <h3>Output:</h3>
      <div style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", textAlign: "left", minHeight: "50px", whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}
