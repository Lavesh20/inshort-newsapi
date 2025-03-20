import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../CustomContext";

const mainCategories = [
    { english: "National", hindi: "भारत" },
    { english: "Business", hindi: "बिज़नेस" },
    { english: "Entertainment", hindi: "मनोरंजन" },
    { english: "Health", hindi: "स्वास्थ्य" },
    { english: "Science", hindi: "विज्ञान" },
    { english: "Sports", hindi: "खेल" },
    { english: "Technology", hindi: "तकनीकी" },
     {english : "Blogs" , hindi : "ब्लॉग्स"}
];

const Navbar = ({ displayNavbar, setDisplayNavbar }) => {
    const [categories, setCategories] = useState(mainCategories);
    const myContext = useContext(MyContext);
    const { language, setLanguage, currPath } = myContext;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

      // Check if user is logged in
      useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const categoryClicked = () => {
        setDisplayNavbar(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setDisplayNavbar(false);
        // You might want to redirect to home page or refresh the page here
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
                        to={`/${language}/${category.english.toLocaleLowerCase()}`}
                        onClick={categoryClicked}
                    >
                        {language === "hi" ? category.hindi : category.english === "National" ? "India" : category.english}
                    </NavLink>
                ))}
            </div>
            <hr />
            {!isLoggedIn && (
                <div className="admin-login">
                    <NavLink to="/en/signup" onClick={categoryClicked}>Sign Up</NavLink>
                </div>
            )}
            
            <div className="admin-login">
                {isLoggedIn ? (
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                ) : (
                    <NavLink to="/en/login" onClick={categoryClicked}>Login</NavLink>
                )}
            </div>
            {/* 
            <div className="blogs">
                <NavLink to="/blogs">Blogs</NavLink>
            </div>
            */}
        </div>
    );
};

export default Navbar;
