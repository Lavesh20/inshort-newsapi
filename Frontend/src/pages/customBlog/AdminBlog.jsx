import React, { useState } from "react";
import axios from "axios";
import "./AdminBlog.css"; // Import the CSS file

function AdminBlogEditor() {
  // State for blog data
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [coverImage, setCoverImage] = useState(null); // Use null for file upload
  const [content, setContent] = useState([
    { title: "Introduction", paragraphs: [""] },
  ]);
  const [authorName, setAuthorName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle adding new section
  const addSection = () => {
    setContent([...content, { title: "", paragraphs: [""] }]);
  };

  // Handle adding new paragraph to a section
  const addParagraph = (sectionIndex) => {
    const updatedContent = [...content];
    updatedContent[sectionIndex].paragraphs.push("");
    setContent(updatedContent);
  };

  // Handle section title changes
  const handleSectionTitleChange = (index, value) => {
    const updatedContent = [...content];
    updatedContent[index].title = value;
    setContent(updatedContent);
  };

  // Handle paragraph changes
  const handleParagraphChange = (sectionIndex, paragraphIndex, value) => {
    const updatedContent = [...content];
    updatedContent[sectionIndex].paragraphs[paragraphIndex] = value;
    setContent(updatedContent);
  };

  // Handle cover image file change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setSuccessMessage("Cover image uploaded successfully!");
      setErrorMessage("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categories", categories);
      formData.append("coverImage", coverImage); // Append the file
      formData.append("content", JSON.stringify(content));
      formData.append("authorName", authorName);

      // Replace with your actual API endpoint
      const response = await axios.post("https://inshorts-backend-xce7.onrender.com/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      setSuccessMessage("Blog published successfully!");

      // Reset form
      setTitle("");
      setCategories("");
      setCoverImage(null);
      setContent([{ title: "Introduction", paragraphs: [""] }]);
      setAuthorName("");
    } catch (err) {
      setErrorMessage("Failed to publish blog. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="blog-admin-container">
      <div className="blog-editor-wrapper">
        <div className="blog-editor-card">
          <h1 className="editor-title">Create New Blog Post</h1>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-error">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Blog Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Categories */}
            <div className="form-group">
              <label className="form-label" htmlFor="categories">
                Categories (comma separated)
              </label>
              <input
                id="categories"
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="form-input"
                placeholder="technology, programming, web development"
              />
            </div>

            {/* Cover Image Upload */}
            <div className="form-group">
              <label className="form-label" htmlFor="coverImage">
                Cover Image
              </label>
              <input
                id="coverImage"
                type="file"
                onChange={handleCoverImageChange}
                className="form-input"
                accept="image/*"
                required
              />
              {coverImage && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover Preview"
                    className="preview-image"
                  />
                </div>
              )}
            </div>

            {/* Author Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="authorName">
                Author Name
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Blog Content */}
            <div className="form-group">
              <h2 className="content-heading">Blog Content</h2>

              {content.map((section, sectionIndex) => (
                <div key={sectionIndex} className="section-container">
                  {/* Section Title */}
                  <div className="form-group">
                    <label className="form-label">
                      Section {sectionIndex + 1} Title
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        handleSectionTitleChange(sectionIndex, e.target.value)
                      }
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Paragraphs */}
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <div key={paragraphIndex} className="form-group">
                      <label className="form-label">
                        Paragraph {paragraphIndex + 1}
                      </label>
                      <textarea
                        value={paragraph}
                        onChange={(e) =>
                          handleParagraphChange(
                            sectionIndex,
                            paragraphIndex,
                            e.target.value
                          )
                        }
                        className="form-textarea"
                        rows="4"
                        required
                      />
                    </div>
                  ))}

                  {/* Add Paragraph Button */}
                  <button
                    type="button"
                    onClick={() => addParagraph(sectionIndex)}
                    className="btn btn-secondary btn-small"
                  >
                    + Add Paragraph
                  </button>
                </div>
              ))}

              {/* Add Section Button */}
              <button
                type="button"
                onClick={addSection}
                className="btn btn-secondary"
              >
                + Add New Section
              </button>
            </div>

            {/* Submit Button */}
            <div className="btn-container">
              <button type="submit" className="btn btn-primary">
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogEditor;