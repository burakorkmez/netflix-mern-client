import Shimmer from './Shimmer';
import './skeleton.scss';
import SkeletonElement from './SkeletonElement';

const SkeletonImage = ({ featured }) => {
	const className = featured ? 'skeleton-img featured' : 'skeleton-img';
	return (
		<div className="skeleton-wrapper">
			<div className={className}>
				<SkeletonElement type="img" />
			</div>
			<Shimmer />
		</div>
	);
};

export default SkeletonImage;
