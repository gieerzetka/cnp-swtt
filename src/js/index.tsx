import * as React from "react";
import * as ReactDOM from "react-dom";
import '../styles/main.scss';
import SWTTMainContainer from "./components/SWTTMainContainer";


const Root = () => (
	<SWTTMainContainer/>
);

ReactDOM.render(
	<Root/>,
	document.getElementById("app")
);
