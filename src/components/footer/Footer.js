import './footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<p className="developed-by">
					Developed by
					<span className="footer-author"> Burak Orkmez </span>
				</p>
				<p className="copyright">&copy; 2022 All rights reserved </p>
			</div>
		</footer>
	);
};

export default Footer;
