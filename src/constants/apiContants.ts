export const API_URL = "https://qr-checkin-server.vercel.app";
export const TIME_OUT = 30000;

export const API = {
    ServiceName: {
        api: "api",
    },
    MethodName: {
        register: "register",
        login: "login",
        createWorkspace: "create-workspace",
        configurateWorkspace: "configurate-workspace",
        addParticipant: "add-participant",
        getWorkspace: "get-workspaces",
        validateCheckin: "validate-checkin",
        getEmployees: "get-employees",
        getHistory: "get-history",
        checkHost: "check-host",
        getWorkspaceTime: "get-workspace-time",
        getWorkspaceLocation: "get-workspace-location",
        updateWorkspaceInfo: "update-workspace-info",
        getWorkspaceMode: "get-workspace-mode",
        updateWorkspaceConfig: "update-workspace-config",
        getWorkspaceInfo: "get-workspace-info"
    }
}