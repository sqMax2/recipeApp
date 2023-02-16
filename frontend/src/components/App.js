import * as React  from "react";
import {Link, Route} from "react-router-dom";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

// import "../styles/App.css";



function App() {
    return (
        <div>
            <h1>Hello, world!</h1>
            <SwaggerUI url="openapi" />

        </div>

    );
}

export default App;