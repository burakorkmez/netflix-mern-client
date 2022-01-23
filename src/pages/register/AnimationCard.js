export default function AnimationCard({
	mainText,
	subText,
	imgUrl,
	video,
	reverse,
	videoDevices,
}) {
	if (reverse) {
		return (
			<div style={{ borderBottom: '8px solid #222' }}>
				<div className="animation-container">
					<div className="animation-card">
						<div className="animation-img">
							<img src={imgUrl} alt="" />
							{video && (
								<div
									className={`animation-video ${
										videoDevices && 'animation-video-devices'
									}`}
								>
									<video loop muted autoPlay playsInline>
										<source src={video} />
									</video>
								</div>
							)}
						</div>
						<div className="animation-text">
							<h2 className="animation-main-text">{mainText}</h2>
							<h3 className="animation-sub-text">{subText}</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div style={{ borderBottom: '8px solid #222' }}>
			<div className="animation-container">
				<div className="animation-card">
					<div className="animation-text">
						<h2 className="animation-main-text">{mainText}</h2>
						<h3 className="animation-sub-text">{subText}</h3>
					</div>
					<div className="animation-img">
						<img src={imgUrl} alt="" />
						{video && (
							<div
								className={`animation-video ${
									videoDevices && 'animation-video-devices'
								}`}
							>
								<video loop muted autoPlay playsInline>
									<source src={video} />
								</video>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
