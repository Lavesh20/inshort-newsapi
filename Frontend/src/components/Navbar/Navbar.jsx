import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../CustomContext";

const mainCategories = [
    { english: "National", hindi: "भारत" },
    { english: "Business", hindi: "बिज़नेस" },
    { english: "Entertainment", hindi: "मनोरंजन" },
    { english: "Health", hindi: "स्वास्थ्य" },
    { english: "Science", hindi: "विज्ञान" },
    { english: "Sports", hindi: "खेल" },
    { english: "Technology", hindi: "तकनीकी" },
    { english: "Blogs", hindi: "ब्लॉग्स" },
    { english: "Stocks", hindi: "ब्लॉग्स" }
];

const Navbar = ({ displayNavbar, setDisplayNavbar }) => {
    const [categories, setCategories] = useState(mainCategories);
    const myContext = useContext(MyContext);
    const { language, setLanguage, currPath } = myContext;
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));
    
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("jwt"));
    }, [displayNavbar]);
    
    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("jwt"));
        };
        
        window.addEventListener('storage', checkLoginStatus);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const categoryClicked = () => {
        setDisplayNavbar(false);
    };

    const handleLogin = (token) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        setDisplayNavbar(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setDisplayNavbar(false);
    };

    const languageHandler = (e) => {
        let newsLanguage = e.target.id;
        setLanguage(newsLanguage);
        localStorage.setItem("language", newsLanguage);
        setDisplayNavbar(false);
    };

    useEffect(() => {
        let updateCategories = [];
        if (language === "hi") {
            updateCategories = mainCategories.filter((category) => category.english !== "National");
        } else {
            updateCategories = mainCategories;
        }
        setCategories(updateCategories);
    }, [language]);

    return (
        <div className={`navbar ${!displayNavbar && "close-navbar"}`}>
            <div className="language">
                <NavLink to={`/en/${currPath}`} id="en" onClick={languageHandler}>English</NavLink>
                <NavLink to={`/hi/${currPath}`} id="hi" onClick={languageHandler}>हिन्दी</NavLink>
            </div>
            <hr />
            <span className="nav-heading">{language === "hi" ? "श्रेणियां" : "Categories"}</span>
            <div className="categories">
                {categories.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/${language}/${category.english.toLowerCase()}`}
                        onClick={categoryClicked}
                    >
                        {language === "hi" ? category.hindi : category.english === "National" ? "India" : category.english}
                    </NavLink>
                ))}
            </div>
            <hr />
            {!isLoggedIn && (
                <div className="admin-login">
                    <NavLink to={`/${language}/signup`} onClick={categoryClicked}>
                        {language === "hi" ? "साइन अप" : "Sign Up"}
                    </NavLink>
                </div>
            )}
            
            <div className="admin-login">
                {isLoggedIn ? (
                    <NavLink to={`/${language}/general`} onClick={handleLogout}>
                        {language === "hi" ? "लॉग आउट" : "Logout"}
                    </NavLink>
                ) : (
                    <NavLink to={`/${language}/login`} onClick={categoryClicked}>
                        {language === "hi" ? "लॉग इन" : "Login"}
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
