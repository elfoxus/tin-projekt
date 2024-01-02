import React, {createContext, Fragment, useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation, useParams} from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import RecipesView from "./components/RecipesView/RecipesView";
import AboutUs from "./components/AboutUs/AboutUs";
import LinkListView from "./components/LinkListView/LinkListView";
import Recipe from "./components/Recipe/Recipe";
import InternalProblemPage from "./components/InternalProblemPage/InternalProblemPage";
import Activation from "./components/Activation/Activation";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ThankYou from "./components/ThankYou/ThankYou";
import {AxiosInterceptor} from "./services/api";
import AuthVerify, {UserContext} from "./services/auth";
import Favourites from "./components/Favourites/Favourites";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import Users from "./components/Users/Users";
import {useTranslation} from "react-i18next";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {}
});

const App = () => {

    const { t } = useTranslation();
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialMode = localStorage.getItem('mode') || systemMode;
    const [mode, setMode] = React.useState(initialMode);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    var newMode = (prevMode === 'light' ? 'dark' : 'light')
                    localStorage.setItem('mode', newMode)
                    return newMode;
                });
            }
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                background: mode === 'light'
                                    ? 'linear-gradient(to bottom, #94c5f8 1%, #a6e6ff 70%, #b1b5ea 100%)'
                                    : 'linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)',
                            }
                        }
                    }
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <RouterProvider>
                    <AxiosInterceptor>
                        <AuthVerify>
                            <Header/>
                            <Container sx={{paddingTop: '75px', zIndex: 4, minHeight: '100%', paddingBottom: '60px', flex: '1'}}>
                                <Routes>
                                    <Route path="/"  element={<RecipesView url='/recipes' title={t('app.main-page-title')} />} />
                                    <Route path="/add-recipe" element={<AddRecipe />} />
                                    <Route path="/my-recipes" element={<PrivateRoute passRole='USER'><RecipesView url='/recipes/my' title={t('app.my-recipes-title')} /></PrivateRoute>} />
                                    <Route path="/favourites" element={<PrivateRoute passRole='USER'><Favourites/></PrivateRoute>} />
                                    <Route path="/recipe/:id" element={<Recipe />} />
                                    <Route path="/category/:name" element={<CategoryRecipesView/>} />
                                    <Route path="/tag/:name" element={<TagRecipesView/>} />
                                    <Route path="/dish/:name" element={<DishRecipesView/>} />
                                    <Route path="/categories" element={<LinkListView url='/categories' sub_url="category" title={t('app.categories-title')} />} />
                                    <Route path="/tags" element={<LinkListView url='/tags' sub_url="tag" title={t('app.tags-title')} />} />
                                    <Route path="/dishes" element={<LinkListView url='/dishes' sub_url="dish" title={t('app.dishes-title')} />} />
                                    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
                                    <Route path="/register" element={<PublicRoute><Registration/></PublicRoute>} />
                                    <Route path="/activate/:token" element={<Activation />} />
                                    <Route path="/about-us" element={<AboutUs/>} />
                                    <Route path="/404" element={<NotFound />} />
                                    <Route path="/500" element={<InternalProblemPage />} />
                                    <Route path="/thank-you" element={<ThankYou />} />
                                    <Route path="/users" element={<PrivateRoute passRole='ADMIN'><Users/></PrivateRoute>} />
                                    <Route path="*" element={<Navigate to="/404" />} />
                                </Routes>
                            </Container>
                            <Footer/>
                            <div className="floating"></div>
                        </AuthVerify>
                    </AxiosInterceptor>
                    </RouterProvider>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

const RouterContext = createContext();

const RouterProvider = ({children}) => {
    const location = useLocation()
    const [route, setRoute] = useState({ //--> it can be replaced with useRef or localStorage
        to: location.pathname,
        from: location.pathname
    });

    useEffect(()=> {
        setRoute((prev)=> {
                return {to: location.pathname, from: prev.to};
        }
        )
    }, [location]);

    return <RouterContext.Provider value={route}>
        {children}
    </RouterContext.Provider>
}

// only when not logged in!
const PublicRoute = ({children}) => {
    const route = useContext(RouterContext);
    const {state} = useContext(UserContext);

    return (
        <Fragment>
            {state.username ?
                 <Navigate to={(route?.from == '/login' || route?.from == '/register' ? '/' : route?.from) || '/'} />
                : children
            }
        </Fragment>
    )
}

const PrivateRoute = ({passRole = 'USER', children}) => {
    const {state} = useContext(UserContext);

    const roleMap = {
        'USER': 0,
        'MODERATOR': 1,
        'ADMIN': 2
    }

    const atLeastPassRole = (role) => {
        return roleMap[state.role] >= roleMap[role]
    }

    return (
        <Fragment>
            {
                atLeastPassRole(passRole) ? children : <Navigate to='/404' />
            }
        </Fragment>
    )
}

const CategoryRecipesView = () => {
    const { t } = useTranslation();
    let { name } = useParams();

    return (
        <RecipesView url={'/recipes/category/' + name } title={t('app.category') + ' ' + name} />
    )
}

const DishRecipesView = () => {
    const { t } = useTranslation();
    let { name } = useParams();

    return (
        <RecipesView url={'/recipes/dish/' + name } title={t('app.dish') + ' ' + name} />
    )
}

const TagRecipesView = () => {
    const { t } = useTranslation();
    let { name } = useParams();

    return (
        <RecipesView url={'/recipes/tag/' + name } title={t('app.tag') + ' ' + name} />
    )
}

export default App;
