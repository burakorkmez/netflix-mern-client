import './skeleton.scss';

const SkeletonElement = ({ type }) => {
	return <div className={`skeleton ${type}`}></div>;
};

export default SkeletonElement;
