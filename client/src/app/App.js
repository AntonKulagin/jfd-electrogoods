import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./components/common/wrapper";
import SignInPage from "./components/pages/login/SignInPage";
import SignUpPage from "./components/pages/login/SignUpPage";
import MainPage from "./components/pages/mainPage";
import ProductInfoPage from "./components/pages/productInfoPage/productInfoPage";
import ProductsPage from "./components/pages/productsPage";
import Cart from "./components/ui/cart/cart";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import AppLoader from "./hoc/appLoader";

function App() {
    return (
        <AppLoader>
            <Wrapper>
                <header>
                    <Header />
                </header>
                <main>
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path="goods">
                            <Route index element={<ProductsPage />} />
                            <Route path=":productId" element={<ProductInfoPage />} />
                            <Route path="*" element={<Navigate to="" />} />
                        </Route>
                        <Route path="login">
                            <Route index element={<SignInPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                        </Route>
                        <Route path="cart" element={<Cart />} />
                        <Route path="*" element={<Navigate to="" />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </Wrapper>
        </AppLoader>
    );
}

export default App;
