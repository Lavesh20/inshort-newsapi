import React, { useContext } from "react";
import './Footer.scss';
import logo from '../../utilities/images/sid4.png';
import contact from '../../utilities/images/contact-us.png';
import { MyContext } from "../../CustomContext";

const Footer = () => {
    const myContext = useContext(MyContext);
    const { isMobileDevice, hideHeader } = myContext;

    return (
        <footer className={`footer-container ${isMobileDevice && "mobile-footer-container"} ${hideHeader && "hide-footer"}`}>
            {isMobileDevice ?
                <div className="footer">Created by <a className="creator" href="https://www.linkedin.com/company/tickershorts" target="_blank">Sidhaant</a></div>
                :
                <div className="footer">
                    <div className="left-part">
                        <div className="container">
                            <img src={logo} alt="Inshorts Clone" className="logo" />

                            <div className="copyright">
                                <b>TickerShorts</b>
                                <br />
                                Created by <a className="creator" href='https://www.linkedin.com/company/tickershorts' target='_blank'>Sidhaant Jain</a>
                                <br />
                                ©COPYRIGHT 2025
                            </div>
                        </div>

                        <span className="divider"></span>

                        <div className="container">
                            <a href="mailto:tickershorts@gmail.com"><img src={contact} alt="Contact Us" /></a>

                            <div className="terms-condition">
                                <a href="https://inshorts.com/tnc" target="_blank">Terms & conditions</a>
                                <a href="https://inshorts.com/tnc" target="_blank">Privacy Policies</a>
                            </div>
                        </div>
                    </div>

                    <div className="right-part">
                        <a href='https://www.linkedin.com/company/tickershorts' target='_blank'><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href='https://whatsapp.com/channel/0029Vb1rtJ27T8bXkDv4m727' target='_blank'><i className="fa-brands fa-whatsapp"></i></a>
                        <a href='https://x.com/tickershorts' target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
                        <a href='https://www.instagram.com/tickershorts?igsh=a2g4cXRyamJlNXRv' target='_blank'><i className="fa-brands fa-instagram"></i></a>
                        <a href='#' target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfJdbQUxpPbS4BvANn2Q0l8EhKULuUYNXWemhOleoTMUUmhqA/viewform?usp=header' target='_blank'><i className="fa-regular fa-comment-dots"></i></a>
                        
                    </div>
                </div>}
        </footer>
    )
}

export default Footer;