// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = "https://inshorts-backend-xce7.onrender.com/api/news";

// export default function NewsViewer() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
  
//   // Form state for editing
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     photo: null,
//     url: ""
//   });

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching news from:", `${API_URL}/all`);
      
//       const res = await axios.get(`${API_URL}/all`);
      
//       console.log("Raw response:", res);
//       console.log("Response data:", res.data);
//       console.log("Response data type:", typeof res.data);
//       console.log("Is array?", Array.isArray(res.data));
//       console.log("Data length:", res.data?.length);
      
//       // Ensure we're always setting an array
//       if (Array.isArray(res.data)) {
//         setNews(res.data);
//       } else if (typeof res.data === 'object' && res.data !== null) {
//         // If API returns an object with a data property
//         if (Array.isArray(res.data.data)) {
//           setNews(res.data.data);
//           console.log("Extracted news from res.data.data, found", res.data.data.length, "items");
//         } else {
//           // If we have an object but it's not in expected format
//           console.warn("Response is not an array or doesn't contain array at .data property:", res.data);
//           setNews([]);
//         }
//       } else {
//         console.warn("Unexpected response format:", res.data);
//         setNews([]);
//       }
//     } catch (error) {
//       console.error("Error object:", error);
//       if (error.response) {
//         console.error("Response error data:", error.response.data);
//         console.error("Response error status:", error.response.status);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error setting up request:", error.message);
//       }
//       setError("Failed to fetch news. Please check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//       setSuccessMessage("New image selected");
//       setError(null);

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setFormData({
//       title: item.title,
//       description: item.description,
//       category: item.category,
//       url: item.url || "",
//       photo: null
//     });
//     setPreviewUrl(item.photo ? `https://inshorts-backend-xce7.onrender.com${item.photo}` : null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this news article?")) return;
    
//     try {
//       setLoading(true);
//       const response = await axios.delete(`${API_URL}/${id}`);
//       console.log(response.data.message);
//       setSuccessMessage("News deleted successfully!");
//       fetchNews();
//     } catch (error) {
//       setError("Failed to delete news. Please try again.");
//       console.error("Error deleting news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     const form = new FormData();
    
//     // Add all form fields to FormData
//     for (const key in formData) {
//       if (formData[key] !== null) {
//         form.append(key, formData[key]);
//       }
//     }

//     try {
//       // Update existing news
//       const response = await axios.put(`${API_URL}/${editingId}`, form, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       console.log("Update response:", response.data);
//       setSuccessMessage("News updated successfully!");
      
//       // Refresh the news list
//       await fetchNews();
      
//       // Reset form
//       handleCancel();
//     } catch (error) {
//       setError("Failed to update news. Please try again.");
//       console.error("Error updating news:", error);
//       if (error.response) {
//         console.error("Server response:", error.response.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setFormData({
//       title: "",
//       description: "",
//       category: "",
//       photo: null,
//       url: ""
//     });
//     setPreviewUrl(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://inshorts-backend-xce7.onrender.com/api/news";

export default function NewsViewer() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo: null,
    url: ""
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      const data = res.data;

      if (Array.isArray(data)) {
        setNews(data);
      } else if (Array.isArray(data.data)) {
        setNews(data.data);
      } else {
        setNews([]);
      }
    } catch (error) {
      setError("Failed to fetch news.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setSuccessMessage("New image selected");
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      url: item.url || "",
      photo: null
    });

    // 🛠 Handle full Cloudinary or relative image
    let photoUrl = '';
    if (item.photo?.startsWith("http")) {
      photoUrl = item.photo;
    } else {
      photoUrl = `https://inshorts-backend-xce7.onrender.com${item.photo}`;
    }

    setPreviewUrl(photoUrl || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news article?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setSuccessMessage("News deleted successfully!");
      fetchNews();
    } catch (error) {
      setError("Failed to delete news.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const form = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(`${API_URL}/${editingId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage("News updated successfully!");
      await fetchNews();
      handleCancel();
    } catch (error) {
      setError("Failed to update news.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      photo: null,
      url: ""
    });
    setPreviewUrl(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">News Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Edit Form - only shown when editing */}
        {editingId && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    <span className="text-sm text-gray-600">Choose a new photo</span>
                    <input
                      type="file"
                      id="photo-upload"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  {previewUrl && (
                    <div className="ml-4 h-12 w-12 overflow-hidden rounded-md">
                      <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {previewUrl && previewUrl.startsWith('http') 
                    ? "Current image will be kept unless you select a new one" 
                    : previewUrl 
                      ? "New image selected" 
                      : "No image currently selected"}
                </p>
              </div>

              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update News"
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List Section - Takes full width when not editing */}
        <div className={editingId ? "" : "lg:col-span-2"}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">News Articles</h2>
            
            {/* Refresh button */}
            <button 
              onClick={fetchNews} 
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          
          {/* Success/Error messages for list operations */}
          {!editingId && successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {!editingId && error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {loading && !news.length ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md">
                <svg
                  className="animate-spin h-10 w-10 text-blue-600 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-600">Loading news...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <p className="text-gray-500">No news articles available.</p>
              </div>
            ) : (
              news.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="md:flex">
                    {item.photo && (
                      <div className="md:flex-shrink-0">
                        <img
                          src={`https://inshorts-backend-xce7.onrender.com${item.photo}`}
                          alt={item.title}
                          className="h-48 w-full object-cover md:h-full md:w-48"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-3">{item.description}</p>
                      
                      <div className="mt-1 text-sm text-gray-500">
                        {item.createdAt && (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Created: {formatDate(item.createdAt)}</span>
                          </div>
                        )}
                        {item.updatedAt && item.updatedAt !== item.createdAt && (
                          <div className="flex items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Updated: {formatDate(item.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          {item.url && (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              Read more
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900 font-medium text-sm inline-flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900 font-medium text-sm inline-flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}