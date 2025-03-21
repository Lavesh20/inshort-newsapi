// import React, { useContext, useEffect, useState } from "react";
// import './News.scss';
// import axios from "axios";
// import NewsArticle from "../../components/NewsArticle/NewsArticle";
// import { useNavigate, useParams } from "react-router";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MyContext } from "../../CustomContext";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import Spinner from "../../components/Spinner/Spinner";

// const validQueries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology", "bookmarks"];
// let totalArticles;
// let pageNum = 1;
// let timeOut;

// // API Keys (you can add multiple keys for failover)
// const apiKeys = ["98fde2a504644a46bcef0ffa683bcd55"];
// let apiKeyIndex = 0;

// // Backend API URL
// const CUSTOM_NEWS_API = "http://localhost:5000"; // Replace with your actual backend URL

// const News = () => {
//     const [displayLoadMore, setDisplayLoadMore] = useState(true);
//     const [loader, setLoader] = useState(true);
//     const [loadingBtn, setLoadingBtn] = useState(false);
//     const [networkErr, setNetworkErr] = useState(false);
//     const [bookmarkMsg, setBookmarkMsg] = useState("News Bookmarked");
//     const [displayBookmarkMsg, setDisplayBookmarkMsg] = useState(false);

//     const myContext = useContext(MyContext);
//     const { language, setCurrPath, isMobileDevice, setHideHeader, articles, setArticles, windowHeight, hindiBookmarkArticles, englishBookmarkArticles } = myContext;

//     const navigate = useNavigate();
//     const params = useParams();
//     let category = params.category;

//     // Fix: Do not map "international" to "general"
//     if (category === "international") {
//         category = "international"; // Keep it as "international"
//     }

//     const bookmarkMsgHandler = (message) => {
//         setBookmarkMsg(message);
//         setDisplayBookmarkMsg(true);

//         clearTimeout(timeOut);
//         timeOut = setTimeout(() => {
//             setDisplayBookmarkMsg(false);
//         }, 3000);
//     }

//     const apiCall = async (page = 1, append = false) => {
//         if (!append) {
//             setLoader(true);
//         } else {
//             setLoadingBtn(true);
//         }
//         setNetworkErr(false);

//         try {
//             let result;
//             try {
//                 // Fetch news from API (all available sources for India)
//                 let countryCode = params.category === "national" ? "in" : "us";
//                 result = await axios.get(
//                     `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=10&language=${language}&country=${countryCode}&apiKey=${apiKeys[apiKeyIndex]}`
//                 );
//                 console.log("NewsAPI Response:", result.data);
//             } catch (err) {
//                 console.log("Error with API key:", err);
//                 if (err.message === "Network Error") {
//                     setNetworkErr(true);
//                     setLoader(false);
//                     setLoadingBtn(false);
//                     return;
//                 }
//                 result = { data: { articles: [], totalResults: 0 } };
//             }

//             let apiArticles = result.data.articles || [];
//             totalArticles = result.data.totalResults || 0;

//             // Fetch custom news from backend
//             try {
//                 const customNewsResult = await axios.get(`${CUSTOM_NEWS_API}/api/news/${params.category || ''}`);
//                 console.log("Custom news response:", customNewsResult.data);

//                 const customArticles = customNewsResult.data || [];
//                 if (customArticles.length > 0) {
//                     const formattedCustomArticles = customArticles.map(article => ({
//                         title: article.title || 'No Title',
//                         description: article.description || 'No Description',
//                         url: article.url || '#',
//                         image: article.image?.startsWith("http") ? article.image : `${CUSTOM_NEWS_API}${article.image?.trim()}` || '/default-image.jpg',
//                         publishedAt: article.publishedAt || article.createdAt || new Date().toISOString(),
//                         source: {
//                             name: article.source?.name || article.by || 'Custom News',
//                             url: article.source?.url || '#'
//                         },
//                         isCustom: true
//                     }));

//                     if (!append) {
//                         apiArticles = [...apiArticles, ...formattedCustomArticles];
//                         totalArticles += formattedCustomArticles.length;
//                     }
//                 }
//             } catch (customErr) {
//                 console.error("Error fetching custom news:", customErr);
//             }

//             if (append) {
//                 setArticles(prevArticles => [...prevArticles, ...apiArticles]);
//             } else {
//                 setArticles(apiArticles);
//             }

//             setDisplayLoadMore(page * 10 < totalArticles);
//             setLoader(false);
//             setLoadingBtn(false);
//         } catch (err) {
//             console.error("Error fetching news:", err);
//             setNetworkErr(true);
//             setLoader(false);
//             setLoadingBtn(false);
//         }
//     };

//     useEffect(() => {
//         setDisplayLoadMore(true);
//         pageNum = 1;

//         if (params.category === undefined || !validQueries.includes(params.category)) {
//             navigate(`/${language}/general`);
//         } else if (params.category === 'bookmarks') {
//             const bookmarksArticle = language === 'hi' ? hindiBookmarkArticles : englishBookmarkArticles;
//             setLoader(true);
//             setNetworkErr(false);
//             setDisplayLoadMore(false);

//             setTimeout(() => {
//                 setArticles(bookmarksArticle);
//                 setLoader(false);
//             }, 500);

//             document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
//             setCurrPath(params.category);
//         } else {
//             apiCall(1, false);
//             document.title = `${params.category === "general" ? "TOP HEADLINES" : params.category.toUpperCase()} NEWS || INSHORTS CLONE`;
//             setCurrPath(params.category);
//         }
//         window.scrollTo(0, 0);
//         setHideHeader(false);
//     }, [params.category, language]);

//     const loadMoreArticles = () => {
//         pageNum += 1;
//         apiCall(pageNum, true);
//     };

//     return (
//         <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
//             {isMobileDevice && <Header />}
//             {loader ? <Spinner /> :
//                 networkErr ? <span className="network-err">Check your internet connection and try again.</span> :
//                     articles.length === 0 ?
//                         <div className="bookmarks-err">
//                             <p>No bookmark news available</p>
//                             <Link to={`/${language}/general`}>Load News</Link>
//                         </div>
//                         :
//                         <div className="articles">
//                             {articles.map((article, index) => <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />)}
//                         </div>
//             }
//             {displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>Load More News</button>}
//             {isMobileDevice && <Footer />}
//         </div>
//     );
// };

// export default News;

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

const validQuaries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology", "bookmarks"];
let totalArticles;
let pageNum;

let timeOut;
// get apikey from https://gnews.io/
let apiKey = "aa9c04bf0f87a6cb98e5baa034ac6998";

// Your backend URL to fetch custom news
const CUSTOM_NEWS_API = "http://localhost:5000"; // Change this to your actual backend base URL

const News = () => {
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);
    const [networkErr, setNetworkErr] = useState(false);
    const [bookmarkMsg, setBookmarkMsg] = useState("News Bookmarked");
    const [displayBookmarkMsg, setDisplayBookmarkMsg] = useState(false);
    // Filter state: "all", "custom", "api"
    const [filter, setFilter] = useState("all");
    // Store original articles to apply filters
    const [allArticles, setAllArticles] = useState([]);

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

    if (category == "national" || category == "international") {
        category = "general";
    }

    // Apply filter to articles
    const applyFilter = (filter, articlesList) => {
        switch(filter) {
            case "custom":
                return articlesList.filter(article => article.isCustom === true);
            case "api":
                return articlesList.filter(article => !article.isCustom);
            default:
                return articlesList;
        }
    };

    const apiCall = async () => {
        setLoader(true);
        setNetworkErr(false);
        
        try {
            // 1. Fetch news from the GNews API
            let result;
            try {
                result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
            }
            catch (err) {
                // Fallback API keys logic
                console.log("expired 1st apikey");
                try {
                    apiKey = "239eafb61b40e1419a2bcd08e20492f7";
                    result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                }
                catch (err2) {
                    console.log("expired 2nd apikey");
                    try {
                        apiKey = "743d722dd292a77769e54e8d6aeb5475";
                        result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                    }
                    catch (err3) {
                        console.log("expired 3rd apikey");
                        try {
                            apiKey = "606ac7501ef2bd39836d80bceb5f32ec";
                            result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                        }
                        catch (err4) {
                            console.log("expired 4th apikey");
                            try {
                                apiKey = "611a1fcfe8a977c10b329207423901ff";
                                result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                            }
                            catch (err5) {
                                console.log("expired 5th apikey");
                                if (err5.message === "Network Error") {
                                    setNetworkErr(true);
                                    setLoader(false);
                                    return;
                                }
                                // If all API keys fail, set empty result
                                result = { data: { articles: [], totalArticles: 0 } };
                            }
                        }
                    }
                }
            }

            let apiArticles = result.data.articles || [];
            apiArticles = apiArticles.map(article => ({...article, isCustom: false}));
            let finalArticles = apiArticles;
            totalArticles = result.data.totalArticles || 0;

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
                    
                    
                    finalArticles = [...apiArticles, ...formattedCustomArticles];
                    totalArticles += formattedCustomArticles.length;
                }
            } catch (customErr) {
                console.log("No custom news available or error fetching them:", customErr);
                console.error(customErr);
                // Continue with just the API articles
            }
            
            // Set all articles for filtering
            setAllArticles(finalArticles);
            
            // Apply the current filter
            const filteredArticles = applyFilter(filter, finalArticles);
            setArticles(filteredArticles);
            
            if (pageNum * 10 >= totalArticles) {
                setDisplayLoadMore(false);
            }
            
            setLoader(false);
        } catch (err) {
            console.error("Error fetching news:", err);
            setNetworkErr(true);
            setLoader(false);
        }
    }

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        const filteredArticles = applyFilter(newFilter, allArticles);
        setArticles(filteredArticles);
        
        // Show/hide load more based on current filter
        if (newFilter === "custom" || newFilter === "api") {
            setDisplayLoadMore(false);
        } else if (pageNum * 10 < totalArticles) {
            setDisplayLoadMore(true);
        }
    };

    useEffect(() => {
        setDisplayLoadMore(true);
        
        if (params.category == undefined || !validQuaries.includes(params.category)) {
            navigate(`/${language}/general`);
        }
        else if (params.category == 'bookmarks') {
            const bookmarksArticle = language == 'hi' ? hindiBookmarkArticles : englishBookmarkArticles;
            setLoader(true);
            setNetworkErr(false);
            setDisplayLoadMore(false);

            setTimeout(() => {
                setAllArticles(bookmarksArticle);
                setArticles(bookmarksArticle);
                setLoader(false);
            }, 500);

            document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        else {
            pageNum = 1;
            apiCall();
            document.title = (params.category == "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase()) + " NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        window.scrollTo(0, 0);
        setHideHeader(false);

    }, [params.category, language])

    // Reset filter when category changes
    useEffect(() => {
        setFilter("all");
    }, [params.category]);

    // Re-apply filter when all articles change
    useEffect(() => {
        const filteredArticles = applyFilter(filter, allArticles);
        setArticles(filteredArticles);
    }, [filter, allArticles]);

    const loadMoreArticles = async () => {
        setLodingBtn(true);
        pageNum += 1;
        
        try {
            // Just load more from GNews API
            let result;
            try {
                result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
            } catch (err) {
                console.log("apikey validity expired");
                result = { data: { articles: [] } };
            }
            
            const newApiArticles = result.data.articles || [];
            const newApiArticlesWithFlag = newApiArticles.map(article => ({...article, isCustom: false}));
            
            // Update all articles
            const updatedAllArticles = [...allArticles, ...newApiArticlesWithFlag];
            setAllArticles(updatedAllArticles);
            
            // Apply current filter to the updated list
            if (filter === "all" || filter === "api") {
                setArticles([...articles, ...newApiArticlesWithFlag]);
            }
            
            if (pageNum * 10 >= totalArticles) {
                setDisplayLoadMore(false);
            }
        } catch (error) {
            console.error("Error loading more articles:", error);
        }
        
        setLodingBtn(false);
    }

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
    }

    // Count custom news
    const customNewsCount = allArticles.filter(article => article.isCustom === true).length;
    const apiNewsCount = allArticles.filter(article => !article.isCustom).length;

    return (
        <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
            {isMobileDevice && <Header />}
            {
                loader ? <Spinner />
                    :
                    networkErr ? <span className="network-err">{language == 'hi' ? 'अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।' : 'Check your internet connection and try again.'}</span>
                        :
                        articles.length == 0 ?
                            <div className="bookmarks-err">
                                <p>{language == 'hi' ? 'कोई बुकमार्क समाचार उपलब्ध नहीं हैं' : 'No bookmark news are available'}</p>
                                <Link to={`${language}/general`}>Load News</Link>
                            </div>
                            :
                            <>
                                {/* Filter controls */}
                                <div className="filter-controls">
                                    <button 
                                        className={`filter-btn ${filter === "all" ? "active" : ""}`} 
                                        onClick={() => handleFilterChange("all")}
                                    >
                                        All News ({allArticles.length})
                                    </button>
                                    <button 
                                        className={`filter-btn ${filter === "custom" ? "active" : ""}`} 
                                        onClick={() => handleFilterChange("custom")}
                                        disabled={customNewsCount === 0}
                                    >
                                        Custom News ({customNewsCount})
                                    </button>
                                    <button 
                                        className={`filter-btn ${filter === "api" ? "active" : ""}`} 
                                        onClick={() => handleFilterChange("api")}
                                        disabled={apiNewsCount === 0}
                                    >
                                        API News ({apiNewsCount})
                                    </button>
                                </div>

                                {isMobileDevice ?
                                    <>
                                        <Slider {...sliderSettings} className="articles">
                                            {
                                                articles.map((article, index) => {
                                                    return <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />
                                                })
                                            }
                                        </Slider>

                                        <span className={`bookmark-message ${displayBookmarkMsg && 'd-item'}`}>{bookmarkMsg}</span>
                                    </>
                                    :
                                    <>
                                        <div className="articles">
                                            {
                                                articles.map((article, index) => {
                                                    return <NewsArticle key={index} article={article} />
                                                })
                                            }
                                        </div>

                                        {
                                            lodingBtn ? <Spinner />
                                                :
                                                displayLoadMore && filter === "all" && <button className="load-more" onClick={loadMoreArticles}>Load More</button>
                                        }
                                    </>
                                }
                            </>
            }
            {isMobileDevice && <Footer />}
        </div>
    )
}

export default News;