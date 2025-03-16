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
            <Route path={'/en/login'} element={<Login/>} /> {/* ✅ AddNews Route */}
            <Route path={'/en/blog'} element={<Home/>} />
            <Route path={'/en/blog/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/hi/blog'} element={<Blog />} />
            <Route path={'/hi/blog/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
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

            <Route path={'/en/login'} element={<Login/>} />
            <Route path={'/en/blog'} element={<Home />} />
            <Route path={'/en/blog/:blogId'}element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'/hi/blog'} element={<Blog />} />
            <Route path={'/hi/blog/:blogId'} element={<BlogDetail blogs={sampleBlogs} />} />
            <Route path={'*'} element={<News />} />
          </Routes>
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;
