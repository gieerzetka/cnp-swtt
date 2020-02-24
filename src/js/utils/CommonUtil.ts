export default class CommonUtil {
	public static random(min = 0, max = 100):number {
		return Math.floor(Math.random() * max) + min;
	}
}
