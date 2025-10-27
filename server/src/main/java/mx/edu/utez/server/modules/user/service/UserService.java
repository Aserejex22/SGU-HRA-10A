package mx.edu.utez.server.modules.user.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mx.edu.utez.server.modules.user.dto.UserDto;
import mx.edu.utez.server.modules.user.model.User;
import mx.edu.utez.server.modules.user.repository.UserRepository;
import mx.edu.utez.server.utils.APIResponse;

@Service
public class UserService {

  private final UserRepository repo;

  public UserService(UserRepository repo) { this.repo = repo; }

  public APIResponse findAll() {
    List<User> list = repo.findAll();
    return new APIResponse(HttpStatus.OK, true, "OK", list);
  }

  public APIResponse findById(Long id) {
    return repo.findById(id)
            .<APIResponse>map(u -> new APIResponse(HttpStatus.OK, true, "OK", u))
            .orElseGet(() -> APIResponse.fail(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
  }
  @Transactional
  public APIResponse saveOrUpdate(UserDto dto) {
    if (dto == null) return APIResponse.fail(HttpStatus.BAD_REQUEST, "Payload vacío");

    if (dto.getEmail() == null || dto.getEmail().isBlank())
      return APIResponse.fail(HttpStatus.BAD_REQUEST, "Correo obligatorio");

    // UPDATE
    if (dto.getId() != null) {
      return repo.findById(dto.getId()).map(u -> {
        if (!u.getEmail().equals(dto.getEmail()) && repo.existsByEmail(dto.getEmail()))
          return APIResponse.fail(HttpStatus.BAD_REQUEST, "El correo ya está registrado");

        u.setFullName(dto.getFullName());
        u.setEmail(dto.getEmail());
        u.setPhone(dto.getPhone());
        User updated = repo.save(u);
        return new APIResponse(HttpStatus.OK, true, "Usuario actualizado", updated);
      }).orElseGet(() -> APIResponse.fail(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    // CREATE
    if (repo.existsByEmail(dto.getEmail()))
      return APIResponse.fail(HttpStatus.BAD_REQUEST, "El correo ya está registrado");

    User created = repo.save(new User(null, dto.getFullName(), dto.getEmail(), dto.getPhone()));
    return new APIResponse(HttpStatus.CREATED, true, "Usuario creado", created);
  }

  @Transactional
  public APIResponse delete(Long id) {
    if (id == null) return APIResponse.fail(HttpStatus.BAD_REQUEST, "ID obligatorio");
    if (!repo.existsById(id)) return APIResponse.fail(HttpStatus.NOT_FOUND, "Usuario no encontrado");
    repo.deleteById(id);
    return new APIResponse(HttpStatus.OK, true, "Usuario eliminado", null);
  }
}
