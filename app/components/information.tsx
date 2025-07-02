type InformationProps = {
	invitee: string;
	sendData: string;
	date: string;
	time: string;
	place: string;
};

export default function Information({
	invitee,
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
			<div className={mainSize}>{invitee}</div>
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
		</div>
	);
}
