import {
	ArrowBackIosOutlined,
	ArrowForwardIosOutlined,
} from '@material-ui/icons';
import { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';

export default function List({ list }) {
	const [isMoved, setIsMoved] = useState(false);
	const [slideNumber, setSlideNumber] = useState(0);

	const listRef = useRef();

	const handleClick = (direction) => {
		setIsMoved(true);
		let distance = listRef.current.getBoundingClientRect().x - 50;
		if (direction === 'left' && slideNumber >= 1) {
			setSlideNumber(slideNumber - 1);
			listRef.current.style.transform = `translateX(${460 + distance}px)`;
			if (slideNumber === 1) setIsMoved(false);
		}
		if (direction === 'right' && slideNumber < 2) {
			setSlideNumber(slideNumber + 1);
			listRef.current.style.transform = `translateX(${-460 + distance}px)`;
		}
	};

	return (
		<div className="list">
			<span className="listTitle">{list.title}</span>
			<div className="wrapper">
				(
				<ArrowBackIosOutlined
					className="sliderArrow left"
					onClick={() => handleClick('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				)
				<div className="container" ref={listRef}>
					{list.content.map((item, i) => (
						<ListItem index={i} item={item} key={i} />
					))}
				</div>
				(
				<ArrowForwardIosOutlined
					className="sliderArrow right"
					onClick={() => handleClick('right')}
				/>
				)
			</div>
		</div>
	);
}
