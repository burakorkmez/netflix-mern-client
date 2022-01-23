import { Add, Close } from '@material-ui/icons';
import { useState } from 'react';

export default function Accordion({ question, answers }) {
	const [isClicked, setIsClicked] = useState(false);

	return (
		<>
			<div className="accordion">
				<div
					className="accordion-question"
					onClick={() => setIsClicked((prev) => !prev)}
				>
					<p>{question}</p>
					{isClicked && <Close className="icon" />}
					{!isClicked && <Add className="icon" />}
				</div>
				<div className={`accordion-answer ${isClicked ? 'open' : 'closed'}`}>
					{answers.map((answer, i) => (
						<p className="accordion-p">{answer}</p>
					))}
				</div>
			</div>
		</>
	);
}
