import React from 'react';
import { darkTheme } from '../theme';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);
  const goToNextPage = () => handlePageChange(currentPage + 1);
  const goToPrevPage = () => handlePageChange(currentPage - 1);

  return (
    <div style={styles.container}>
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        style={{ ...styles.button, backgroundColor: currentPage === 1 ? '#888' : '#333', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        First
      </button>
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        style={{ ...styles.button, backgroundColor: currentPage === 1 ? '#888' : '#333', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>
      <div style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        style={{ ...styles.button, backgroundColor: currentPage === totalPages ? '#888' : '#333', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        style={{ ...styles.button, backgroundColor: currentPage === totalPages ? '#888' : '#333', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Last
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    marginRight: '10px',
    padding: '10px 15px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  pageInfo: {
    color: darkTheme.color,
    padding: '10px',
  },
};

export default Pagination;
