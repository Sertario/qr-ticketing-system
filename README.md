# QR-ticketing System

This project is dedicated to the implementation of a functioning system for **purchasing tickets to events in the form of QR-codes** and tools for **ticket entry and exit control** during the event.

---

## Web application for buying tickets

1. **Frontend**  
   - Built with **React JS** and **CSS**.  
   - Features include:
     - Displaying a list of events with general info.  
     - Choosing an event from the list.  
     - Creating (buying) a **QR-ticket** for the chosen event.  
     - Downloading the generated QR-ticket.

2. **Backend**  
   - Implemented in **Java**.  
   - Responsible for:
     - Generating **QR codes** using the **ZXing (Zebra Crossing)** library.  
     - Saving them to a **PostgreSQL** database associated with the user's email.

---

## Application for ticket control

- Implemented using **React Native**, allowing it to run on both **Android** and **iOS**.  
- Functionality includes:
  - **Worker verification**.  
  - **QR-code scanning** to check ticket validity in the database.  
  - **Entry/exit tracking** — marking tickets to prevent multiple entries with the same code.

---

## Tech Stack
**Frontend:** React JS, CSS  
**Backend:** Java, ZXing, PostgreSQL  
**Mobile App:** React Native