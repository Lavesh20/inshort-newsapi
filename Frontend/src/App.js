import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Slider from 'react-slick';
import { useContext, useRef } from 'react';
import { MyContext } from './CustomContext';
import MobileNav from './components/MobileNav/MobileNav';
import AddNewsApp from './pages/addnews/addnews'; // ✅ Correct import
import Login from './pages/login/login';
import Blog from './pages/blog/[id]/blog';
import Home from './pages/blogpage/BlogPage';
import BlogDetail from './pages/blog/[id]/blog';
import sampleBlogs from './components/blogs/sampledata';
import AdminBlogEditor from './pages/customBlog/AdminBlog';
import SignUpPage from './pages/signup/Signup';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/[token]/ResetPassword';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { SignIn, SignUp } from '@clerk/clerk-react';
import LoginPage from './pages/login/login';
import NewsAdminDashboard from './pages/getAllNews/GetAllNews';
import TermsOfService from './pages/termsAndService/TermsAndService';
import PrivacyPolicy from './pages/termsAndService/PrivacyPolicy';
import AdminBlogManagement from './pages/getAllBlogs/GetAllBlogs';
import { Disc } from 'lucide-react';
import AboutUs from './pages/termsAndService/Aboutus';
import DisclaimerComponent from './pages/termsAndService/Disclaimer';




function App() {
  const myContext = useContext(MyContext);
  const { language, currPath, isMobileDevice, setHideHeader, setArticles, sliderRef, hindiBookmarkArticles, englishBookmarkArticles } = myContext;
  const mobileRef = useRef();

  const slideHandler = (slideNum) => {
    if (slideNum == 1) {
      mobileRef.current.scrollTo(0, 0);
      setHideHeader(false);
    }
    else {
      if (currPath == 'bookmarks') {
        if (language === 'hi') setArticles(hindiBookmarkArticles);
        else setArticles(englishBookmarkArticles);
      }
    }
  }

  const sliderSettings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    afterChange: slideHandler
  }

  return (
    <div className="App">

      {isMobileDevice ? (
        <Slider {...sliderSettings} ref={sliderRef}>
          <MobileNav mobileRef={mobileRef} />

          <Routes>
            <Route path={'/'} element={<News />} />
            <Route path={'/en/:category'} element={<News />} />
            <Route path={'/hi/:category'} element={<News />} />
            <Route path={'/en/addnews'} element={<AddNewsApp />} />
            <Route path={'/en/loginwithclerk'} element={<SignIn/>} />
            <Route path={'/en/login'} element={<LoginPage/>} />
            <Route path={'/en/forgot-password'} element={<ForgotPassword/>} />
            <Route path="/en/reset-password/:token" element={<ResetPassword />} />
            <Route path={'/en/signupwithclerk'} element={<SignUp/>} />
            <Route path={'/en/signup'} element={<SignUpPage/>} /> 
            <Route path={'/en/admin'} element={<AdminLogin/>} /> 
            <Route path={'/en/admin/dashboard'} element={<AdminDashboard/>} /> 
            <Route path={'/en/blogs'} element={<Home/>} />
            <Route path={'/en/blogs/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/hi/blogs'} element={<Blog />} />
            <Route path={'/hi/blogs/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/en/customblog'} element={<AdminBlogEditor/>} />
            <Route path={'/en/getallnews'} element={<NewsAdminDashboard />} />
            <Route path={'/en/getallblogs'} element={<AdminBlogManagement />} />
            <Route path={'/en/termsofservice'} element={<TermsOfService />} />
            <Route path={'/en/privacypolicy'} element={<PrivacyPolicy />} />
            <Route path={'/en/disclaimer'} element={<DisclaimerComponent/>} />
            <Route path={'/en/aboutus'} element={<AboutUs/>} />
            <Route path={'*'} element={<News />} />
          </Routes>
        </Slider>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path={'/'} element={<News />} />
            <Route path={'/en/:category'} element={<News />} />
            <Route path={'/hi/:category'} element={<News />} />
            <Route path={'/en/addnews'} element={<AddNewsApp />} /> {/* ✅ AddNews Route */}
            <Route path={'/en/customblog'} element={<AdminBlogEditor/>} />
            <Route path={'/en/loginwithcleark'} element={<SignIn/>} />
            <Route path={'/en/login'} element={<LoginPage/>} />
            <Route path={'/en/admin'} element={<AdminLogin/>} /> 
            <Route path={'/en/admin/dashboard'} element={<AdminDashboard/>} /> 
            <Route path={'/en/forgot-password'} element={<ForgotPassword/>} />
            <Route path="/en/reset-password/:token" element={<ResetPassword />} />
            <Route path={'/en/signupwithclerk'} element={<SignUp/>} />
            <Route path={'/en/signup'} element={<SignUpPage/>} /> 
            <Route path={'/en/blogs'} element={<Home />} />
            <Route path={'/en/blogs/:blogId'}element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/hi/blogs'} element={<Blog />} />
            <Route path={'/hi/blogs/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/en/getallnews'} element={<NewsAdminDashboard />} />
            <Route path={'/en/getallblogs'} element={<AdminBlogManagement />} />
            <Route path={'/en/termsofservice'} element={<TermsOfService />} />
            <Route path={'/en/privacypolicy'} element={<PrivacyPolicy />} />
            <Route path={'/en/disclaimer'} element={<DisclaimerComponent/>} />
            <Route path={'/en/aboutus'} element={<AboutUs/>} />
            <Route path={'*'} element={<News />} />
          </Routes>
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;
