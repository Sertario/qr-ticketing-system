package com.ticketingsystem.features.auth;

import com.ticketingsystem.features.auth.dto.LoginRequest;
import com.ticketingsystem.features.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request.email(), request.password(), request.fullName());
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request.email(), request.password());
    }
}
