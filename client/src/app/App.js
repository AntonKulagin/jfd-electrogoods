import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./components/common/wrapper";
import Admin from "./components/pages/admin/admin";
import LogOut from "./components/pages/login/logOut";
import SignInPage from "./components/pages/login/SignInPage";
import SignUpPage from "./components/pages/login/SignUpPage";
import MainPage from "./components/pages/mainPage";
import ProductInfoPage from "./components/pages/productInfoPage/productInfoPage";
import ProductsPage from "./components/pages/productsPage";
import UserPage from "./components/pages/userPage";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./components/ui/cart/cart";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import ProtectedAdminRoute from "./components/ui/protectedAdminRoute";
import AppLoader from "./hoc/appLoader";
import UserLoader from "./hoc/userLoader";

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
                            <Route
                                path=":productId"
                                element={<ProductInfoPage />}
                            />
                            <Route path="*" element={<Navigate to="" />} />
                        </Route>
                        <Route path="login">
                            <Route index element={<SignInPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                        </Route>
                        <Route path="logout" element={<LogOut />} />
                        <Route
                            path="cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user"
                            element={
                                <ProtectedRoute>
                                    <UserLoader>
                                        <UserPage />
                                    </UserLoader>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="admin"
                            element={
                                <ProtectedAdminRoute>
                                    <UserLoader>
                                        <Admin />
                                    </UserLoader>
                                </ProtectedAdminRoute>
                            }
                        />
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
