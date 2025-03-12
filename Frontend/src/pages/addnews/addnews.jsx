import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

export default function AddNewsApp() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } catch (error) {
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
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Processing...</span>
            </>
          ) : (
            'Add News'
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
                  <img src={`http://localhost:5000${item.photo}`} alt={item.title} loading="lazy" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Enhanced CSS with animations and better styling
const css = `
  .container {
    max-width: 800px;
    width: 90%;
    margin: 6rem auto;
    padding: 0 20px;
  }

  h1 {
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #007aff;
    border-radius: 2px;
  }

  .news-form {
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .news-form input:not([type="file"]),
  .news-form textarea {
    width: 100%;
    padding: 12px 16px;
    margin: 8px 0;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  .news-form input:focus,
  .news-form textarea:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  .file-input-container {
    position: relative;
    margin: 16px 0;
  }

  .file-input-container input[type="file"] {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }

  .file-input-container label {
    display: block;
    padding: 12px 20px;
    background: #f5f5f5;
    border: 2px dashed #ccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .file-input-container:hover label {
    border-color: #007aff;
    background: #f0f7ff;
  }

  button {
    width: 100%;
    padding: 12px 24px;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  button:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }

  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .loading .spinner {
    width: 32px;
    height: 32px;
    margin: 0 auto 1rem;
  }

  .news-list {
    display: grid;
    gap: 1.5rem;
  }

  .news-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .news-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .news-content {
    padding: 1.5rem;
  }

  .news-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .news-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #1a1a1a;
  }

  .category-badge {
    background: #f0f7ff;
    color: #007aff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .news-item p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  .news-image {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .news-item:hover .news-image img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .container {
      width: 95%;
      padding: 0 10px;
    }

    h1 {
      font-size: 2rem;
    }

    .news-form {
      padding: 1.5rem;
    }

    .news-image {
      height: 200px;
    }
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = css;
document.head.appendChild(styleTag);
