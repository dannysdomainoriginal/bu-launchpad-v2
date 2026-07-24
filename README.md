# BU Launchpad

> A platform that enables student founders to showcase their products, collect feedback, connect with collaborators, and manage their projects within a university ecosystem.

## Overview

BU Launchpad is a web platform designed for university communities that provides a centralized space for students to publish software products and discover projects being built by other students.

The platform allows founders to present their work, receive structured feedback, manage collaboration requests, and maintain a public builder profile. It also provides visitors with tools to explore products, learn about their creators, and engage with ongoing projects.

The project is currently under active development, with features being released incrementally as the platform evolves.

## Objectives

The primary objectives of BU Launchpad are to:

- Provide a central directory for student-built products.
- Enable founders to gather feedback from other students.
- Facilitate collaboration between founders and potential contributors.
- Increase the visibility of student projects within the university.
- Provide builders with a dedicated space to manage their products and public profiles.

## Core Features

### Product Management

Authenticated users can create and manage product listings, including project information, branding, links, categories, and development status.

### Product Discovery

Visitors can browse published products, search for projects, and view detailed product pages.

### Feedback System

Visitors can submit structured feedback on published products. Feedback is stored and made available to product owners through their dashboard.

### Collaboration Requests

Users can express interest in contributing to a project by submitting collaboration requests to founders. Product owners can review, accept, or decline requests from the dashboard.

### Builder Profiles

Builders can create optional public profiles containing professional information, biographies, academic details, and external links.

### Dashboard

Each authenticated user has access to a dashboard for managing products, feedback, collaboration requests, and profile information.

## Technology Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js (App Router)           |
| Language       | TypeScript                     |
| UI             | React, Tailwind CSS, shadcn/ui |
| Forms          | React Hook Form, Zod           |
| ORM            | Drizzle ORM                    |
| Database       | PostgreSQL (Neon)              |
| Authentication | Clerk                          |
| Email          | Resend                         |
| Deployment     | Vercel                         |

---

## Architecture

The application follows the Next.js App Router architecture and primarily utilizes Server Components. Interactive functionality is implemented through Client Components where required.

Key architectural decisions include:

- Server Actions for data mutations.
- Type-safe validation using Zod.
- Database access through Drizzle ORM.
- Modular service layer for business logic.
- Route-level caching where appropriate.
- Component-based UI architecture.

## Repository Structure

```
app/            Application routes
components/     Shared UI components
actions/        Server Actions
services/       Business logic
db/             Database schema and queries
lib/            Shared utilities
types/          Shared TypeScript types
emails/         Email templates
```

## Current Release

Current version: **v2.1**

Major functionality currently available includes:

- Authentication
- Product publishing
- Product discovery
- Product feedback
- Collaboration requests
- Builder profiles
- Founder dashboard
- Email notifications

## Future Development

The platform is under continuous development. Future iterations may introduce additional features, improvements to existing workflows, and expanded functionality based on product requirements and user feedback.
