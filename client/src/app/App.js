import React from "react";
import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/common/wrapper";
import SignInPage from "./components/pages/login/SignInPage/SignInPage";
import SignUpPage from "./components/pages/login/SignUpPage/SignUpPage";
import MainPage from "./components/pages/mainPage";
import ProductsPage from "./components/pages/productsPage";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import AppLoader from "./hoc/AppLoader/AppLoader";

function App() {
    return (
        <Wrapper>
            <AppLoader>
                <header>
                    <Header />
                </header>
                <main>
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path="goods" element={<ProductsPage />} />
                        <Route path="login">
                            <Route index element={<SignInPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                        </Route>
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </AppLoader>
        </Wrapper>
    );
}

export default App;
