# Backend Setup & Integration Instructions

This document explains how to set up the Django backend

---

## 1️⃣ Prerequisites

Make sure the following are installed:

- **Python 3.10+** ([Download](https://www.python.org/downloads/))
- **pip** (Python package manager)
- **virtualenv** (optional but recommended)
- **Git** (if cloning from a repository)

---

## 2️⃣ Clone the Backend Repository

```bash
git clone <YOUR_BACKEND_REPO_URL>
cd <BACKEND_PROJECT_FOLDER>
```

## 3setup the backend
```bash
cd <BACKEND_PROJECT_FOLDER>
## on the repo project it's /backend/
python3 -m venv venv

## on mac/linux
source /venv/bin/activate

## on windows CMD
.\venv\Scripts\activate.bat

## on windows powershell
.\venv\Scripts\activate.ps1

## install the dependencies
## pip for windows / pip3 for linux and mac
pip3 install -r requirement.txt

## build the project
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic

## run the server
python3 manage.py runserver

## your server should be running at 127.0.0.1:8000
## navigate to 127.0.0.1:8000/docs/swagger/ to see the full API documentation.
```

made by wadoud@bel
enjoy :)
