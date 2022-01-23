import './footer.scss';

export default function Footer() {
	return (
		<footer className="footer">
			<ul>
				<li className="footer-item">
					<a href="#">FAQ</a>
				</li>
				<li className="footer-item">
					<a href="#">Investor Relations</a>
				</li>
				<li className="footer-item">
					<a href="#">Ways to Watch</a>
				</li>
				<li className="footer-item">
					<a href="#">Corporate Information</a>
				</li>
				<li className="footer-item">
					<a href="#">Only on Netflix</a>
				</li>
			</ul>
			<ul>
				<li className="footer-item">
					<a href="#">Help Center</a>
				</li>
				<li className="footer-item">
					<a href="#">Jobs</a>
				</li>
				<li className="footer-item">
					<a href="#">Terms of Use</a>
				</li>
				<li className="footer-item">
					<a href="#">Contact Us</a>
				</li>
			</ul>
			<ul>
				<li className="footer-item">
					<a href="#">Account</a>
				</li>
				<li className="footer-item">
					<a href="#">Redeem Gift Cards</a>
				</li>
				<li className="footer-item">
					<a href="#">Privacy</a>
				</li>
				<li className="footer-item">
					<a href="#">Speed Test</a>
				</li>
			</ul>
			<ul>
				<li className="footer-item">
					<a href="#">Media Center</a>
				</li>
				<li className="footer-item">
					<a href="#">Buy Gift Cards</a>
				</li>
				<li className="footer-item">
					<a href="#">Cookie Preferences</a>
				</li>
				<li className="footer-item">
					<a href="#">Legal Notices</a>
				</li>
			</ul>
			<div>
				<p className="footer-developed-by">
					Developed by Burak Orkmez &copy;{new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
