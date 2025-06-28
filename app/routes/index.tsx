import { createRoute } from "honox/factory";
import Mizuhiki from "../components/mizuhiki";

export default createRoute((c) => {
	return c.render(
		<div>
			<Mizuhiki />
		</div>,
	);
});
