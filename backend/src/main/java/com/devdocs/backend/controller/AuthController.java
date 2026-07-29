package com.devdocs.backend.controller;

import com.devdocs.backend.dto.LoginRequest;
import com.devdocs.backend.dto.RegisterRequest;
import com.devdocs.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String result = userService.register(request);
        if ("Email already exists!".equals(result)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", result));
        }
        return ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String result = userService.login(request);
        if ("Invalid Email".equals(result) || "Invalid Password".equals(result) || result.contains("null")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", result));
        }
        return ResponseEntity.ok(Map.of("token", result));
    }
}