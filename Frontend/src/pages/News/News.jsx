import React, { useContext, useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyContext } from "../../CustomContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

const validQueries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology", "bookmarks"];
let totalArticles;
let pageNum = 1;

let timeOut;
const apiKeys = ["98fde2a504644a46bcef0ffa683bcd55"];
let apiKeyIndex = 0;
// Your backend URL to fetch custom news
const CUSTOM_NEWS_API = "http://localhost:5000"; // Change this to your actual backend base URL

const News = () => {
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [networkErr, setNetworkErr] = useState(false);
    const [bookmarkMsg, setBookmarkMsg] = useState("News Bookmarked");
    const [displayBookmarkMsg, setDisplayBookmarkMsg] = useState(false);
    

    const bookmarkMsgHandler = (message) => {
        setBookmarkMsg(message);
        setDisplayBookmarkMsg(true);

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            setDisplayBookmarkMsg(false);
        }, 3000);
    }

    const myContext = useContext(MyContext);
    const { language, setCurrPath, isMobileDevice, setHideHeader, articles, setArticles, windowHeight, hindiBookmarkArticles, englishBookmarkArticles } = myContext;

    const navigate = useNavigate();
    const params = useParams();
    let category = params.category;

    if (category === "national" || category === "international") {
        category = "general";
    }

    const apiCall = async (page = 1, append = false) => {
        if (!append) {
            setLoader(true);
        } else {
            setLoadingBtn(true);
        }
        setNetworkErr(false);
        
        try {
            // 1. Fetch news from the NewsAPI
            let result;
            try {
                result = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=10&language=${language}&country=${params.category === "national" ? "in" : "us"}&apiKey=${apiKeys[apiKeyIndex]}`);
                console.log(result.data);
            } catch (err) {
                console.log("Error with API key:", err);
                if (err.message === "Network Error") {
                    setNetworkErr(true);
                    setLoader(false);
                    setLoadingBtn(false);
                    return;
                }
                // If API key fails, set empty result
                result = { data: { articles: [], totalResults: 0 } };
            }

            let apiArticles = result.data.articles || [];
            let finalArticles = apiArticles;
            totalArticles = result.data.totalResults || 0;

            // 2. Try to fetch custom news from your backend based on category
            try {
                // Use the route format from your backend code: /:category?
                const customNewsResult = await axios.get(`${CUSTOM_NEWS_API}/api/news/${params.category || ''}`);
                console.log("Custom news response:", customNewsResult.data);
                
                // Your backend returns the news array directly
                const customArticles = customNewsResult.data || [];
                
                // Only combine if there are custom articles
                if (customArticles && customArticles.length > 0) {
                    // Make sure custom news format matches what NewsArticle component expects
                    const formattedCustomArticles = customArticles.map(article => {
                        return {
                            title: article.title || 'No Title',
                            description: article.description || 'No Description',
                            url: article.url || '#',
                            // Ensure the image is properly formatted
                            image: article.image && !article.image.startsWith("http")
                                ? `${CUSTOM_NEWS_API}${article.image.trim()}`  // Convert relative to absolute
                                : article.image || '/default-image.jpg', // Fallback image
                            publishedAt: article.publishedAt || article.createdAt || new Date().toISOString(),
                            source: {
                                name: article.source?.name || article.by || 'Custom News',
                                url: article.source?.url || '#'
                            },
                            isCustom: true
                        };
                    });
                    
                    if (append) {
                        // For load more, we only need to append the API articles, since custom news is already loaded
                        finalArticles = apiArticles;
                    } else {
                        // For initial load, combine API and custom articles
                        finalArticles = [...apiArticles, ...formattedCustomArticles];
                        totalArticles += formattedCustomArticles.length;
                    }
                }
            } catch (customErr) {
                console.log("No custom news available or error fetching them:", customErr);
                console.error(customErr);
                // Continue with just the API articles
            }
            
            // Set the articles (either just API or combined with custom)
            if (append) {
                setArticles(prevArticles => [...prevArticles, ...finalArticles]);
            } else {
                setArticles(finalArticles);
            }
            
            if (page * 10 >= totalArticles) {
                setDisplayLoadMore(false);
            } else {
                setDisplayLoadMore(true);
            }
            
            setLoader(false);
            setLoadingBtn(false);
        } catch (err) {
            console.error("Error fetching news:", err);
            setNetworkErr(true);
            setLoader(false);
            setLoadingBtn(false);
        }
    }

    useEffect(() => {
        setDisplayLoadMore(true);
        pageNum = 1; // Reset page number when category or language changes
        
        if (params.category === undefined || !validQueries.includes(params.category)) {
            navigate(`/${language}/general`);
        }
        else if (params.category === 'bookmarks') {
            const bookmarksArticle = language === 'hi' ? hindiBookmarkArticles : englishBookmarkArticles;
            setLoader(true);
            setNetworkErr(false);
            setDisplayLoadMore(false);

            setTimeout(() => {
                setArticles(bookmarksArticle);
                setLoader(false);
            }, 500);

            document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        else {
            apiCall(1, false);
            document.title = (params.category === "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase()) + " NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        window.scrollTo(0, 0);
        setHideHeader(false);

    }, [params.category, language]);

    const loadMoreArticles = () => {
        pageNum += 1;
        apiCall(pageNum, true);
    }

    // For mobile: Handle loading more slides when user reaches the end of current slides
    const handleAfterChange = (currentSlide) => {
        // If we're near the end of the available slides, load more
        if (isMobileDevice && currentSlide >= articles.length - 2 && !loadingBtn && displayLoadMore) {
            loadMoreArticles();
        }
    };

    const slideScrollHandler = (oldIndex, newIndex) => {
        if (oldIndex > newIndex) {
            setHideHeader(false);
        }
        else {
            setHideHeader(true);
        }
    }

    const sliderSettings = {
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: slideScrollHandler,
        afterChange: handleAfterChange
    }

    return (
        <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
            {isMobileDevice && <Header />}
            {
                loader ? <Spinner />
                    :
                    networkErr ? <span className="network-err">{language === 'hi' ? 'अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।' : 'Check your internet connection and try again.'}</span>
                        :
                        articles.length === 0 ?
                            <div className="bookmarks-err">
                                <p>{language === 'hi' ? 'कोई बुकमार्क समाचार उपलब्ध नहीं हैं' : 'No bookmark news are available'}</p>
                                <Link to={`/${language}/general`}>Load News</Link>
                            </div>
                            :
                            isMobileDevice ?
                                <>
                                    <Slider {...sliderSettings} className="articles">
                                        {
                                            articles.map((article, index) => {
                                                return <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />
                                            })
                                        }
                                    </Slider>
                                    {loadingBtn && <div className="mobile-loader"><Spinner /></div>}
                                    <span className={`bookmark-message ${displayBookmarkMsg && 'd-item'}`}>{bookmarkMsg}</span>
                                </>
                                :
                                <>
                                    <div className="articles">
                                        {
                                            articles.map((article, index) => {
                                                return <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />
                                            })
                                        }
                                    </div>

                                    {
                                        loadingBtn ? <Spinner />
                                            :
                                            displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>
                                                {language === 'hi' ? 'और समाचार लोड करें' : 'Load More News'}
                                            </button>
                                    }
                                </>
            }
            {isMobileDevice && <Footer />}
        </div>
    )
}

export default News;