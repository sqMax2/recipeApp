import * as React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import "../styles/Categories.css";
import {Outlet} from "react-router";
import withRouter from "./withRouter";

class Categories extends React.Component{
    constructor(props) {
        super(props);
    }

    state ={
        categories: [],
        category: ''
    }

    componentDidMount() {
        axios.get('/api/category/')
            .then(res => {
                const categories = res.data.results;
                this.setState({categories: categories})
            })
    }

    render() {
        return (
        <div>
            <div className={'categories-list'}>
                {this.state.categories.map(category => {
                    return (
                        <NavLink key={category.pk} activeClassName={'is-active'} to={category.name}>{category.name} ({category.recipes_count})</NavLink>
                    )})}
                {/*<NavLink activeClassName={'is-active'} to={'Soups'}>Soups</NavLink>*/}
                {/*<NavLink activeClassName={'is-active'} to={'Main dishes'}>Main dishes</NavLink>*/}
                {/*<NavLink activeClassName={'is-active'} to={'Baking'}>Baking</NavLink>*/}
            </div>
            <Outlet />
        </div>
    );
    }
}

export default withRouter(Categories);