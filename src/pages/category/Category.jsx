import React from 'react'

const Category = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    request("/discover/movie").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-black">
      <Movies data={data} />
      <Footer />
    </div>
  );
}

export default Category