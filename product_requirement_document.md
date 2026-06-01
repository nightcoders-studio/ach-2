# Product Requirement Document (PRD)

## 1. Introduction
**Product Name:** KeudeKu – F&B Management Platform for UMKM
**Version:** 1.0.0
**Prepared By:** Senior Product Team
**Date:** 2026‑06‑01

## 2. Purpose
Provide an end‑to‑end digital solution for Indonesian F&B UMKM to manage operations, accept QR‑based orders, run POS, engage customers with AI recommendations, and gain actionable analytics.

## 3. Scope
- **In‑Scope (MVP):** Smart Table Menu, POS Management, Customer Management, Loyalty, Basic Analytics Dashboard.
- **Out‑of‑Scope (MVP):** Multi‑outlet management, marketplace integrations, advanced AI training pipelines.

## 4. Stakeholders
| Role | Team |
|------|------|
| Product Owner | Business Lead |
| Users | Business Owners, Cashiers, Staff, Customers |
| Development | Frontend, Backend, DevOps |
| Marketing | Growth Team |
| Compliance | Legal & Security |

## 5. Functional Requirements
| ID | Description | Priority |
|----|-------------|----------|
| FR‑001 | QR code per table loads digital menu | Must |
| FR‑002 | Browse menu by category, search items | Must |
| FR‑003 | Add items to cart and place order | Must |
| FR‑004 | Real‑time order status tracking for staff | Must |
| FR‑005 | Process payments (cash, QRIS, e‑wallet) | Must |
| FR‑006 | Split payment functionality | Should |
| FR‑007 | Generate digital receipt | Must |
| FR‑008 | Customer profile with order & visit history | Must |
| FR‑009 | Loyalty points accrual & redemption | Must |
| FR‑010 | AI‑driven menu recommendations | Should |
| FR‑011 | Analytics dashboard (revenue, trends, retention) | Must |
| FR‑012 | Collect ratings & reviews | Should |
| FR‑013 | Role‑based access control (Super Admin, Owner, Cashier, Staff, Customer) | Must |
| FR‑014 | Google / Email login with JWT | Must |
| FR‑015 | Admin panel for outlet configuration | Must |

## 6. Non‑Functional Requirements (excerpt)
- **Performance:** API latency < 200 ms for order placement.
- **Scalability:** Support up to 10 000 concurrent users per outlet.
- **Reliability:** 99.9 % SLA uptime.
- **Security:** PCI‑DSS compliance for payment data, GDPR‑style consent, AES‑256 at‑rest encryption.
- **Usability:** Mobile‑first UI, WCAG 2.1 AA compliance, Indonesian language default.
- **Maintainability:** CI/CD via GitHub Actions, automated tests, code linting.

## 7. Success Metrics
- **ARR > USD 1.2 M** in Year 1 (≈ 15 K active outlets).
- **AOV increase ≥ 15 %** for adopters.
- **Repeat purchase rate ≥ 30 %** within 30 days.
- **Churn < 5 %** quarterly.
- **NPS ≥ 70**.

## 8. Release Plan
| Milestone | Target Date |
|-----------|-------------|
| MVP (Core modules) | Q3 2026 |
| Phase 2 (AI & Advanced Analytics) | Q4 2026 |
| Phase 3 (Multi‑outlet & Marketplace) | Q1 2027 |

---
*Prepared by the senior product team – June 2026*
