import Connector, { Method } from "../services/connector";
import { API } from "../constants/apiContants";

class APIServices {
    connector: Connector;
    constructor(connector: Connector) {
        this.connector = connector;
    }
    login = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.login}`,
            data,
        })

        return result;
    }
}

export default APIServices;