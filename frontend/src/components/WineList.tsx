import { FaWineBottle } from 'react-icons/fa';
import './style.css';

type Wine = {
  name: string;
  vintage: number;
  total_bottles_sold: number;
  total_revenue: number;
  total_orders: number;
};

type WineListProps = {
  wines: Wine[];
  top10PercentIndex: number;
  bottom10PercentIndex: number;
};

const WineList: React.FC<WineListProps> = ({
  wines,
  top10PercentIndex,
  bottom10PercentIndex,
}) => {
  return (
    <div className="wine-list">
      {wines.map((wine, index) => {
        const isTop10 = index < top10PercentIndex;
        const isBottom10 = index >= bottom10PercentIndex;

        const cardBorderColor = isTop10 ? "green" : isBottom10 ? "red" : "black";
        const iconColor = cardBorderColor;

        return (
          <div
            key={wine.name + wine.vintage + index}
            className="wine-card"
            style={{ borderColor: cardBorderColor }}
          >
            <FaWineBottle className="wine-card-icon" style={{ color: iconColor }} />
            <h2 className="wine-title">
              {wine.name} ({wine.vintage})
            </h2>
            <p className="wine-info">
              <strong>Total Revenue:</strong> £{wine.total_revenue.toFixed(2)}
            </p>
            <p className="wine-info">
              <strong>Total Bottles Sold:</strong> {wine.total_bottles_sold}
            </p>
            <p className="wine-info">
              <strong>Total Orders:</strong> {wine.total_orders}
            </p>
            <p className={`wine-status ${isTop10 ? "top-10" : isBottom10 ? "bottom-10" : ""}`}>
              {isTop10 ? "Top 10% Best Seller" : isBottom10 ? "Bottom 10% Seller" : "Regular Seller"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WineList;
