import React, { useEffect, useState } from "react";
import ItemService from "../services/item.service"
import BookCard from "../components/BookCard";
const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ItemService.getAllItem();
        if (response.status === 200) {
          setItems(response.data);
        }
      } catch (error) {
        console.log("Fetching data error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-700 drop-shadow-sm">
        📚 รายการหนังสือทั้งหมด
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="no book"
            className="w-28 h-28 opacity-70 mb-4"
          />
          <p className="text-gray-500 text-lg">ยังไม่มีหนังสือในตอนนี้</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <BookCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;