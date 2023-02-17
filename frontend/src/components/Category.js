import * as React from "react";
import {NavLink, Route} from "react-router-dom";
import axios from "axios";
import "../styles/Category.css";
import {Outlet, Routes} from "react-router";

class Category extends React.Component{
    constructor(props) {
        super(props);
    }

    state ={
        categories: [],
        category: ''
    }

    componentDidMount() {
        axios.get('api/category/')
            .then(res => {
                const categories = res.data.results;
                console.log(categories)
                this.setState({categories: categories})
            })
    }

    render() {
        return (
        <div>
            <Routes>
                <Route path={'/'} element={<div><div className={'categories-list'}>
                    {this.state.categories.map(category => {
                    return (
                        <NavLink key={category.pk} activeClassName={'is-category'} to={category.name}>{category.name} ({category.recipe_count})</NavLink>
                    )})}
            </div>
            <div>
                {!this.state.category ? <h2>Please, select category</h2> : <h2>this.state.category</h2>}
            </div><Outlet /></div>}>
                    <Route path={'/:name'} element={<div>recipe is: some name</div>}/>
                </Route>
            </Routes>


        </div>
    );
    }
}

export default Category;