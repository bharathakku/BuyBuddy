import CategoryCard from './CategoryCard';

const CategoryGrid = ({ categories }) => {
  return (
    <div className="row">
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
