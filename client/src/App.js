import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useParams} from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import RecipesView from "./components/RecipesView/RecipesView";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/"  element={<RecipesView url='/api/recipes' title='Recipes' />} />
                    <Route path="/category/:name" element={<CategoryRecipesView/>} />
                    <Route path="/dish/:name" element={<DishRecipesView/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/registration" element={<Registration/>} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
                <Footer/>
                <div className="floating"></div>
            </BrowserRouter>
        );
    }
}

const CategoryRecipesView = () => {
    let { name } = useParams();

    return (
        <RecipesView url={'/api/recipes/category/' + name } title={'Kategoria: ' + name} />
    )
}

const DishRecipesView = () => {
    let { name } = useParams();

    return (
        <RecipesView url={'/api/recipes/dish/' + name } title={'Danie: ' + name} />
    )
}

export default App;
