import React, { useEffect, useState } from "react";
import BookServices from "../services/book.service";
import ComicService from "../services/comic.service";
import JournalService from "../services/journal.service";
import ItemService from "../services/item.service";
const Home = () => {
const [items, setItems] = useState([]);
console.log(items)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ItemService.getAllItem();
        if (response.status === 200) {
          setItems(response.data);
        }
      } catch (error) {
        console.log("fetching data error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {items.length === 0 && <p>ยังไม่มีหนังสือ</p>}
      {items.length > 0 &&
        items.map((item) => {
          return <ActivityCard item={item} />;
        })}
    </div>
  );

};


export default Home;
