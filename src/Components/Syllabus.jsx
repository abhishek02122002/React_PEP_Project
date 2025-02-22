import { useState } from "react";

export default function Syllabus({ subjectName }) {
  const [isOpen, setIsOpen] = useState(true);

  const topicsMap = {
    DBMS: [
      "Introduction to DBMS",
      "Relational Model & ER Diagrams",
      "SQL & Queries (SELECT, JOIN, GROUP BY)",
      "Normalization (1NF to 5NF)",
      "Transactions & Concurrency Control",
      "ACID Properties",
      "Indexing & Hashing",
      "Stored Procedures & Triggers",
      "Database Security & Authorization",
      "CAP Theorem & BASE Model",
      "NoSQL Databases (MongoDB, Cassandra)",
      "Big Data & Distributed Databases",
      "Cloud Databases",
      "Data Warehousing & OLAP",
      "DBMS vs RDBMS",
    ],
    "Computer Networks": [
      "Networking Basics & OSI Model",
      "TCP/IP Protocol Suite",
      "IPv4 & IPv6 Addressing",
      "Subnetting & CIDR",
      "Routing Algorithms (Link State, Distance Vector)",
      "Switching Techniques (Circuit, Packet, Message)",
      "DNS, DHCP, FTP, HTTP, SMTP",
      "Network Security (Firewalls, IDS, IPS)",
      "Wireless & Mobile Networks",
      "Cloud Networking",
      "VPN & Proxy Servers",
      "5G and Future Technologies",
      "IoT Networking",
      "SDN (Software Defined Networking)",
      "Network Performance & Troubleshooting",
    ],
    Mathematics: [
      "Algebra & Equations",
      "Matrices & Determinants",
      "Differentiation & Integration",
      "Limits & Continuity",
      "Discrete Mathematics",
      "Probability & Statistics",
      "Linear Algebra",
      "Graph Theory",
      "Number Theory",
      "Set Theory & Relations",
      "Complex Numbers",
      "Differential Equations",
      "Boolean Algebra",
      "Game Theory",
      "Combinatorics",
    ],
    "C++": [
      "C++ Basics & Syntax",
      "OOP Concepts (Classes, Objects, Inheritance, Polymorphism)",
      "STL (Vectors, Maps, Sets, Queues)",
      "Pointers & Memory Management",
      "File Handling in C++",
      "Templates & Generic Programming",
      "Lambda Expressions & Functional Programming",
      "Operator Overloading",
      "Exception Handling",
      "Multithreading in C++",
      "Graph & Tree Data Structures in C++",
      "Sorting & Searching Algorithms",
      "Dynamic Programming & Recursion",
      "Bit Manipulation",
      "Design Patterns in C++",
    ],
    Java: [
      "Java Basics (Data Types, Variables, Operators)",
      "OOP in Java (Inheritance, Abstraction, Polymorphism)",
      "Java Collections Framework",
      "Exception Handling in Java",
      "Multithreading & Concurrency",
      "Spring Boot Framework",
      "JPA & Hibernate (ORM)",
      "REST API with Java",
      "Lambda Expressions & Functional Programming",
      "File Handling in Java",
      "Networking in Java (Sockets, HTTP Requests)",
      "Reflection API",
      "JDBC & Database Connectivity",
      "Microservices Architecture",
      "Design Patterns in Java",
    ],
    JavaScript: [
      "JavaScript Basics (Variables, Data Types, Operators)",
      "ES6 Features (Arrow Functions, Spread, Destructuring)",
      "DOM Manipulation",
      "Event Handling & Bubbling",
      "Promises & Async/Await",
      "Fetch API & AJAX",
      "LocalStorage, SessionStorage, Cookies",
      "JavaScript Modules (import/export)",
      "Web Components",
      "JS Frameworks (React, Vue, Angular Basics)",
      "Node.js Basics",
      "Express.js & API Development",
      "WebSockets & Real-time Communication",
      "Data Structures in JavaScript",
      "Design Patterns in JavaScript",
    ],
    "Ruby on Rails": [
      "Ruby Basics (Syntax, Variables, Methods)",
      "OOP in Ruby (Classes, Modules, Mixins)",
      "Metaprogramming in Ruby",
      "Rails Framework Basics",
      "MVC Architecture in Rails",
      "Active Record & ORM",
      "Routing & Controllers in Rails",
      "RESTful APIs in Rails",
      "Testing in Rails (RSpec, Capybara)",
      "Background Jobs (Sidekiq, Resque)",
      "Security in Rails (CSRF, SQL Injection Prevention)",
      "Rails and WebSockets",
      "Performance Optimization in Rails",
      "Authentication & Authorization in Rails",
      "Deploying Rails Applications",
    ],
  };

  const topics = topicsMap[subjectName] || [];

  const toggleSyllabus = () => {
    const sound = new Audio("/open.mp3"); // ✅ Corrected Audio Path
    sound.play();
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginTop: "10px",
        background: " #6AB187",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "500px",
      }}
    >
      <button
        onClick={toggleSyllabus}
        style={{
          background: isOpen ? "#ff4d4d" : "#28a745",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          borderRadius: "5px",
          width: "100%",
          fontSize: "16px",
          transition: "background 0.3s",
        }}
      >
        {isOpen ? "Close Syllabus ⬆" : "Open Syllabus ⬇"}
      </button>

      {isOpen && (
        <ul
          style={{
            marginTop: "15px",
            paddingLeft: "20px",
            maxHeight: "300px",
            overflowY: "auto",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {topic}
              </li>
            ))
          ) : (
            <li>No syllabus available</li>
          )}
        </ul>
      )}
    </div>
  );
}
