import Connector from "./connector";
import APIServices from "./services";

export const connector = new Connector();
export const apiService = new APIServices(connector);