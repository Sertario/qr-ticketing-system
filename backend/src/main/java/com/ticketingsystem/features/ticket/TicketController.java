package com.ticketingsystem.features.ticket;

import com.ticketingsystem.features.ticket.dto.PurchaseTicketRequest;
import com.ticketingsystem.features.ticket.dto.ScanTicketRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping("/purchase")
    public String purchase(@RequestBody PurchaseTicketRequest request)
            throws Exception {
        return ticketService.purchaseTicket(request.eventId(), request.email());
    }

    @PostMapping("/scan")
    public String scan(@RequestBody ScanTicketRequest request) {
        try {
            return ticketService.scanTicket(request.ticketId(), request.action());
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }
}