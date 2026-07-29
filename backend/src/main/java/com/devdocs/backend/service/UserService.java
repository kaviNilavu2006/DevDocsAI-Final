package com.devdocs.backend.service;

import com.devdocs.backend.dto.LoginRequest;
import com.devdocs.backend.dto.RegisterRequest;
import com.devdocs.backend.entity.User;
import com.devdocs.backend.repository.UserRepository;
import com.devdocs.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ===========================
    // Register User
    // ===========================

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        return "User Registered Successfully!";
    }

    // ===========================
    // Login User
    // ===========================

    public String login(LoginRequest request) {

        System.out.println("========== LOGIN DEBUG ==========");
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return "Invalid Email";
        }

        User user = optionalUser.get();

        System.out.println("DB Password: " + user.getPassword());

        if (request.getPassword() == null) {
            return "Password is null";
        }

        if (user.getPassword() == null) {
            return "Database password is null";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid Password";
        }

        return jwtService.generateToken(user.getEmail());
    }

}