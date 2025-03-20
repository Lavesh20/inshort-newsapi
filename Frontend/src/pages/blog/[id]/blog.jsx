// import { useEffect, useState, useRef } from "react"
// import { useParams, Link } from "react-router-dom"
// import axios from "axios"

// function BlogDetail() {
//   const { blogId } = useParams()
//   const [blog, setBlog] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [readingProgress, setReadingProgress] = useState(0)
//   const articleRef = useRef(null)

//   // Define API base URL
//   const API_BASE_URL = "http://localhost:5000"

//   // Calculate reading time
//   const calculateReadingTime = (content) => {
//     if (!content) return "5 min read"

//     let wordCount = 0
//     if (Array.isArray(content)) {
//       content.forEach((section) => {
//         if (typeof section === "string") {
//           wordCount += section.split(/\s+/).length
//         } else if (section.paragraphs) {
//           section.paragraphs.forEach((para) => {
//             wordCount += para.split(/\s+/).length
//           })
//         } else if (section.text) {
//           wordCount += section.text.split(/\s+/).length
//         }
//       })
//     }

//     // Average reading speed: 200 words per minute
//     const minutes = Math.ceil(wordCount / 200)
//     return `${minutes} min read`
//   }

//   // Track scroll progress
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!articleRef.current) return

//       const element = articleRef.current
//       const totalHeight = element.clientHeight
//       const windowHeight = window.innerHeight
//       const scrollTop = window.scrollY || document.documentElement.scrollTop

//       if (totalHeight - windowHeight > 0) {
//         const progress = (scrollTop / (totalHeight - windowHeight)) * 100
//         setReadingProgress(Math.min(100, Math.max(0, progress)))
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [blog])

//   useEffect(() => {
//     // Scroll to top when blog changes
//     window.scrollTo(0, 0)

//     const fetchBlogDetails = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.get(`${API_BASE_URL}/api/blogs/${blogId}`)
//         console.log(response.data)
//         setBlog(response.data)
//       } catch (err) {
//         console.error("Error fetching blog:", err)
//         setError("Failed to load blog. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBlogDetails()
//   }, [blogId])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[70vh]">
//         <div className="flex flex-col items-center">
//           <div className="relative w-20 h-20">
//             <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
//             <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//           </div>
//           <p className="mt-6 text-gray-700 font-medium text-lg">Loading your article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-16 text-center">
//         <div className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow-lg">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Article</h3>
//             <p className="text-red-700 mb-6">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-16 text-center">
//         <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl shadow-lg">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-amber-800 mb-2">Blog Not Found</h3>
//             <p className="text-amber-700 mb-6">The article you're looking for doesn't exist or has been removed.</p>
//             <Link
//               to="/"
//               className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
//             >
//               Return to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const readingTime = calculateReadingTime(blog.content)

//   return (
//     <div className="bg-white min-h-screen" ref={articleRef}>
//       {/* Reading progress bar */}
//       <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
//         <div
//           className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
//           style={{ width: `${readingProgress}%` }}
//         ></div>
//       </div>

//       {/* Hero section with cover image */}
//       {blog.coverImage && (
//         <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
//           <div className="absolute inset-0 bg-black/30 z-10"></div>
//           <img
//             src={blog.coverImage.startsWith("http") ? blog.coverImage : `${API_BASE_URL}${blog.coverImage}`}
//             alt={blog.title}
//             className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-10000 animate-subtle-zoom"
//             style={{
//               objectPosition: "center",
//               imageRendering: "high-quality",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20"></div>

//           <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-30">
//             <div className="max-w-5xl mx-auto">
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {blog.categories &&
//                   blog.categories.map((category, index) => (
//                     <Link
//                       to={`/category/${category}`}
//                       key={index}
//                       className="inline-block px-4 py-1.5 text-xs font-semibold bg-blue-600/90 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
//                     >
//                       {category}
//                     </Link>
//                   ))}
//               </div>
//               <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-shadow-lg">
//                 {blog.title}
//               </h1>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm md:text-base text-gray-200">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     ></path>
//                   </svg>
//                   <span>
//                     {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400"></div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                   <span>{readingTime}</span>
//                 </div>
//                 <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400"></div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     ></path>
//                   </svg>
//                   <span>{blog.authorName}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* If no cover image, show header without image */}
//       {!blog.coverImage && (
//         <div className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
//           <div className="max-w-5xl mx-auto">
//             <div className="flex flex-wrap gap-2 mb-6">
//               {blog.categories &&
//                 blog.categories.map((category, index) => (
//                   <Link
//                     to={`/category/${category}`}
//                     key={index}
//                     className="inline-block px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
//                   >
//                     {category}
//                   </Link>
//                 ))}
//             </div>
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
//               {blog.title}
//             </h1>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm md:text-base text-gray-600">
//               <div className="flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   ></path>
//                 </svg>
//                 <span>
//                   {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400"></div>
//               <div className="flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <span>{readingTime}</span>
//               </div>
//               <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400"></div>
//               <div className="flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   ></path>
//                 </svg>
//                 <span>{blog.authorName}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-12">
//           {/* Table of contents - desktop sidebar */}
//           {blog.tableOfContents && blog.tableOfContents.length > 0 && (
//             <div className="hidden lg:block lg:col-span-3">
//               <div className="sticky top-8">
//                 <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//                     <svg
//                       className="w-5 h-5 mr-2 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 6h16M4 12h16M4 18h7"
//                       ></path>
//                     </svg>
//                     Table of Contents
//                   </h3>
//                   <nav className="space-y-1 mt-6">
//                     {blog.tableOfContents.map((item, index) => (
//                       <a
//                         key={index}
//                         href={`#section-${index + 1}`}
//                         className="group flex items-center py-3 px-4 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
//                       >
//                         <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium mr-3 group-hover:bg-blue-200 transition-colors duration-200">
//                           {index + 1}
//                         </span>
//                         <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
//                           {item}
//                         </span>
//                       </a>
//                     ))}
//                   </nav>
//                 </div>

//                 {/* Share buttons */}
//                 <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//                     <svg
//                       className="w-5 h-5 mr-2 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                       ></path>
//                     </svg>
//                     Share Article
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a94e0] transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                       </svg>
//                       <span className="text-sm font-medium">Twitter</span>
//                     </button>
//                     <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006699] transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                       </svg>
//                       <span className="text-sm font-medium">LinkedIn</span>
//                     </button>
//                   </div>
//                   <button className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <span className="text-sm font-medium">Copy Link</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Main content area */}
//           <div
//             className={`mt-6 lg:mt-0 ${blog.tableOfContents && blog.tableOfContents.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}`}
//           >
//             {/* Mobile table of contents */}
//             {blog.tableOfContents && blog.tableOfContents.length > 0 && (
//               <div className="lg:hidden mb-8 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
//                 <details className="group">
//                   <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-2">
//                     <h3 className="text-lg font-bold text-gray-900 flex items-center">
//                       <svg
//                         className="w-5 h-5 mr-2 text-blue-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 6h16M4 12h16M4 18h7"
//                         ></path>
//                       </svg>
//                       Table of Contents
//                     </h3>
//                     <span className="transition group-open:rotate-180">
//                       <svg
//                         fill="none"
//                         height="24"
//                         shapeRendering="geometricPrecision"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         viewBox="0 0 24 24"
//                         width="24"
//                       >
//                         <path d="M6 9l6 6 6-6"></path>
//                       </svg>
//                     </span>
//                   </summary>
//                   <nav className="mt-4 space-y-1">
//                     {blog.tableOfContents.map((item, index) => (
//                       <a
//                         key={index}
//                         href={`#section-${index + 1}`}
//                         className="group flex items-center py-3 px-4 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
//                       >
//                         <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium mr-3 group-hover:bg-blue-200 transition-colors duration-200">
//                           {index + 1}
//                         </span>
//                         <span className="font-medium">{item}</span>
//                       </a>
//                     ))}
//                   </nav>
//                 </details>
//               </div>
//             )}

//             {/* Blog content */}
//             <div className="prose prose-lg max-w-none">
//               {/* Handle different content structures */}
//               {blog.content &&
//                 Array.isArray(blog.content) &&
//                 blog.content.map((section, index) => {
//                   // Check if section is an object with title and paragraphs
//                   if (typeof section === "object" && section.title && section.paragraphs) {
//                     return (
//                       <div className="mb-12" key={index} id={`section-${index + 1}`}>
//                         <div className="flex items-center mb-6">
//                           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold mr-4">
//                             {index + 1}
//                           </div>
//                           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 scroll-mt-24">{section.title}</h2>
//                         </div>

//                         {section.paragraphs.map((paragraph, pIndex) => {
//                           // Every third paragraph, add a special highlight (for visual interest)
//                           if (pIndex > 0 && pIndex % 3 === 0) {
//                             return (
//                               <div
//                                 key={pIndex}
//                                 className="my-8 pl-4 border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg"
//                               >
//                                 <p className="text-gray-800 leading-relaxed italic">{paragraph}</p>
//                               </div>
//                             )
//                           }
//                           return (
//                             <p key={pIndex} className="mb-6 text-gray-700 leading-relaxed text-lg">
//                               {paragraph}
//                             </p>
//                           )
//                         })}
//                       </div>
//                     )
//                   }
//                   // If it's a simple string, render as paragraph
//                   else if (typeof section === "string") {
//                     return (
//                       <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
//                         {section}
//                       </p>
//                     )
//                   }
//                   // If it's an object with just text
//                   else if (typeof section === "object" && section.text) {
//                     return (
//                       <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
//                         {section.text}
//                       </p>
//                     )
//                   }
//                   // Fallback for any other structure
//                   return null
//                 })}
//             </div>

//             {/* Mobile share buttons */}
//             <div className="lg:hidden mt-10 mb-10">
//               <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     ></path>
//                   </svg>
//                   Share Article
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 mt-4">
//                   <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a94e0] transition-colors">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                     </svg>
//                     <span className="text-sm font-medium">Twitter</span>
//                   </button>
//                   <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006699] transition-colors">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     </svg>
//                     <span className="text-sm font-medium">LinkedIn</span>
//                   </button>
//                 </div>
//                 <button className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span className="text-sm font-medium">Copy Link</span>
//                 </button>
//               </div>
//             </div>

//             {/* Author information */}
//             <div className="mt-16 pt-8 border-t border-gray-200">
//               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl">
//                 <div className="flex-shrink-0 relative">
//                   {blog.author && blog.author.image ? (
//                     <img
//                       src={blog.author.image || "/placeholder.svg"}
//                       alt={blog.author.name || blog.authorName}
//                       className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
//                     />
//                   ) : (
//                     <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
//                       {blog.authorName?.charAt(0) || "A"}
//                     </div>
//                   )}
//                   <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="text-center sm:text-left">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                     Written by {blog.author?.name || blog.authorName}
//                   </h3>
//                   {blog.author?.bio && <p className="text-gray-600 mb-4 text-lg">{blog.author.bio}</p>}
//                   {blog.author?.company && (
//                     <p className="text-gray-500 mb-4">
//                       <span className="font-medium">Works at</span> {blog.author.company}
//                     </p>
//                   )}

//                   <div className="flex justify-center sm:justify-start space-x-4 mt-4">
//                     <button className="text-gray-500 hover:text-blue-600 transition p-2 bg-white rounded-full shadow-sm hover:shadow-md">
//                       <span className="sr-only">Twitter</span>
//                       <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                       </svg>
//                     </button>
//                     <button className="text-gray-500 hover:text-blue-600 transition p-2 bg-white rounded-full shadow-sm hover:shadow-md">
//                       <span className="sr-only">LinkedIn</span>
//                       <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                       </svg>
//                     </button>
//                     <button className="text-gray-500 hover:text-blue-600 transition p-2 bg-white rounded-full shadow-sm hover:shadow-md">
//                       <span className="sr-only">Email</span>
//                       <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Related articles section */}
//             <div className="mt-16">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                   <div className="h-48 overflow-hidden">
//                     <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500"></div>
//                   </div>
//                   <div className="p-6">
//                     <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-3">
//                       {blog.categories?.[0] || "Technology"}
//                     </span>
//                     <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                       Related Article Title Goes Here
//                     </h4>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       A brief description of the related article to entice readers to click through and read more about
//                       this topic.
//                     </p>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <span>5 min read</span>
//                       <span className="mx-2">•</span>
//                       <span>Mar 15, 2023</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                   <div className="h-48 overflow-hidden">
//                     <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500"></div>
//                   </div>
//                   <div className="p-6">
//                     <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full mb-3">
//                       {blog.categories?.[1] || "Design"}
//                     </span>
//                     <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                       Another Related Article Title
//                     </h4>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       Another brief description of a related article that might interest readers who enjoyed this
//                       content.
//                     </p>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <span>7 min read</span>
//                       <span className="mx-2">•</span>
//                       <span>Mar 10, 2023</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BlogDetail




import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

var BlogPost = {
  id: String,
  title: String,
  excerpt: String,
  content: Array,
  coverImage: String,
  authorName: String,
  author: {
    name: String,
    image: String,
    bio: String,
    company: String
  },
  createdAt: String,
  categories: Array,
  tableOfContents: Array
}

var RecentBlog = { 
  id: String,
  title: String,
  excerpt: String,
  coverImage: String,
  category: String,
  readTime: String,
  createdAt: String
}

export default function BlogDetail() {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)
  const [recentBlogs, setRecentBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const articleRef = useRef(null)

  // Define API base URL
  const API_BASE_URL = "http://localhost:5000"

  // Calculate reading time
  const calculateReadingTime = (content) => {
    if (!content) return "5 min read";
  
    let wordCount = 0;
  
    if (Array.isArray(content)) {
      content.forEach((section) => {
        if (typeof section === "string") {
          wordCount += section.split(/\s+/).length;
        } else if (Array.isArray(section.paragraphs)) {
          section.paragraphs.forEach((para) => {
            wordCount += para.split(/\s+/).length;
          });
        } else if (typeof section.text === "string") {
          wordCount += section.text.split(/\s+/).length;
        }
      });
    }

    // Average reading speed: 200 words per minute
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} min read`
  }

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return

      const element = articleRef.current
      const totalHeight = element.clientHeight
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      if (totalHeight - windowHeight > 0) {
        const progress = (scrollTop / (totalHeight - windowHeight)) * 100
        setReadingProgress(Math.min(100, Math.max(0, progress)))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [blog])

  useEffect(() => {
    // Scroll to top when blog changes
    window.scrollTo(0, 0)

    const fetchBlogDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/api/blogs/${blogId}`)
        setBlog(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError("Failed to load blog. Please try again later.")
        setLoading(false)
      }
    }

    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs`)
        setRecentBlogs(response.data)
      } catch (err) {
        console.error("Error fetching recent blogs:", err)
      }
    }

    if (blogId) {
      fetchBlogDetails()
      fetchRecentBlogs()
    }
  }, [blogId])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  if (loading) {
    return <BlogLoadingSkeleton />
  }

  if (error) {
    return <BlogError error={error} />
  }

  if (!blog) {
    return <BlogNotFound />
  }

  const readingTime = calculateReadingTime(blog.content)

  return (
    <div className="bg-white min-h-screen" ref={articleRef}>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-emerald-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.categories?.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">{blog.title}</h1>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{readingTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{blog.authorName}</span>
          </div>
        </div>

        {/* Cover image */}
        {blog.coverImage && (
          <div className="relative w-full aspect-[16/9] mb-10 rounded-lg overflow-hidden">
            <img
              src={blog.coverImage.startsWith("http") ? blog.coverImage : `${API_BASE_URL}${blog.coverImage}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main content */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <article className="prose prose-lg max-w-none">
              {blog.content &&
                Array.isArray(blog.content) &&
                blog.content.map((section, index) => {
                  if (typeof section === "object" && section.title && section.paragraphs) {
                    return (
                      <div className="mb-12" key={index} id={`section-${index + 1}`}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 scroll-mt-20">{section.title}</h2>
                        {section.paragraphs.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )
                  } else if (typeof section === "string") {
                    return (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {section}
                      </p>
                    )
                  } else if (typeof section === "object" && section.text) {
                    return (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {section.text}
                      </p>
                    )
                  }
                  return null
                })}
            </article>

            {/* Author information */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gray-50 rounded-lg">
                <div className="h-20 w-20 relative rounded-full overflow-hidden border-4 border-white shadow">
                  {blog.author?.image ? (
                    <img
                      src={
                        blog.author.image.startsWith("http") ? blog.author.image : `${API_BASE_URL}${blog.author.image}`
                      }
                      alt={blog.author.name || blog.authorName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                      {blog.authorName?.charAt(0) || "A"}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Written by {blog.author?.name || blog.authorName}
                  </h3>
                  {blog.author?.bio && <p className="text-gray-600 mb-2">{blog.author.bio}</p>}
                  {blog.author?.company && (
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-medium">Works at</span> {blog.author.company}
                    </p>
                  )}
                  <div className="flex justify-center sm:justify-start space-x-2 mt-2">
                    <button className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100 transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100 transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-8 space-y-8">
              {/* Table of contents */}
              {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="font-medium text-lg text-gray-900 mb-4">Table of Contents</h3>
                  <nav className="space-y-1">
                    {blog.tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-md transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share buttons */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-medium text-lg text-gray-900 mb-4">Share Article</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1a94e0] transition-colors">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0077B5] text-white rounded-md hover:bg-[#006699] transition-colors">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
                <button
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={copyToClipboard}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>

              {/* Recent posts */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-medium text-lg text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentBlogs.length > 0 ? (
                    recentBlogs.map((recentBlog) => (
                      <Link to={`/blog/${recentBlog.id}`} key={recentBlog.id} className="group block">
                        <div className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={
                                recentBlog.coverImage.startsWith("http")
                                  ? recentBlog.coverImage
                                  : `${API_BASE_URL}${recentBlog.coverImage}`
                              }
                              alt={recentBlog.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-1">
                              {recentBlog.category}
                            </span>
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-emerald-600 transition-colors">
                              {recentBlog.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3">
                          <div className="h-16 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-right">
                  <Link
                    to="/blog"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    View all posts
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((recentBlog) => (
              <div
                key={recentBlog.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={
                      recentBlog.coverImage.startsWith("http")
                        ? recentBlog.coverImage
                        : `${API_BASE_URL}${recentBlog.coverImage}`
                    }
                    alt={recentBlog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">
                    {recentBlog.category}
                  </span>
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {recentBlog.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recentBlog.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{recentBlog.readTime}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={recentBlog.createdAt}>
                      {new Date(recentBlog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogLoadingSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 w-full bg-gray-200 animate-pulse"></div>
          <div className="h-12 w-3/4 bg-gray-200 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-5 w-32 bg-gray-200 animate-pulse"></div>
            <div className="h-5 w-24 bg-gray-200 animate-pulse"></div>
            <div className="h-5 w-28 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
        <div className="h-[400px] w-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse"></div>
            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-2/3 bg-gray-200 animate-pulse"></div>
            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="h-8 w-40 bg-gray-200 animate-pulse"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-8 w-40 bg-gray-200 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 w-full bg-gray-200 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogError({ error }) {
  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center">
      <div className="bg-red-50 p-8 rounded-lg border border-red-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Article</h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

function BlogNotFound() {
  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center">
      <div className="bg-amber-50 p-8 rounded-lg border border-amber-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-amber-800 mb-2">Blog Not Found</h3>
          <p className="text-amber-700 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}




