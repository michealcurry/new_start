import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import memoryUtils from "./utils/memoryUtils";
import store from "store"

const user = store.get('user_key')
memoryUtils.user = user

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'))