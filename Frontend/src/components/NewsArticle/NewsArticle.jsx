// import React, { useContext, useEffect, useState } from "react";
// import './NewsArticle.scss';
// import { getDate } from "../../utilities/convertToDate";
// import { MyContext } from "../../CustomContext";
// import { BackgroundImage } from "react-image-and-background-image-fade";

// const NewsArticle = ({ article, bookmarkMsgHandler }) => {
//     const [isBookmark, setIsBookmark] = useState(false);

//     const myContext = useContext(MyContext);
//     const { language, isMobileDevice, hideHeader, setHideHeader, windowHeight, articles, hindiBookmarkArticles, setHindiBookmarkArticles, englishBookmarkArticles, setEnglishBookmarkArticles } = myContext;

//     const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);

//     const articleHandler = () => {
//         if (isMobileDevice)
//             setHideHeader(!hideHeader);
//     }

//     const bookmarksHandler = (e) => {
//         e.stopPropagation();

//         if (isBookmark) { //bookmark removed
//             setIsBookmark(false);
//             bookmarkMsgHandler("Bookmark Removed");

//             let updatedBookmarksArticles;

//             if (language == 'hi') {
//                 updatedBookmarksArticles = hindiBookmarkArticles.filter((eachArticle) => {
//                     return eachArticle.title != article.title;
//                 });

//                 setHindiBookmarkArticles(updatedBookmarksArticles);
//             }
//             else {
//                 updatedBookmarksArticles = englishBookmarkArticles.filter((eachArticle) => {
//                     return eachArticle.title != article.title;
//                 });

//                 setEnglishBookmarkArticles(updatedBookmarksArticles);
//             }
//         }
//         else { // bookmark added
//             setIsBookmark(true);
//             bookmarkMsgHandler("News Bookmarked");

//             if (language == 'hi') {
//                 setHindiBookmarkArticles([...hindiBookmarkArticles, article]);
//             }
//             else {
//                 setEnglishBookmarkArticles([...englishBookmarkArticles, article]);
//             }
//         }
//     }

//     useEffect(() => {
//         if (language == 'hi') {
//             const isArticleBookmarked = hindiBookmarkArticles.filter((eachArticle) => {
//                 return eachArticle.title == article.title;
//             }).length;

//             if (isArticleBookmarked) setIsBookmark(true);
//         }
//         else {
//             const isArticleBookmarked = englishBookmarkArticles.filter((eachArticle) => {
//                 return eachArticle.title == article.title;
//             }).length;

//             if (isArticleBookmarked) setIsBookmark(true);
//         }
//     }, [articles, language, hindiBookmarkArticles, englishBookmarkArticles])

//     return (
//         <div className={`news-article ${isMobileDevice && "mobile-news-article"}`} onClick={articleHandler} style={{ height: isMobileDevice && windowHeight }}>
//             <BackgroundImage
//                 className={"article-image"}
//                 src={article.urlToImage || article.image}

//                 // src = {article.image}
//                 lazyLoad
//             />

//             <div className="content">
//                 {
//                     isMobileDevice ?
//                         <span className={`title ${isBookmark && 'bookmark-article'}`} onClick={bookmarksHandler}>{article.title}</span>
//                         :
//                         <a className={`title`} href={article.url} target="_blank">{article.title}</a>
//                 }
//                 <span className="author-time"><b>short</b> by {article.source.name} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}</span>
//                 <p className="description">{article.description}</p>
//                 <span className="source">read more at <a href={article.url} target="_blank" className="name">{article.source.name}</a></span>
//             </div>

//             {isMobileDevice && <div className="bottom-section">

//                 <section>
//                     <span>To see the full image</span><br />
//                     <a href={article.urlToImage || article.image} target="_blank" className="image-link">Tap here</a>

//                 </section>

//                 <section className={`bookmark ${isBookmark && 'bookmark-article'}`} onClick={bookmarksHandler}>
//                     {isBookmark ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
//                     <span>{language == 'hi' ? 'बुकमार्क' : 'Bookmark'}</span>
//                 </section>

//             </div>}
//         </div>
//     )
// }

// export default NewsArticle;

import React, { useContext, useEffect, useState } from "react";
import './NewsArticle.scss';
import { getDate } from "../../utilities/convertToDate";
import { MyContext } from "../../CustomContext";
import { BackgroundImage } from "react-image-and-background-image-fade";

const NewsArticle = ({ article, bookmarkMsgHandler }) => {
    const [isBookmark, setIsBookmark] = useState(false);

    const myContext = useContext(MyContext);
    const { 
        language, 
        isMobileDevice, 
        hideHeader, 
        setHideHeader, 
        windowHeight, 
        articles, 
        hindiBookmarkArticles, 
        setHindiBookmarkArticles, 
        englishBookmarkArticles, 
        setEnglishBookmarkArticles 
    } = myContext;

    const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);

    // ✅ Fix: Ensure correct image handling
    const imageUrl = article.photo || article.urlToImage || "/assets/default-news.jpg";  // Use default image if none exists

    const articleHandler = () => {
        if (isMobileDevice) setHideHeader(!hideHeader);
    };

    const bookmarksHandler = (e) => {
        e.stopPropagation();
        setIsBookmark(!isBookmark);
        bookmarkMsgHandler(isBookmark ? "Bookmark Removed" : "News Bookmarked");

        if (language === "hi") {
            setHindiBookmarkArticles(isBookmark ? 
                hindiBookmarkArticles.filter(eachArticle => eachArticle.title !== article.title) :
                [...hindiBookmarkArticles, article]
            );
        } else {
            setEnglishBookmarkArticles(isBookmark ? 
                englishBookmarkArticles.filter(eachArticle => eachArticle.title !== article.title) :
                [...englishBookmarkArticles, article]
            );
        }
    };

    useEffect(() => {
        const isArticleBookmarked = language === "hi" 
            ? hindiBookmarkArticles.some(eachArticle => eachArticle.title === article.title) 
            : englishBookmarkArticles.some(eachArticle => eachArticle.title === article.title);

        setIsBookmark(isArticleBookmarked);
    }, [articles, language, hindiBookmarkArticles, englishBookmarkArticles]);

    return (
        <div 
            className={`news-article ${isMobileDevice && "mobile-news-article"}`} 
            onClick={articleHandler} 
            style={{ height: isMobileDevice ? windowHeight : "auto" }}
        >
            <BackgroundImage
                className="article-image"
                src={imageUrl}
                lazyLoad
            />

            <div className="content">
                {isMobileDevice ? (
                    <span 
                        className={`title ${isBookmark && 'bookmark-article'}`} 
                        onClick={bookmarksHandler}
                    >
                        {article.title}
                    </span>
                ) : (
                    <a className="title" href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                    </a>
                )}
                <span className="author-time">
                    <b>short</b> by {article.source.name} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}
                </span>
                <p className="description">{article.description}</p>
                <span className="source">
                    read more at 
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="name">
                        {article.source.name}
                    </a>
                </span>
            </div>

            {isMobileDevice && (
                <div className="bottom-section">
                    <section>
                        <span>To see the full image</span><br />
                        <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="image-link">
                            Tap here
                        </a>
                    </section>

                    <section 
                        className={`bookmark ${isBookmark && 'bookmark-article'}`} 
                        onClick={bookmarksHandler}
                    >
                        {isBookmark ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                        <span>{language === "hi" ? "बुकमार्क" : "Bookmark"}</span>
                    </section>
                </div>
            )}
        </div>
    );
};

export default NewsArticle;