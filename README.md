# 🚀 Daily DSA Reminder – AWS Lambda + SES + EventBridge

A serverless AWS workflow that sends automated **daily email reminders at 10 PM IST** to practice Data Structures & Algorithms.  
This project demonstrates end-to-end knowledge of **IAM, Lambda, SES, EventBridge, Cron Scheduling, Environment Variables, and Serverless Best Practices.**

---

## 🏗 Architecture

EventBridge (Cron: 10 PM IST)
↓
AWS Lambda (Node.js)
↓
Amazon SES Email Delivery


---

## ✨ Features

- Serverless architecture (no servers to manage)
- AWS Lambda (Node.js 18)
- Email notifications using Amazon SES
- Daily automation via EventBridge Cron
- Secure IAM roles with least-privilege access
- Local testing support using `.env`
- Clean GitHub structure with `.gitignore`

---

## 📂 Project Structure

aws-lambda-dsa-reminder/
│
├── index.js          # Lambda handler
├── local-test.js     # Local testing script
├── .env.example      # Example environment variables file
├── package.json
└── README.md


🛡 Security

🔒 .env is ignored using .gitignore
🔐 IAM permissions strictly follow least-privilege principles
🚫 No sensitive credentials are committed to GitHub
⚙️ Environment variables handle all secrets (local + cloud)
📬 SES access is restricted and monitored
🧩 Lambda runs using a dedicated execution role
🎯 Summary

🎯 Summary

This project demonstrates:

- Strong AWS serverless architecture knowledge
- Practical implementation of Lambda + SES + EventBridge
- Understanding of IAM roles, policies, and secure access
- Ability to build scheduled automation using Cron expressions
- Clean and professional GitHub project organization
- Real-world experience designing production-ready AWS solutions