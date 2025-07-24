type InformationProps = {
	groom: string;
	bride: string;
	sendData: string;
	date: string;
	time: string;
	place: string;
};

export default function Information({
	groom,
	bride,
	sendData,
	date,
	time,
	place,
}: InformationProps) {
	const mainSize = "text-sm md:text-2xl";
	const subjectSize = "text-2xl md:text-3xl font-bold";
	const subSize = "text-xs md:text-xl";

	return (
		<div className="flex flex-col items-center justify-center space-y-3 mx-2">
			<div className={mainSize}>朝夕涼味を覚える今日この頃</div>
			<div className={mainSize}>皆様にはおすこやかにお過ごしのことと</div>
			<div className={mainSize}>お慶び申し上げます</div>
			<div className={mainSize}>
				この度 私たちは結婚式を挙げることになりました
			</div>
			<div className={mainSize}>日頃のご厚誼を感謝するとともに</div>
			<div className={mainSize}>末永いおつきあいをお願いいたしたく</div>
			<div className={mainSize}>
				ささやかながら披露の小宴を催したいと存じます
			</div>
			<div className={mainSize}>ご多用中とは存じますが</div>
			<div className={mainSize}>ご出席くださいますようお願い申し上げます</div>
			<div className={mainSize}>{sendData}</div>
			<br />
			<div className={mainSize}>{groom}</div>
			<div className={mainSize}>{bride}</div>
			<br />
			<br />
			<div className={subjectSize}>日時</div>
			<br />
			<div className={mainSize}>{date}</div>
			<div className={mainSize}>{time}</div>
			<div className={subSize}>開宴30分前迄に地下1階の受付にお越しください</div>
			<br />
			<div className={subjectSize}>場所</div>
			<br />
			<pre
				className={`${mainSize} whitespace-pre-wrap text-center`}
				style={{ fontFamily: "'游明朝','Yu Mincho',YuMincho,serif" }}
			>
				{place}
			</pre>
			<div className="w-full max-w-2xl mx-auto">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.916658518871!2d139.632999756181!3d35.45685765505322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185be545597627%3A0x5899d4a6e50cd4a!2z5qiq5rWc44OZ44Kk44Ob44OG44Or5p2x5oCl!5e0!3m2!1sja!2sjp!4v1751491525358!5m2!1sja!2sjp"
					className="w-full h-64 md:h-96"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
}
