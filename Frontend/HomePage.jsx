import React, { useEffect, useState } from "react";

const API_KEY = "YOUR_NEWSAPI_KEY"; // replace with your real key
const API_URL = `https://newsapi.org/v2/everything?q=agriculture&language=en&sortBy=publishedAt&pageSize=8&apiKey=${API_KEY}`;

const AgriNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">🌾 Loading latest agriculture news...</p>;

  return (
    <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-2xl"></div>
      <div className="relative">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">📰</span> Latest Agri News
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/50 hover:bg-white/70 transition-all duration-300"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="news"
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="text-sm font-semibold text-gray-900">{article.title}</h4>
              <p className="text-xs text-gray-600 mt-1">
                {article.description?.slice(0, 100)}...
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 mt-2 inline-block text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgriNews;
