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
//                 src={article.photo }

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

// Update to NewsArticle.jsx to fix image display issues

import React, { useState, useEffect, useRef, useContext } from "react";
import './NewsArticle.scss';
import { getDate } from "../../utilities/convertToDate";
import { MyContext } from "../../CustomContext";
import { BackgroundImage } from "react-image-and-background-image-fade";

const NewsArticle = ({ article, bookmarkMsgHandler }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const imgRef = useRef(null);

  const myContext = useContext(MyContext);
  const {
    language, isMobileDevice, hideHeader, setHideHeader, windowHeight,
    articles, hindiBookmarkArticles, setHindiBookmarkArticles,
    englishBookmarkArticles, setEnglishBookmarkArticles
  } = myContext;

  const { hours, minutes, meridiem, day, date, month, year } = getDate(article?.publishedAt || new Date());

  const articleHandler = () => {
    if (isMobileDevice) setHideHeader(!hideHeader);
  };

  const bookmarksHandler = (e) => {
    e.stopPropagation();

    const updateBookmarks = (bookmarks, setBookmarks) => {
      if (isBookmark) {
        setIsBookmark(false);
        bookmarkMsgHandler("Bookmark Removed");
        setBookmarks(bookmarks.filter(eachArticle => eachArticle.title !== article.title));
      } else {
        setIsBookmark(true);
        bookmarkMsgHandler("News Bookmarked");
        setBookmarks([...bookmarks, article]);
      }
    };

    if (language === 'hi') {
      updateBookmarks(hindiBookmarkArticles, setHindiBookmarkArticles);
    } else {
      updateBookmarks(englishBookmarkArticles, setEnglishBookmarkArticles);
    }
  };

  // Set proper image URL from available sources
  useEffect(() => {

    console.log("Article received in NewsArticle:", article);
  console.log("Available image fields:", {
    photo: article.photo,
    image: article.image,
    urlToImage: article.urlToImage
  });
    // Define a fallback image
    const fallback = 'https://via.placeholder.com/800x400?text=No+Image+Available';
    
    // Handle Cloudinary URLs or other URL formats
    let url;
    
    // First check for photo from Cloudinary (our custom news)
    if (article?.photo && typeof article.photo === 'string') {
      url = article.photo; // Already a full URL from Cloudinary
    } 
    // Then try API news sources
    else if (article?.urlToImage) {
      url = article.urlToImage;
    }
    else if (article?.image) {
      url = article.image;
    }
    // Finally use fallback
    else {
      url = fallback;
    }
    
    console.log("Image source for article:", article?.title, url);
    setImageUrl(url);
  }, [article]);

  // Check if already bookmarked
  useEffect(() => {
    const bookmarked = (language === 'hi' ? hindiBookmarkArticles : englishBookmarkArticles)
      .some(eachArticle => eachArticle.title === article.title);
    setIsBookmark(bookmarked);
  }, [articles, language, hindiBookmarkArticles, englishBookmarkArticles]);

  return (
    <div className={`news-article ${isMobileDevice ? "mobile-news-article" : ""}`} onClick={articleHandler} style={{ height: isMobileDevice ? windowHeight : 'auto' }}>
      
      {/* Image Rendering with BackgroundImage component */}
      {!imageError ? (
        <BackgroundImage
          className="article-image"
          src={imageUrl}
          lazyLoad
          onError={() => {
            console.error("BackgroundImage failed to load:", imageUrl);
            setImageError(true);
          }}
        />
      ) : (
        <div
          className="article-image"
          style={{
            backgroundImage: `url(https://via.placeholder.com/800x400?text=Image+Not+Available)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        />
      )}

      <div className="content">
        {isMobileDevice ? (
          <span className={`title ${isBookmark ? 'bookmark-article' : ''}`} onClick={bookmarksHandler}>
            {article.title}
          </span>
        ) : (
          <a className="title" href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        )}

        <span className="author-time">
          <b>short</b> by {article.source?.name || 'Unknown Source'} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}
        </span>

        <p className="description">{article.description}</p>

        <span className="source">
          read more at <a href={article.url} target="_blank" rel="noopener noreferrer" className="name">
            {article.source?.name || 'Source'}
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

          <section className={`bookmark ${isBookmark ? 'bookmark-article' : ''}`} onClick={bookmarksHandler}>
            {isBookmark ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
            <span>{language === 'hi' ? 'बुकमार्क' : 'Bookmark'}</span>
          </section>
        </div>
      )}
    </div>
  );
};

export default NewsArticle;