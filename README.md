# Project Title: MyPCOSPal

## Overview

The PCOS Symptom Tracker is a web application designed to help individuals with Polycystic Ovary Syndrome (PCOS) monitor their symptoms, mood, activities, and information over time. Users will be able to input data into a form, which will then be stored in a database for future reference.

### Problem

PCOS is a hormonal disorder that can cause a range of symptoms, including irregular periods, weight gain, mood swings, and more. Tracking these symptoms everyday can be challenging/tedious for individuals with PCOS, but it's crucial for managing the condition effectively or consulting a doctor. This app aims to provide users with a convenient way to monitor their symptoms and identify patterns over time, aiding in better management of their health.

### User Profile

The primary users of this app will be individuals diagnosed with PCOS. They will use the app to record their daily symptoms, mood, activities, and any additional comments related to their condition.

### Features

Date Page: Users can select a date to record their symptoms.
Symptom Tracker Form:
Mood Section: Users can select their mood from predefined options (e.g., happy, sad, anxious).
Symptom Section: Users can choose from a list of common PCOS symptoms (e.g., irregular periods, acne, hair loss).
Activities Section: Users can input the activities they engaged in throughout the day.
Input/Info Section: Users can add any additional comments or notes.
Submission Alert: Upon successfully submitting the form, users will receive a notification confirming the submission.
Navigation: Users can easily navigate between the date page and the symptom tracker form.

## Implementation

### Tech Stack

- React
- React Router
- Node.js
- Express
- MySQL
- Knex
- Axios

### APIs

I'm building my own!

### Sitemap

Date Page: Select date
Symptom Tracker Form: Mood, Symptom, Activities, Comment, and Submission Confirmation

### Mockups

Similar to logging period symptoms on the Flo app. It'll be a form with sections and I've chosen the colour teal because that's the colour for PCOS.

### Data

Symptom Entry:
date (date/string)
mood (string)
symptoms (array of strings)
activities (array of strings)
comment (string)

### Endpoints

POST /api/date: Submit symptom entry
{
"message": "Form submitted successfully"
}

GET /api/date: Return the whole set of data
{
"date": "YYYY-MM-DD",
"mood": ["happy", "anxious", "emotional"],
"symptoms": ["irregular periods", "acne", "fatigue", "brain fog"],
"activities": ["exercise", "work"],
"comment": "Minor spotting today"
}

### Auth

No user authentication required

## Roadmap

Day 1-2
Set up project structure, database schema, and basic frontend components (date page, form)

Day 3-4
Implement backend functionality for handling symptom entries

Day 5-6
Finalize frontend design, implement submission alert, and integrate frontend with backend APIs

Day 7
Testing, debugging, and final adjustments before submission

## Nice-to-haves

Data Visualization: Graphs or charts to visualize symptom trends over time
Reminder Feature: Option for users to set reminders to fill out the symptom tracker daily
Community Forum: Integration of a forum where users can share experiences and support each other
User authentication: Users will have to sign up with a username and password, and authentication will be implemented using JWT (JSON Web Tokens).
