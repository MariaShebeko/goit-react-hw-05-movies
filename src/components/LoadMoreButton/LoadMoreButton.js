const LoadMoreButton = ({ onClick }) => {
  return (
    <button type="button" onClick={() => onClick()}>
      <span>Load more</span>
    </button>
  );
};

export default LoadMoreButton;
