package mx.edu.utez.server.modules.user.dto;

public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    public Long getId(){ return id; } public void setId(Long id){ this.id=id; }
    public String getFullName(){ return fullName; } public void setFullName(String v){ this.fullName=v; }
    public String getEmail(){ return email; } public void setEmail(String v){ this.email=v; }
    public String getPhone(){ return phone; } public void setPhone(String v){ this.phone=v; }
}
