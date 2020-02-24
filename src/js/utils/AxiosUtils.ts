import Axios from "axios";
import {MainConfig} from "../configs/mainConfig";

const AxiosUtils = Axios.create({
	baseURL: MainConfig.APIBaseUrl,
});

export default AxiosUtils;
