export default{
    articles: JSON.parse(localStorage.getItem("articles")) || [],
    key: 0
}