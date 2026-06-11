package com.gamification.api.controller;

import com.gamification.api.model.ContactMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@RequestBody ContactMessage message) {
        System.out.println("=== NOVO CONTATO RECEBIDO NO BACKEND JAVA ===");
        System.out.println("Nome: " + message.getName());
        System.out.println("E-mail: " + message.getEmail());
        System.out.println("Assunto: " + message.getSubject());
        System.out.println("Mensagem: " + message.getMessage());
        System.out.println("Timestamp: " + message.getTimestamp());
        System.out.println("============================================");

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mensagem de contato recebida com sucesso pelo servidor Java!");
        return ResponseEntity.ok(response);
    }
}
