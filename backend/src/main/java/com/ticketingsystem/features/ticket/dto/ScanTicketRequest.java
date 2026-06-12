package com.ticketingsystem.features.ticket.dto;

import java.util.UUID;

public record ScanTicketRequest(UUID ticketId, String action) {}
