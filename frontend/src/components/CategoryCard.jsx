import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <Link to={`/category/${category.slug}`} className="text-decoration-none text-dark">
        <div className="card h-100 shadow-sm">
          <img
            src={category.image}
            className="card-img-top p-3"
            alt={category.name}
            style={{ height: '150px', objectFit: 'contain' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{category.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
