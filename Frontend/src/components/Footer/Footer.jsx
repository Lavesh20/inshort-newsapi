import React, { useContext } from "react";
import './Footer.scss';
import logo from '../../utilities/images/inshorts-logo-white.png';
import contact from '../../utilities/images/contact-us.png';
import { MyContext } from "../../CustomContext";

const Footer = () => {
    const myContext = useContext(MyContext);
    const { isMobileDevice, hideHeader } = myContext;

    return (
        <footer className={`footer-container ${isMobileDevice && "mobile-footer-container"} ${hideHeader && "hide-footer"}`}>
            {isMobileDevice ?
                <div className="footer">Created by <a className="creator" href="https://www.linkedin.com/in/dipayanmaji/" target="_blank">DipAYAN</a></div>
                :
                <div className="footer">
                    <div className="left-part">
                        <div className="container">
                            <img src={logo} alt="Inshorts Clone" />

                            <div className="copyright">
                                <b>Inshorts Clone</b>
                                <br />
                                Created by <a className="creator" href='https://www.linkedin.com/in/lavesh-vyas/' target='_blank'>Lavesh Vyas</a>
                                <br />
                                ©COPYRIGHT 2025
                            </div>
                        </div>

                        <span className="divider"></span>

                        <div className="container">
                            <a href="mailto:laveshvyas20@gmail.com"><img src={contact} alt="Contact Us" /></a>

                            <div className="terms-condition">
                                <a href="https://inshorts.com/tnc" target="_blank">Terms & conditions</a>
                                <a href="https://inshorts.com/tnc" target="_blank">Privacy Policies</a>
                            </div>
                        </div>
                    </div>

                    <div className="right-part">
                        <a href='#' target='_blank'><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href='#' target='_blank'><i className="fa-brands fa-github"></i></a>
                        <a href='#' target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
                        <a href='#' target='_blank'><i className="fa-brands fa-instagram"></i></a>
                        <a href='#' target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                </div>}
        </footer>
    )
}

export default Footer;