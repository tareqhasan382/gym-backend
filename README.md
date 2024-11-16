# Gym Management System

## Overview

The Gym Management System facilitates the management of a gym by allowing different roles: **Admins**, **Trainers**, and **Trainees**. Each user role has specific privileges and responsibilities for managing gym activities, classes, and trainee participation.

---

## Roles

### 1. **Admin**

Admins have full control over the system, including creating and managing classes and trainers.

- **Sign-in**  
  Admin can sign in via the following API endpoint:  
  **POST** `/api/v1/login`  
  Example:

  - **Email**: `admin@example.com`
  - **Password**: `12345`

- **Create Class**  
  Admin can create new classes:  
  **POST** `/api/v1/class/create`

- **Create Trainer**  
  Admin can create new trainers:  
  **POST** `/api/v1/trainer`

- **Retrieve All Trainers**  
  Admin can view all trainers:  
  **GET** `/api/v1/trainer/all`

---

### 2. **Trainer**

Trainers manage the classes they are assigned to and enroll trainees.

- **Sign-in**  
  Trainer can sign in via the following API endpoint:  
  **POST** `/api/v1/login`  
  Example:

  - **Email**: `trainer1@example.com`
  - **Password**: `12345`

- **Add Trainee to Class**  
  Trainers can assign trainees to classes:  
  **POST** `/api/v1/class/book-class`

- **Retrieve All Trainees**  
  Trainers can retrieve all available trainees:  
  **GET** `/api/v1/trainee/all`

- **View All Classes**  
  Trainers can view all available classes:  
  **GET** `/api/v1/class`

---

### 3. **Trainee**

Trainees can sign up, sign in, and manage their participation in the classes they enroll in.

- **Sign Up**  
  Trainees can sign up using the following endpoint:  
  **POST** `/api/v1/user/registration`

- **Sign In**  
  Trainees can sign in using the following endpoint:  
  **POST** `/api/v1/user/login`  
  Example:
  - **Email**: `trainee3@example.com`
  - **Password**: `12345`

---

## Database Models

### 1. **User Model (Admin, Trainer, Trainee)**

```json
{
  "_id": "64fda128e4b0aef54d8c1a01",
  "fullName": "Admin User",
  "email": "admin@example.com",
  "role": "ADMIN", // Possible roles: ADMIN, TRAINER, TRAINEE
  "createdAt": "2024-11-16T09:00:00.000Z",
  "updatedAt": "2024-11-16T09:00:00.000Z"
}
```
