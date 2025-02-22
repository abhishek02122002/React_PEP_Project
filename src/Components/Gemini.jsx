import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Loading from "./Loading";

const API_KEY = "AIzaSyDNHPojV1ni1cB4f_Y4i5kStRncbYQgy6U";
const genAI = new GoogleGenerativeAI(API_KEY);

const allowedTopics = {
  LeetCode: Array.from({ length: 3459 }, (_, i) => (i + 1).toString()),

  DBMS: [
    "database",
    "SQL",
    "NoSQL",
    "ACID properties",
    "ER model",
    "normalization",
    "denormalization",
    "indexes",
    "views",
    "stored procedures",
    "triggers",
    "transactions",
    "joins",
    "subqueries",
    "aggregate functions",
    "relational algebra",
    "functional dependencies",
    "BCNF",
    "1NF",
    "2NF",
    "3NF",
    "4NF",
    "5NF",
    "Big Data",
    "OLAP",
    "OLTP",
    "data warehousing",
    "sharding",
    "replication",
    "partitioning",
    "concurrency control",
    "deadlock",
    "RAID",
    "CAP theorem",
    "MongoDB",
    "Redis",
    "Cassandra",
    "Elasticsearch",
    "Graph databases",
  ],
  CPP: [
    "c++",
    "stl",
    "pointers",
    "oop",
    "classes",
    "dynamic memory",
    "syntax",
    "inheritance",
    "polymorphism",
    "maps",
    "vectors",
    "sets",
    "queues",
    "memory management",
    "file handling",
    "templates",
    "lambda expressions",
    "functional programming",
    "operator overloading",
    "exception handling",
    "multithreading",
    "graphs",
    "trees",
    "sorting",
    "searching",
    "dynamic programming",
    "recursion",
    "bit manipulation",
    "design patterns",
  ],
  JavaScript: [
    "syntax",
    "variables",
    "data types",
    "functions",
    "ES6",
    "arrow functions",
    "closures",
    "hoisting",
    "DOM manipulation",
    "event handling",
    "callbacks",
    "promises",
    "async/await",
    "fetch API",
    "localStorage",
    "sessionStorage",
    "cookies",
    "modules",
    "spread/rest operators",
    "destructuring",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "higher-order functions",
    "functional programming",
    "error handling",
    "prototypes",
    "this keyword",
    "bind/call/apply",
    "currying",
    "memoization",
    "WebSockets",
    "Service Workers",
    "WebRTC",
    "GraphQL",
    "REST APIs",
    "JSON",
    "regex",
    "performance optimization",
  ],
  Java: [
    "syntax",
    "OOP",
    "classes",
    "objects",
    "inheritance",
    "polymorphism",
    "abstraction",
    "encapsulation",
    "constructors",
    "interfaces",
    "exception handling",
    "multithreading",
    "JVM",
    "JRE",
    "JDK",
    "Garbage Collection",
    "Lambda Expressions",
    "Streams API",
    "Collections Framework",
    "ArrayList",
    "LinkedList",
    "HashMap",
    "TreeMap",
    "HashSet",
    "PriorityQueue",
    "Sorting",
    "Searching",
    "Recursion",
    "Functional Programming",
    "File Handling",
    "Database Connectivity",
    "JDBC",
    "Spring Boot",
    "Hibernate",
    "Servlets",
    "JSP",
    "REST APIs",
    "Design Patterns",
  ],
  ComputerNetworks: [
    "networking basics",
    "OSI model",
    "TCP/IP model",
    "IP addressing",
    "IPv4",
    "IPv6",
    "subnetting",
    "CIDR",
    "MAC addressing",
    "ARP",
    "DNS",
    "DHCP",
    "NAT",
    "routing",
    "switching",
    "firewalls",
    "load balancing",
    "proxy servers",
    "HTTP",
    "HTTPS",
    "FTP",
    "SMTP",
    "POP3",
    "IMAP",
    "SNMP",
    "ICMP",
    "VPN",
    "LAN",
    "WAN",
    "MAN",
    "PAN",
    "VLAN",
    "wireless networks",
    "Wi-Fi",
    "Bluetooth",
    "mobile networks",
    "4G",
    "5G",
    "network security",
    "encryption",
    "hashing",
    "TLS",
    "SSL",
    "SSH",
    "firewalls",
    "IDS",
    "IPS",
    "MITM attack",
    "DDoS attack",
    "packet sniffing",
    "port scanning",
    "network topologies",
    "star topology",
    "bus topology",
    "ring topology",
    "hybrid topology",
    "peer-to-peer networks",
    "client-server model",
    "CDN",
    "cloud networking",
    "edge computing",
    "SDN (Software-Defined Networking)",
    "IoT networking",
    "network protocols",
    "data link layer",
    "transport layer",
    "network layer",
    "application layer",
    "network congestion control",
    "troubleshooting",
    "Network Performance & Troubleshooting",
  ],
};

async function generateResponse(prompt, subjectName) {

  
  console.log(`🔍 Checking Allowed Topics for: ${subjectName}`);
  console.log("Allowed Topics:", allowedTopics[subjectName]);

  const lowerPrompt = prompt.toLowerCase();
  const isTopicAllowed = allowedTopics[subjectName]?.some((topic) =>
    lowerPrompt.includes(topic.toLowerCase())
  );

  if (!isTopicAllowed) {
    console.warn(`❌ Rejected: ${prompt} is not related to ${subjectName}`);
    return `❌ Only ${subjectName}-related questions are allowed.`;
  }

  try {
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    return result.response.text();
  } catch (error) {
    console.error("❌ Error generating response:", error);
    return "Error fetching response.";
  }
  
 
}


export default function Gemini({ subjectName }) {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setChatHistory([]);
  }, [subjectName]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    console.log(`📩 User Input: ${input}`);
    const lowerInput = input.toLowerCase();
    const isTopicAllowed = allowedTopics[subjectName]?.some((topic) =>
      lowerInput.includes(topic.toLowerCase())
    );

    if (!isTopicAllowed) {
      setPopupMessage(`❌ Only ${subjectName} questions are allowed.`);
      setShowPopup(true);
      return;
    }

    const userMessage = { sender: "You", text: input };
    setChatHistory((prev) => [
      ...prev,
      userMessage,
      { sender: "Gemini", text: `Loading` },
    ]);
    setInput("");

    const response = await generateResponse(input, subjectName);
    setChatHistory((prev) =>
      prev.map((msg, index) =>
        index === prev.length - 1 ? { sender: "Gemini", text: response } : msg
      )
    );
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#007bff" }}>Gemini AI {subjectName}</h2>
      <div
        style={{
          width: "100%",
          color:"black",
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "10px",
          textAlign: "left",
        }}
      >
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender}:</strong>
            {msg.text.includes("```") ? (
              <SyntaxHighlighter language="cpp" style={dracula}>
                {msg.text.replace(/```/g, "")}
              </SyntaxHighlighter>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your question..."
        style={{
          width: "90%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleGenerate}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.3)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "bold", color: "#d9534f" }}>
            {popupMessage}
          </p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "#d9534f",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
