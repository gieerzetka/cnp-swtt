import Axios from "axios";
import {MainConfig} from "../configs/mainConfig";

const AxiosUtil = Axios.create({
	baseURL: MainConfig.APIBaseUrl,
});

export default AxiosUtil;
