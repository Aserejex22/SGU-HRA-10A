package mx.edu.utez.server.modules.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mx.edu.utez.server.modules.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  boolean existsByEmail(String email);
}
