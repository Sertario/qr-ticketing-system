package com.ticketingsystem.features.auth.dto;
public record RegisterRequest(String email,
                              String password,
                              String fullName) {}