package com.project.event_system.repository;



import com.project.event_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository<Entity, ID Type>
public interface UserRepository extends JpaRepository<User, Long> {

    // "Magic Method": Spring sees "findByEmail" and automatically writes:
    // SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);
}