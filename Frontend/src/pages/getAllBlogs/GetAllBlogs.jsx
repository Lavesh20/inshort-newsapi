import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Edit, X, Check, Image } from 'lucide-react';

const API_URL = "https://inshorts-backend-xce7.onrender.com/api/blogs";

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
  });

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again later.');
      setLoading(false);
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/${blogId}`);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } catch (err) {
        setError('Failed to delete blog. Please try again.');
        console.error('Error deleting blog:', err);
      }
    }
  };

  // Start editing a blog
  const handleEdit = (blog) => {
    setEditingBlog(blog._id);
    
    let contentValue = blog.content;
    
    // Handle content if it's an object with paragraphs
    if (typeof blog.content === 'object' && blog.content.paragraphs) {
      contentValue = blog.content.paragraphs.join('\n\n');
    } else if (typeof blog.content === 'object') {
      contentValue = JSON.stringify(blog.content, null, 2);
    }
    
    setFormData({
      title: blog.title,
      content: contentValue,
      image: null,
      imagePreview: blog.imageUrl || '',
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      image: null,
      imagePreview: '',
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'content') {
      // If the original content is an object with paragraphs structure
      if (editingBlog && typeof blogs.find(blog => blog._id === editingBlog).content === 'object') {
        const originalContent = blogs.find(blog => blog._id === editingBlog).content;
        setFormData({
          ...formData,
          content: {
            ...originalContent,
            paragraphs: value.split('\n\n').filter(p => p.trim().length > 0)
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Save blog changes
  const handleSaveEdit = async (blogId) => {
    try {
      let imageUrl = blogs.find(blog => blog._id === blogId).imageUrl;
      
      // If a new image was selected, upload it to Cloudinary
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);
        
        const uploadResponse = await axios.post(`${API_URL}/upload`, imageFormData);
        imageUrl = uploadResponse.data.imageUrl;
      }
      
      // Get the original blog to determine content structure
      const originalBlog = blogs.find(blog => blog._id === blogId);
      let updatedContent = formData.content;
      
      // If original content was an object but we're editing as text
      if (typeof originalBlog.content === 'object' && typeof formData.content === 'string') {
        try {
          // First try to see if it's a JSON string
          const parsedContent = JSON.parse(formData.content);
          updatedContent = parsedContent;
        } catch (e) {
          // Not JSON, treat as paragraphs
          updatedContent = {
            ...(originalBlog.content.title ? { title: originalBlog.content.title } : {}),
            paragraphs: formData.content.split('\n\n').filter(p => p.trim().length > 0)
          };
        }
      } else if (typeof formData.content === 'object') {
        updatedContent = formData.content;
      }
      
      // Update the blog with new data
      const updatedBlog = {
        title: formData.title,
        content: updatedContent,
        imageUrl: imageUrl,
      };
      
      const response = await axios.put(`${API_URL}/${blogId}`, updatedBlog);
      
      // Update the blogs state with the edited blog
      setBlogs(blogs.map(blog => blog._id === blogId ? response.data : blog));
      
      // Reset editing state
      setEditingBlog(null);
      setFormData({
        title: '',
        content: '',
        image: null,
        imagePreview: '',
      });
      
    } catch (err) {
      setError('Failed to update blog. Please try again.');
      console.error('Error updating blog:', err);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading blogs...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Blog Management</h1>
      
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <li key={blog._id} className="border rounded-lg p-4 shadow">
              {editingBlog === blog._id ? (
                // Edit form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows="5"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center space-x-4">
                      {formData.imagePreview && (
                        <div className="relative">
                          <img 
                            src={formData.imagePreview} 
                            alt="Preview" 
                            className="h-20 w-20 object-cover rounded"
                          />
                        </div>
                      )}
                      <label className="flex items-center px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Image className="h-4 w-4 mr-2" />
                        <span>Choose Image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveEdit(blog._id)}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Blog display
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit blog"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete blog"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {blog.imageUrl && (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="h-24 w-24 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="text-gray-700 line-clamp-3">
  {typeof blog.content === 'object' ? 
    (blog.content.title ? blog.content.title + ': ' : '') +
    (Array.isArray(blog.content.paragraphs) ? 
      blog.content.paragraphs.slice(0, 1).join(' ') + '...' : 
      JSON.stringify(blog.content))
    : blog.content}
</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {/* You could add a "Create New Blog" button here if needed */}
    </div>
  );
};

export default AdminBlogManagement;