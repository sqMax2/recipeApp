import * as React  from "react";
import {Link, NavLink, Route} from "react-router-dom";
import {Routes} from "react-router";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import Header from "./Header";
import "../styles/App.css";
import HomePage from "./HomePage";
import Category from "./Category";


function App() {
    return (
        <div className={'app'}>
            <div className={'wrapper'}>
                <Header />
                <nav>
                    <ul>
                        <li key={'home'}>
                            <NavLink activeClassName={'is-active'} to={'/'}>Home</NavLink>
                        </li>
                        <li key={'recipe'}>
                            <NavLink activeClassName={'is-active'} to={'/recipe'}>Recipes</NavLink>
                        </li>
                        <li key={'api'}>
                            <NavLink activeClassName={'is-active'} to={'/api-doc'}>API</NavLink>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route path={'recipe'} element={<Category />} />
                        <Route path={'api-doc'} element={<SwaggerUI url="openapi" />} />
                        <Route path={'/'} element={<HomePage />} />
                    </Routes>
                </main>
                <footer><div>Recipe App 2023</div></footer>
            </div>
        </div>

    );
}

export default App;