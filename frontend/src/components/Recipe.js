import * as React from "react";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import "../styles/Recipe.css";
import {Outlet} from "react-router";
import Categories from "./Categories";
import withRouter from "./withRouter";

function stringToHash(string) {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

class Recipe extends React.Component {
        constructor(props) {
        super(props);
    }

    state ={
        recipe: [],
        ingredients: []
    }

    getData() {
        const recipe = this.props.router.params.recipe;
        axios.get(`/api/recipe/${recipe}/`)
            .then(res => {
                const recipe = res.data;
                this.setState({recipe: recipe, ingredients: JSON.parse(recipe.ingredients.replace(/'/g, `"`))});

            })
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.recipe !== prevState.recipe.title) {
            this.getData();
        }

    }

    render() {
            return (
                <>
                    <div className={'recipe'}>
                        <h3 className={'title'}>{this.state.recipe.title}</h3>
                        <div className={'ingredients'}><h5>Ingredients:</h5><table>
                            <tbody>{this.state.ingredients.map(ingredient => {
                            return (
                                <tr key={(ingredient[0] + ingredient[1])}>
                                    <td>{ingredient[0]}</td>
                                    <td>{ingredient[1]}</td>
                                </tr>

                            )
                        })}</tbody></table></div>
                        <div className={'text'}>
                            <img src={this.state.recipe.image}/>
                            <div>{this.state.recipe.text}</div>
                        </div>
                    </div>
                </>

            );
    }

}

export default withRouter(Recipe);