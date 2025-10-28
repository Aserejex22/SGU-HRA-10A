package mx.edu.utez.server.modules.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mx.edu.utez.server.modules.user.dto.UserDto;
import mx.edu.utez.server.modules.user.service.UserService;
import mx.edu.utez.server.utils.APIResponse;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

  private final UserService service;

  public UserController(UserService service) { this.service = service; }

  @GetMapping("")
  public ResponseEntity<APIResponse> findAll() {
    APIResponse res = service.findAll();
    return new ResponseEntity<>(res, res.getStatus());
  }

  @GetMapping("/{id}")
  public ResponseEntity<APIResponse> findById(@PathVariable Long id) {
    APIResponse res = service.findById(id);
    return new ResponseEntity<>(res, res.getStatus());
  }

  @PostMapping("")
  public ResponseEntity<APIResponse> createOrUpdate(@RequestBody UserDto payload) {
    APIResponse res = service.saveOrUpdate(payload);
    return new ResponseEntity<>(res, res.getStatus());
  }

  @PutMapping("")
  public ResponseEntity<APIResponse> update(@RequestBody UserDto payload) {
    APIResponse res = service.saveOrUpdate(payload);
    return new ResponseEntity<>(res, res.getStatus());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<APIResponse> delete(@PathVariable Long id) {
    APIResponse res = service.delete(id);
    return new ResponseEntity<>(res, res.getStatus());
  }
}
