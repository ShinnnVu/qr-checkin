import Connector, { Method } from "./connector";
import { API } from "../constants/apiContants";

class APIServices {
    connector: Connector;
    constructor(connector: Connector) {
        this.connector = connector;
    }
    register = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.register}`,
            data,
        })
        return result;
    }
    login = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.login}`,
            data,
        })
        return result;
    }
    getWorkspaces = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.getWorkspace}`,
            data,
        })
        return result;
    }
    createWorkspace = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.createWorkspace}`,
            data,
        })
        return result;
    }
    addParticipant = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.addParticipant}`,
            data,
        })
        return result;
    }
    configurateWorkspace = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.configurateWorkspace}`,
            data,
        })
        return result;
    }
    validateCheckin = async (data: any) => {
        const result = await this.connector.request({
            method: Method.post,
            url:  `/${API.ServiceName.api}/${API.MethodName.validateCheckin}`,
            data,
        })
        return result;
    }
}

export default APIServices;