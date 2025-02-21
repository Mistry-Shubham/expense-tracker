import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { defaultAppContext } from "./Contexts";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ResendEmail from "./screens/ResendEmail";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerifyScreen from "./screens/VerifyScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import ExpenseEditScreen from "./screens/ExpenseEditScreen";
import MailVerifyScreen from "./screens/MailVerifyScreen";
import MailPasswordResetScreen from "./screens/MailPasswordResetScreen";
import Footer from "./components/Footer";
import { logout } from "./actions/userActions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const [addExpenseSection, setAddExpenseSection] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState({
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    id: 69,
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.defaultCurrency) {
      setDefaultCurrency(userInfo.defaultCurrency);
    }

    if (userInfo && userInfo.expiry < +Date.now()) {
      console.log(new Date(userInfo.expiry));
      dispatch(logout());
    }
  }, [userInfo]);

  return (
    <defaultAppContext.Provider
      value={{
        addExpenseSection,
        setAddExpenseSection,
        defaultCurrency,
        setDefaultCurrency,
      }}
    >
      <div className="background-image">
        <div className="background-filter">
          <Header />
          <main className="App">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/reset-password" element={<ResetPasswordScreen />} />
              <Route
                path="/resend-verfication-email"
                element={<ResendEmail />}
              />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/verify" element={<VerifyScreen />} />
              <Route path="/expense/:id" element={<ExpenseScreen />} />
              <Route path="/expense/:id/edit" element={<ExpenseEditScreen />} />
              <Route
                path="/users/verify/:token"
                element={<MailVerifyScreen />}
              />
              <Route
                path="/users/password-reset/:token"
                element={<MailPasswordResetScreen />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </defaultAppContext.Provider>
  );
};

export default App;
