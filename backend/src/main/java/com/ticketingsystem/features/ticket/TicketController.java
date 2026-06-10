package com.ticketingsystem.features.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping("/buy")
    public String buy(@RequestParam UUID eventId, @RequestParam String email)
            throws Exception {
        return ticketService.buyTicket(eventId, email);
    }

    @PostMapping("/scan")
    public String scan(@RequestParam UUID ticketId, @RequestParam String action) {
        try {
            return ticketService.scanTicket(ticketId, action);
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }
}