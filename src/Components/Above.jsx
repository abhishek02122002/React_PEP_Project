import Window from "./Window";
import Gemini from "./Gemini";
import "./Above.css";
import { useState } from "react";
import Icon from "./Icon";

export default function Above() {
  const [isOpenDBMS, setIsOpenDBMS] = useState(null);
  const [isOpenCPP, setIsOpenCPP] = useState(null);
  const [isOpenJS, setIsOpenJS] = useState(null);
  const [isOpenCN, setIsOpenCN] = useState(null);
  const [isOpenJava, setIsOpenJava] = useState(null);

  const [isOpenLC,setIsOpenLC] = useState(null);
  const [windowOrder, setWindowOrder] = useState([]);

  function openLeetCode(){
    setIsOpenLC(!isOpenLC);
    bringToFront("");
  }

  function openIconDBMS() {
    setIsOpenDBMS(!isOpenDBMS);
    bringToFront("DBMS");
  }

  function openIconCPP() {
    setIsOpenCPP(!isOpenCPP);
    bringToFront("CPP"); 
  }

  function openIconJS(){
    setIsOpenJS(!isOpenJS);
    bringToFront("JavaScript");
  }

  function openIconCN(){
    setIsOpenCN(!isOpenCN);
    bringToFront("Computer Networks");
  }

  function openIconJava(){
    setIsOpenJava(!isOpenJava);
    bringToFront("Java");
  }



  function bringToFront(subject) {
    setWindowOrder((prev) => [...prev.filter((item) => item !== subject), subject]); 
  }

  return (
    <div className="main-div-second-page">
      <Icon openIcon={openIconDBMS} subjectName="DBMS" />
      <Icon openIcon={openIconCPP} subjectName="CPP" />
      <Icon openIcon={openIconJS} subjectName="JavaScript" />
      <Icon openIcon={openIconCN} subjectName="Computer Networks" />
      <Icon openIcon={openIconJava} subjectName="Java" />
      <Icon openIcon={openLeetCode} subjectName="LeetCode" />
      

      {
        isOpenLC &&(
          <Window subjectName="LeetCode" bringToFront={bringToFront} windowOrder={windowOrder}>
          <Gemini subjectName="LeetCode" />
        </Window>
        )
      }
      {isOpenDBMS && (
        <Window subjectName="DBMS" bringToFront={bringToFront} windowOrder={windowOrder}>
          <Gemini subjectName="DBMS" />
        </Window>
      )}

      {isOpenCPP && (
        <Window subjectName="CPP" bringToFront={bringToFront} windowOrder={windowOrder}>
          <Gemini subjectName="CPP" />
        </Window>
      )}

      {
        isOpenJS && (
          <Window subjectName="JavaScript" bringToFront={bringToFront} windowOrder={windowOrder}>
          <Gemini subjectName="JavaScript" />
        </Window>
        )}

        {
          isOpenCN && (
            <Window subjectName="Computer Networks" bringToFront={bringToFront} windowOrder={windowOrder}>
            <Gemini subjectName="ComputerNetworks" />
          </Window>
          )
        }

        {isOpenJava && (
             <Window subjectName="Java" bringToFront={bringToFront} windowOrder={windowOrder}>
             <Gemini subjectName="Java" />
           </Window>
        )}


    </div>
  );
}
