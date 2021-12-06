import React from 'react'
import { PageItem,Pagination, } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

const CustomPagination = () => {

    const handlePageClick = (data)=>{
        console.log(data.selected)
    }
    return (
        <div>
            <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={25}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={'page-link'}
            />
        </div>
    )
}

export default CustomPagination
