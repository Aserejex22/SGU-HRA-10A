package mx.edu.utez.server.utils;

import org.springframework.http.HttpStatus;

public class APIResponse {
    private HttpStatus status;
    private boolean success;
    private String message;
    private Object data;

    public APIResponse() {}
    public APIResponse(HttpStatus status, boolean success, String message, Object data) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static APIResponse ok(Object data){ return new APIResponse(HttpStatus.OK, true, null, data); }
    public static APIResponse fail(HttpStatus status, String msg){ return new APIResponse(status, false, msg, null); }

    public HttpStatus getStatus() { return status; }
    public void setStatus(HttpStatus status) { this.status = status; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}
