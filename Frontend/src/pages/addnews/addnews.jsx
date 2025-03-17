import { useState, useEffect } from "react";
import axios from "axios";
import "./addnews.css";
const API_URL = "http://localhost:5000/api/news";

export default function AddNewsApp() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo: null,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/`);
      setNews(res.data);
    } catch (error) {
      setError("Failed to fetch news. Please try again later.");
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
      setSuccessMessage("Image has been added successfully!"); // Set success message
      setError(null); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear success message on submission

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      await axios.post(`${API_URL}/add`, form);
      await fetchNews();
      // Reset form
      e.target.reset();
      setFormData({
        title: "",
        description: "",
        category: "",
        photo: null,
      });
      setSuccessMessage("News added successfully!"); // Success message after submission
    } catch (error) {
      setError("Failed to add news. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>News Management</h1>
      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          rows={4}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleFileChange}
            required
            id="photo-upload"
            accept="image/*"
          />
          <label htmlFor="photo-upload">Choose a photo</label>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Processing...</span>
            </>
          ) : (
            "Add News"
          )}
        </button>
      </form>
      <div className="news-list">
        {loading && !news.length ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading news...</p>
          </div>
        ) : (
          news.map((item) => (
            <div className="news-item" key={item._id}>
              <div className="news-content">
                <div className="news-header">
                  <h3>{item.title}</h3>
                  <span className="category-badge">{item.category}</span>
                </div>
                <p>{item.description}</p>
              </div>
              {item.photo && (
                <div className="news-image">
                  <img
                    src={`http://localhost:5000${item.photo}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}