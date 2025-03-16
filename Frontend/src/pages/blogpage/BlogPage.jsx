import BlogList from "../../components/blogs/bloglist"
import sampleBlogs from "../../components/blogs/sampledata"


// Sample data - in a real app, you would fetch this from an API
// const sampleBlogs = [
//   {
//     id: "1",
//     title: "Getting Started with Next.js",
//     excerpt: "Learn how to build modern web applications with Next.js framework",
//     coverImage: "/placeholder.svg?height=200&width=350",
//     categories: ["Web Development", "React"],
//     date: "March 15, 2024",
//     author: { name: "John Doe" },
//   },
//   {
//     id: "2",
//     title: "CSS Grid Layout Mastery",
//     excerpt: "Master CSS Grid Layout with these practical examples and tips",
//     coverImage: "/placeholder.svg?height=200&width=350",
//     categories: ["CSS", "Web Design"],
//     date: "March 10, 2024",
//     author: { name: "Jane Smith" },
//   },
//   {
//     id: "3",
//     title: "TypeScript Best Practices",
//     excerpt: "Improve your TypeScript code with these best practices and patterns",
//     coverImage: "/placeholder.svg?height=200&width=350",
//     categories: ["TypeScript", "JavaScript"],
//     date: "March 5, 2024",
//     author: { name: "Alex Johnson" },
//   },
// ]

export default function Home() {
  return (
    <main>
      <BlogList blogs={sampleBlogs} />
    </main>
  )
}

