import React from "react"
import './App.css'
import { BrowserRouter} from "react-router-dom"
import Router from "./router/index";


export default function App() {
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}