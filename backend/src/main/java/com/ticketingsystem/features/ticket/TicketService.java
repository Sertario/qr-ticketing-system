package com.ticketingsystem.features.ticket;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.ticketingsystem.features.event.Event;
import com.ticketingsystem.features.event.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;

    public String buyTicket(UUID eventId, String email) throws Exception {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event isn't found"));

        Ticket ticket = Ticket.builder()
                .event(event)
                .ownerEmail(email)
                .isUsed(false)
                .isInside(false)
                .build();

        ticket = ticketRepository.save(ticket);
        return generateQRCodeBase64(ticket.getId().toString());
    }

    private String generateQRCodeBase64(String text) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text,
                BarcodeFormat.QR_CODE, 250, 250);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return Base64.getEncoder().encodeToString(outputStream.toByteArray());
    }

    public String scanTicket(UUID ticketId, String action) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket wasn't found"));

        if ("ENTRY".equalsIgnoreCase(action)) {
            if (ticket.isInside()) {
                throw new RuntimeException("Error: person is inside!");
            }
            ticket.setInside(true);
            ticket.setUsed(true);
        }

        else if ("EXIT".equalsIgnoreCase(action)) {
            if (!ticket.isInside()) {
                throw new RuntimeException("Error: person left!");
            }
            ticket.setInside(false);
        } else {
            throw new RuntimeException("Invalid action. Use ENTRY or EXIT.");
        }

        ticketRepository.save(ticket);
        return "Success: " + action + ". Ticket: " + ticketId;
    }
}
