import ReactPaginate from 'react-paginate';
import {
	IoArrowBackSharp,
	IoArrowForwardSharp,
	IoCodeWorkingSharp,
} from 'react-icons/io5';

const Pagination = ({ onPageChange, pageCount }) => {
	return (
		<div className="pagination-continer">
			<ReactPaginate
				previousLabel={<IoArrowBackSharp />}
				nextLabel={<IoArrowForwardSharp />}
				breakLabel={<IoCodeWorkingSharp />}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				onPageChange={onPageChange}
				containerClassName="pagination-ul-container"
				previousLinkClassName="previous-button"
				nextLinkClassName="next-button"
				activeClassName="page-active"
			/>
		</div>
	);
};

export default Pagination;
