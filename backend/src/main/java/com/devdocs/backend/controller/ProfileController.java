package com.devdocs.backend.controller;

import com.devdocs.backend.dto.ProfileResponse;
import com.devdocs.backend.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile(
            @RequestParam String email
    ) {

        return profileService.getProfile(email);

    }

}