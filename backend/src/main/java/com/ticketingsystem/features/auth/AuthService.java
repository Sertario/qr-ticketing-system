package com.ticketingsystem.features.auth;

import com.ticketingsystem.common.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public String register(String email, String password, String fullName) {
        if (employeeRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Employee employee = Employee.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .build();

        employeeRepository.save(employee);
        return "Employee registered successfully";
    }

    public String login(String email, String password) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!passwordEncoder.matches(password, employee.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(employee.getEmail());
    }
}
