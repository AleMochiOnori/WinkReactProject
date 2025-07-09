import "./Pagination.css";
interface PaginationProps {
  totalPosts: number;
  postPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postPerPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;