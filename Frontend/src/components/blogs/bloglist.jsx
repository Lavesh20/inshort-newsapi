// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("newest");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const navigate = useNavigate();
//   const API_BASE_URL = "https://inshorts-backend-xce7.onrender.com";

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/blogs`);
//         const blogsData = response.data;
//         setBlogs(blogsData);
        
//         // Extract all unique categories
//         const allCategories = new Set();
//         blogsData.forEach(blog => {
//           if (blog.categories && blog.categories.length) {
//             blog.categories.forEach(category => allCategories.add(category));
//           }
//         });
//         setCategories(Array.from(allCategories));
        
//       } catch (err) {
//         setError("Failed to load blogs");
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   // Filter and sort blogs whenever filter criteria change
//   useEffect(() => {
//     let result = [...blogs];
    
//     // Filter by category
//     if (selectedCategory !== "all") {
//       result = result.filter(blog => 
//         blog.categories && blog.categories.includes(selectedCategory)
//       );
//     }
    
//     // Filter by search term
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(blog => 
//         blog.title.toLowerCase().includes(term) || 
//         (blog.content && blog.content[0] && typeof blog.content[0] === 'string' && 
//           blog.content[0].toLowerCase().includes(term))
//       );
//     }
    
//     // Sort blogs
//     result.sort((a, b) => {
//       switch (sortOption) {
//         case "newest":
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case "oldest":
//           return new Date(a.createdAt) - new Date(b.createdAt);
//         case "a-z":
//           return a.title.localeCompare(b.title);
//         case "z-a":
//           return b.title.localeCompare(a.title);
//         default:
//           return 0;
//       }
//     });
    
//     setFilteredBlogs(result);
//   }, [blogs, selectedCategory, sortOption, searchTerm]);

//   const handleCardClick = (blogId, e) => {
//     if (!e.target.closest(".category-tag")) {
//       navigate(`/en/blogs/${blogId}`);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category === selectedCategory ? "all" : category);
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-6">
//       <p className="font-bold">Error</p>
//       <p>{error}</p>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">All Blogs</h1>
//         <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
//           Explore our latest blogs and articles
//         </p>
//       </div>
      
//       {/* Filters and Search */}
//       <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
//         <div className="w-full max-w-xs">
//           <label htmlFor="search" className="sr-only">Search</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <input
//               id="search"
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Search blogs"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
        
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//           <div className="relative inline-block text-left">
//             <select
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="relative inline-block text-left">
//             <select
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="a-z">Title A-Z</option>
//               <option value="z-a">Title Z-A</option>
//             </select>
//           </div>
//         </div>
//       </div>
      
//       {/* Category Pills */}
//       <div className="flex flex-wrap gap-2 mb-8">
//         <button
//           className={`px-4 py-2 rounded-full text-sm font-medium ${
//             selectedCategory === "all"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//           onClick={() => setSelectedCategory("all")}
//         >
//           All
//         </button>
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`px-4 py-2 rounded-full text-sm font-medium ${
//               selectedCategory === category
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => handleCategoryClick(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
      
//       {/* Blog Grid */}
//       {filteredBlogs.length === 0 ? (
//         <div className="text-center py-12">
//           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
//           <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria.</p>
//         </div>
//       ) : (
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {filteredBlogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
//               onClick={(e) => handleCardClick(blog._id, e)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   handleCardClick(blog._id, e);
//                 }
//               }}
//             >
//               <div className="h-48 w-full overflow-hidden">
//                 <img
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   src={blog.coverImage?.startsWith('https') ? blog.coverImage : `${API_BASE_URL}${blog.coverImage}`}
//                   alt={blog.title}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found';
//                   }}
//                 />
//               </div>
              
//               <div className="p-6">
//                 {blog.categories && blog.categories.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {blog.categories.map((category, index) => (
//                       <span
//                         key={index}
//                         className="category-tag inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleCategoryClick(category);
//                         }}
//                       >
//                         {category}
//                       </span>
//                     ))}
//                   </div>
//                 )}
                
//                 <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
                
//                 <p className="text-gray-600 mb-4 line-clamp-3">
//                   {blog.content && blog.content[0] ?
//                     (typeof blog.content[0] === 'string' ?
//                       blog.content[0].substring(0, 100) + '...' :
//                       "Read more...") :
//                     "Read more..."}
//                 </p>
                
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span className="flex items-center">
//                     <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                     </svg>
//                     {new Date(blog.createdAt).toLocaleDateString()}
//                   </span>
                  
//                   <span className="flex items-center">
//                     <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                     {blog.authorName || "Unknown"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       {/* Results Count */}
//       <div className="mt-8 text-sm text-gray-500">
//         Showing {filteredBlogs.length} of {blogs.length} blogs
//       </div>
//     </div>
//   );
// }

// export default BlogList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  
  // Ensure the API base URL is correctly formatted
  // Remove any trailing slashes to avoid double slashes in URL construction
  const API_BASE_URL = "https://inshorts-backend-xce7.onrender.com";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Explicitly construct the full URL to avoid any string concatenation issues
        const url = new URL("/api/blogs", API_BASE_URL).toString();
        console.log("Fetching blogs from:", url); // Debug log
        
        const response = await axios.get(url);
        const blogsData = response.data;
        setBlogs(blogsData);
        
        // Extract all unique categories
        const allCategories = new Set();
        blogsData.forEach(blog => {
          if (blog.categories && blog.categories.length) {
            blog.categories.forEach(category => allCategories.add(category));
          }
        });
        setCategories(Array.from(allCategories));
        
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(`Failed to load blogs: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper function to safely construct image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/350x200?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    
    try {
      // Safely join the base URL with the image path
      return new URL(imagePath.startsWith('/') ? imagePath : `/${imagePath}`, API_BASE_URL).toString();
    } catch (e) {
      console.error("Error constructing image URL:", e);
      return 'https://via.placeholder.com/350x200?text=Error+Loading+Image';
    }
  };

  // Filter and sort blogs whenever filter criteria change
  useEffect(() => {
    let result = [...blogs];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(blog => 
        blog.categories && blog.categories.includes(selectedCategory)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        (blog.content && blog.content[0] && typeof blog.content[0] === 'string' && 
          blog.content[0].toLowerCase().includes(term))
      );
    }
    
    // Sort blogs
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredBlogs(result);
  }, [blogs, selectedCategory, sortOption, searchTerm]);

  const handleCardClick = (blogId, e) => {
    if (!e.target.closest(".category-tag")) {
      navigate(`/en/blogs/${blogId}`);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "all" : category);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-6">
      <p className="font-bold">Error</p>
      <p>{error}</p>
      <p className="mt-2">
        Please check that the API at {API_BASE_URL} is accessible and running.
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">All Blogs</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Explore our latest blogs and articles
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="w-full max-w-xs">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative inline-block text-left">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative inline-block text-left">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">Title A-Z</option>
              <option value="z-a">Title Z-A</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
          <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              onClick={(e) => handleCardClick(blog._id, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(blog._id, e);
                }
              }}
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={getImageUrl(blog.coverImage)}
                  alt={blog.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found';
                  }}
                />
              </div>
              
              <div className="p-6">
                {blog.categories && blog.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.categories.map((category, index) => (
                      <span
                        key={index}
                        className="category-tag inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content && blog.content[0] ?
                    (typeof blog.content[0] === 'string' ?
                      blog.content[0].substring(0, 100) + '...' :
                      "Read more...") :
                    "Read more..."}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  
                  <span className="flex items-center">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {blog.authorName || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Results Count */}
      <div className="mt-8 text-sm text-gray-500">
        Showing {filteredBlogs.length} of {blogs.length} blogs
      </div>
    </div>
  );
}

export default BlogList;