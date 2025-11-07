# test_client.py
import requests

BASE_URL = "http://127.0.0.1:8000/api"  # change if your server is different

# Global JWT storage
ACCESS_TOKEN = None
REFRESH_TOKEN = None

HEADERS = {"Content-Type": "application/json"}


# ========================
# Helper functions
# ========================

def set_auth_header():
    """Set Authorization header for authenticated requests."""
    if ACCESS_TOKEN:
        HEADERS["Authorization"] = f"Bearer {ACCESS_TOKEN}"
    else:
        HEADERS.pop("Authorization", None)


def print_response(r):
    print("Status Code:", r.status_code)
    try:
        print("Response JSON:", r.json())
    except:
        print("Response Text:", r.text)
    print("-" * 50)


# ========================
# 1. Auth & Users
# ========================

def register(username, email, password, first_name="", last_name=""):
    url = f"{BASE_URL}/register/"
    data = {
        "username": username,
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name
    }
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def login(email_or_username, password):
    global ACCESS_TOKEN, REFRESH_TOKEN
    url = f"{BASE_URL}/login/"
    data = {"email_or_username": email_or_username, "password": password}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    if r.status_code == 200:
        tokens = r.json()
        ACCESS_TOKEN = tokens.get("access")
        REFRESH_TOKEN = tokens.get("refresh")
        set_auth_header()
    return r


def logout():
    url = f"{BASE_URL}/logout/"
    data = {"refresh": REFRESH_TOKEN}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def me():
    url = f"{BASE_URL}/me/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


def forgot(email):
    url = f"{BASE_URL}/forgot/"
    data = {"email": email}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def reset(token, new_password):
    url = f"{BASE_URL}/reset/{token}/"
    data = {"new_password": new_password}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def verify_email(token):
    url = f"{BASE_URL}/verify/{token}/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


def google_auth(google_token):
    url = f"{BASE_URL}/google/"
    data = {"token": google_token}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def list_guests():
    url = f"{BASE_URL}/guests/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


def get_guest(guest_id):
    url = f"{BASE_URL}/guest/{guest_id}/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


# ========================
# 2. Podcasts Interactions
# ========================

def save_podcast(podcast_id):
    url = f"{BASE_URL}/save/"
    data = {"podcast": podcast_id}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def list_saved_podcasts():
    url = f"{BASE_URL}/saved/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


def submit_feedback(message):
    url = f"{BASE_URL}/feedback/"
    data = {"message": message}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def update_progress(podcast_id, current_time_seconds):
    url = f"{BASE_URL}/progress/"
    data = {"podcast": podcast_id, "current_time_seconds": current_time_seconds}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


# ========================
# 3. Comments
# ========================

def comment_podcast(podcast_id, text):
    url = f"{BASE_URL}/comment/"
    data = {"podcast": podcast_id, "text": text}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def like_comment(comment_id):
    url = f"{BASE_URL}/comment/like/"
    data = {"comment": comment_id}
    r = requests.post(url, json=data, headers=HEADERS)
    print_response(r)
    return r


def list_podcast_comments(podcast_id):
    url = f"{BASE_URL}/podcasts/{podcast_id}/comments/"
    r = requests.get(url, headers=HEADERS)
    print_response(r)
    return r


# ========================
# 4. Run Tests Individually
# ========================

if __name__ == "__main__":
    # Example usage:
    # Uncomment the test you want to run

    # register("wadoud", "wadoud@test.com", "strongpassword")
    # login("wadoud@test.com", "strongpassword")
    # me()
    # list_guests()
    # get_guest(2)
    # save_podcast(7)
    # list_saved_podcasts()
    # submit_feedback("Love this platform!")
    # update_progress(7, 120)  # 2 minutes
    # comment_podcast(7, "Amazing podcast!")
    # like_comment(5)
    # list_podcast_comments(7)
    # logout()
    pass

