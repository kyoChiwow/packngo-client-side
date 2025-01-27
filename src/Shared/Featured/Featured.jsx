import { useEffect, useState } from "react";
import { FaShieldAlt, FaBolt, FaLeaf } from "react-icons/fa";
import Title from "../Title/Title";

const Featured = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/featured.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  const icons = {
    FaShieldAlt: <FaShieldAlt size={40} />,
    FaBolt: <FaBolt size={40} />,
    FaLeaf: <FaLeaf size={40} />,
  };

  return (
    <div>
      <header>
        <Title
          mainTitle="Our Services"
          subTitle="These are just the tip of the iceberg!"
        />
      </header>

      <main>
        {/* Card wrapping div here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  {icons[card.icon] || <div>No Icon</div>}{" "}
                  {/* Render corresponding icon */}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center mt-2">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        {/* Card wrapping div here */}
      </main>
    </div>
  );
};

export default Featured;
