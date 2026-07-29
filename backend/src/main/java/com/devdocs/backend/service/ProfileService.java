package com.devdocs.backend.service;

import com.devdocs.backend.dto.ProfileResponse;
import com.devdocs.backend.entity.User;
import com.devdocs.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final DocumentService documentService;

    public ProfileService(UserRepository userRepository,
                          DocumentService documentService) {

        this.userRepository = userRepository;
        this.documentService = documentService;
    }

    public ProfileResponse getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long totalDocuments = documentService.getTotalDocuments();

        return new ProfileResponse(
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                totalDocuments
        );
    }
}