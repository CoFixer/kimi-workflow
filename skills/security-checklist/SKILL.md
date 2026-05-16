---
name: security-checklist
description: OWASP-style security review.
---

# Security Checklist

Run during code review or before deployment.

## Auth & AuthZ
- [ ] JWT uses secure algorithm (RS256/ES256)
- [ ] Token expiration reasonable; refresh rotation
- [ ] All protected endpoints have `@UseGuards()`
- [ ] RBAC enforces least privilege
- [ ] `@Public()` on public routes

## Input
- [ ] All inputs validated
- [ ] File uploads restricted
- [ ] No raw SQL
- [ ] XSS prevention
- [ ] CSRF protection

## Data
- [ ] Passwords hashed (bcrypt/argon2)
- [ ] Sensitive data encrypted at rest
- [ ] API keys in env vars
- [ ] No secrets in code/logs

## Infra
- [ ] HTTPS in production
- [ ] Security headers
- [ ] CORS not wildcard in prod
- [ ] Rate limiting on sensitive endpoints

## Scoring

All checked = **PASS**
Any auth/input missing = **CRITICAL**
1-2 minor missing = **HIGH**
3+ minor missing = **MEDIUM**
