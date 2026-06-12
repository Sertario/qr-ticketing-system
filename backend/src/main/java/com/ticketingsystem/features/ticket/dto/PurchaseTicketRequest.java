package com.ticketingsystem.features.ticket.dto;

import java.util.UUID;

public record PurchaseTicketRequest(UUID eventId, String email) {}
