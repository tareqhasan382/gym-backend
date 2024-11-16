# Gym Management System

### This system facilitates the management of a gym, allowing Admins, Trainers, and Trainees to perform specific roles.

1. Admin
   Admins manage the gym's create classes and trainers.
   user=admin@example.com
   password=12345
   Admin Sign-in: `/api/v1/login`(POST)
   Create Class: `/api/v1/class/create`(POST)
   create trainer : `api/v1/trainer`(POST)
   retrive trainer : `api/v1/trainer/all`(GET)

2. Trainer
   user=trainer1@example.com
   password=12345

   Trainers manage their assigned classes and the trainees enrolled in those classes.
   Trainer Sign-in
   Endpoint: `/api/v1/login`

   Add Trainee to Class
   Endpoint: `/api/v1/class/book-class` (POST)
   Endpoint: `/api/v1/trainee/all` (GET)
   Endpoint: `/api/v1/class` (GET)

3. Trainee
   user=trainee3@example.com
   password=12345
   Trainees can sign up and sign in to manage their participation in classes and update own infromation.
   `/api/v1/user/registration` (POST)
   `/api/v1/user/login` (POST)

# Database

`{
  "_id": "64fda128e4b0aef54d8c1a01",
  "fullName": "Admin User",
  "email": "admin@example.com",
  "role": "ADMIN", // TRAINER , TRAINEE
  "createdAt": "2024-11-16T09:00:00.000Z",
  "updatedAt": "2024-11-16T09:00:00.000Z"
}
`

`{
  "_id": "64fda130e4b0aef54d8c1b01",
  "name": "Yoga Class",
  "days": "MONDAY",
  "startTime": "09:00",
  "endTime": "10:00",
  "trainer": "64fda128e4b0aef54d8c1a02",  // ref to Users collection
  "trainees": [
    "64fda128e4b0aef54d8c1a03",  // ref to Users collection
    "64fda128e4b0aef54d8c1a04"
  ],
  "max_capacity": 20,
  "createdAt": "2024-11-16T09:00:00.000Z",
  "updatedAt": "2024-11-16T09:00:00.000Z"
}
`
