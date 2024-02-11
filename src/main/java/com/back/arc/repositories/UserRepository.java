package com.back.arc.repositories;

import java.util.Optional;

import com.back.arc.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

    Optional<User> findByUsernamee(String username);
}
