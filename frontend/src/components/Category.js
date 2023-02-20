import * as React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import "../styles/Category.css";
import {Outlet} from "react-router";
import Categories from "./Categories";
import withRouter from "./withRouter";

class Category extends React.Component {
        constructor(props) {
        super(props);
    }

    state ={
        recipes: [],
    }

    getData() {
        this.category = this.props.router.params.cat;
        const category = this.category;
        axios.get(`/api/category/${category}/`)
            .then(res => {
                const recipes = res.data.recipes;
                this.setState({recipes: recipes});
            })
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.cat !== this.category){
            this.getData();
        }
    }

    render() {
        return (
            <>
                {this.props.router.params.recipe?'':<><div>Recipes are:</div>
                <div className={'recipes-list'}>
                    <ul>
                        {this.state.recipes.map(recipe => {
                            return (
                                <li key={recipe.pk}>
                                    <NavLink activeClassName={'is-active'} to={recipe.title}><img src={recipe.image}
                                                width={'150px'}/> {recipe.title}</NavLink>
                                </li>
                            )})}

                    </ul>
                </div></>}
                <Outlet />
            </>
        );
    }
}

export default withRouter(Category);