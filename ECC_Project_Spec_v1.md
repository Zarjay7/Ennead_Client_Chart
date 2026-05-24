# Ennead Client Chart (ECC) – Full Project Specification v1.0

**Project Path:** \AGENTIC\Projects\Ennead_Client_Chart

**Prepared for:** Grok Build Team  
**Date:** May 24, 2026  
**Status:** Ready to begin development

---

## 1. Project Overview

**Project Name:** Ennead Client Chart (ECC)  
**Goal:** Replace paper-based Progress Notes and Needs & Services Plans with a clean, professional, California-compliant digital system that feels familiar to staff while enabling searchable history, PDF export, and future growth.

**Core Principle:** Match the existing paper forms 95%+ so current users require almost zero retraining.

**Primary Forms to Digitize:**
- Progress Note (1-page form)
- Needs and Services Plan (NSP) – LIC 625 (4-page form)

**MVP Success Criteria:**
- Staff can create, edit, and finalize both forms exactly as they do on paper.
- Every client has a complete chronological timeline.
- Any form can be exported as a print-ready PDF that matches the current paper versions for licensing submissions.
- System is local-first, encrypted, and fully auditable.

---

## 2. MVP Scope (First 6–8 Weeks)

**Must Have:**
- Client management (CRUD + search)
- Progress Note form (exact replica)
- Needs & Services Plan form (exact replica of all 4 pages)
- Client timeline / history view
- High-fidelity PDF export for both forms
- Basic audit logging

**Should Have:**
- Simple task/to-do system linked to clients or notes
- Version history for NSPs (Admission vs Update)
- Mobile-responsive / tablet-friendly layout

---

## 3. Data Model & Database Schema

**Recommended:** PostgreSQL + Prisma ORM

### Core Tables

```sql
clients
- id (UUID, PK)
- first_name, last_name
- dob (date)
- start_date (date)
- status (active, discharged, etc.)
- created_at, updated_at

progress_notes
- id (UUID, PK)
- client_id (FK)
- service_date, service_time
- contact_type (F-F, TEL, TH, COM)
- service_type (AS, CM, TP, DC, CR, IND, PC, O)
- narrative (text)
- staff_name, staff_title
- signature (text or canvas data)
- created_by, updated_by (user_id)
- created_at, updated_at

needs_services_plans
- id (UUID, PK)
- client_id (FK)
- plan_date (date)
- plan_type (admission, update)
- background_info (text)
- socialization_objective, socialization_timeframe, socialization_responsible, socialization_evaluation
- emotional_objective, emotional_timeframe, emotional_responsible, emotional_evaluation
- mental_objective, mental_timeframe, mental_responsible, mental_evaluation
- physical_health_objective, physical_health_timeframe, physical_health_responsible, physical_health_evaluation
- functioning_skills_objective, functioning_skills_timeframe, functioning_skills_responsible, functioning_skills_evaluation
- created_by, updated_by
- created_at, updated_at

tasks
- id (UUID, PK)
- client_id (FK)
- title, description
- due_date, status (todo, in_progress, done)
- linked_note_id (nullable FK)
- created_by, created_at
```

---

## 4. Detailed Form Specifications

### A. Progress Note (Exact Match Required)

| Field                | Type             | Notes |
|----------------------|------------------|-------|
| Client Name          | Auto-filled      | From selected client |
| DOB                  | Auto-filled      | From client record |
| Service Date         | Date picker      | Required |
| Service Time         | Time picker      | Required |
| Contact Type         | Dropdown         | F-F, TEL, TH, COM (show codes) |
| Service Type         | Dropdown         | AS, CM, TP, DC, CR, IND, PC, O (show codes) |
| Narrative            | Large textarea   | Required |
| Staff Name/Title     | Text             | Pre-fill from logged-in user |
| Signature            | Canvas or typed  | Required to finalize |
| Date                 | Auto             | Current date on finalize |

### B. Needs and Services Plan – LIC 625 (4 Pages)

**Header (Page 1):**
- Client Name, DOB, Age, Sex, Date
- Facility Name & Address (pre-fill: Ennead, 2740 Fulton Ave Ste. 216, Sacramento, CA 95821)
- Plan Type: Admission / Update (radio)
- Referring Person/Agency
- Facility License Number (pre-fill: 347006147)
- Telephone Number

**Background Information (Page 1):** Large textarea for medical/emotional/behavioral history, functional limitations, capabilities, cash/homemaking ability, likes/dislikes.

**Needs Table (Pages 2–4):**  
Five fixed categories with identical columns:
1. Socialization
2. Emotional
3. Mental
4. Physical/Health
5. Functioning Skills

Each row contains:
- Needs (pre-filled description)
- Objective/Plan (textarea)
- Time Frame (text)
- Person(s) Responsible (text)
- Method of Evaluating Progress (text)

**Signature Section (Page 4):**
- Licensee Signature + Date
- Authorized Representative / Social Worker / Physician Signature + Date
- Client / Representative Signature + Date + Confidentiality statement

---

## 5. Recommended API Endpoints (REST)

**Clients**
- GET /api/clients
- POST /api/clients
- GET /api/clients/{id}
- PUT /api/clients/{id}

**Progress Notes**
- GET /api/clients/{client_id}/progress-notes
- POST /api/clients/{client_id}/progress-notes
- GET /api/progress-notes/{id}
- PUT /api/progress-notes/{id}
- POST /api/progress-notes/{id}/finalize

**Needs & Services Plans**
- GET /api/clients/{client_id}/nsp
- POST /api/clients/{client_id}/nsp
- GET /api/nsp/{id}
- PUT /api/nsp/{id}
- POST /api/nsp/{id}/finalize

**Tasks**
- GET /api/clients/{client_id}/tasks
- POST /api/tasks
- PUT /api/tasks/{id}

**PDF Export**
- GET /api/progress-notes/{id}/pdf
- GET /api/nsp/{id}/pdf

---

## 6. UI/UX & Technical Guidelines

- Clean clinical aesthetic, light background, large touch targets (tablet-first)
- Forms must match the exact layout and field order from the attached PDFs
- Auto-save every 30 seconds
- Local-first architecture (encrypted at rest)
- Recommended stack: Next.js + Node.js/FastAPI + PostgreSQL + Prisma + Tailwind + shadcn/ui
- PDF generation: Puppeteer or React-PDF for high visual fidelity

---

## 7. Security & Compliance

- AES-256 encryption at rest
- Role-based access (Therapist / Supervisor / Admin)
- Full audit log on every create/edit/delete
- Session timeout + auto-lock
- One-click PDF export ready for licensing visits

---

## 8. Development Phases & Timeline

**Weeks 1–2:** Database + Client CRUD + Progress Note form (exact replica)  
**Weeks 3–4:** NSP form (all 4 pages) + PDF export for both forms  
**Weeks 5–6:** Client timeline + basic task system  
**Weeks 7–8:** Polish, mobile responsiveness, audit logging, testing  
**Week 9:** Final review and documentation

---

## 9. Immediate Next Steps for Grok Build

1. Review this spec + the two attached PDFs.
2. Set up repository and database.
3. Start with the Progress Note form (highest daily usage).
4. Schedule a short kickoff call if any questions arise.

---

**This specification is complete and ready for development.**