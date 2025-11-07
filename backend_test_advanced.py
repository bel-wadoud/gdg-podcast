# test_client.py
import requests
import json

BASE_URL = "http://127.0.0.1:8000/users"  # adjust if different

ACCESS_TOKEN = None
REFRESH_TOKEN = None
HEADERS = {"Content-Type": "application/json"}

# ========================
# Helper Functions
# ========================

def set_auth_header():
    if ACCESS_TOKEN:
        HEADERS["Authorization"] = f"Bearer {ACCESS_TOKEN}"
    else:
        HEADERS.pop("Authorization", None)


def make_request(method, endpoint, data=None, auth=True):
    """
    Handles requests and prints:
    - Data sent
    - Status code
    - Data received
    - Error if exists
    """
    if auth:
        set_auth_header()

    url = f"{BASE_URL}{endpoint}"

    print("="*50)
    print(f"REQUEST -> {method} {url}")
    if data:
        print("Data Sent:", json.dumps(data, indent=2))
    else:
        print("Data Sent: None")

    try:
        if method.upper() == "POST":
            r = requests.post(url, json=data, headers=HEADERS)
        elif method.upper() == "GET":
            r = requests.get(url, headers=HEADERS)
        elif method.upper() == "PUT":
            r = requests.put(url, json=data, headers=HEADERS)
        elif method.upper() == "PATCH":
            r = requests.patch(url, json=data, headers=HEADERS)
        elif method.upper() == "DELETE":
            r = requests.delete(url, headers=HEADERS)
        else:
            raise ValueError("Unsupported HTTP method")

        print("Status Code:", r.status_code)
        try:
            resp_json = r.json()
            print("Response JSON:", json.dumps(resp_json, indent=2))
        except:
            print("Response Text:", r.text)
            resp_json = None

        if r.status_code >= 400:
            print("Error detected!")

        return r

    except Exception as e:
        print("Exception occurred:", e)
        return None


# ========================
# Auth & User
# ========================

def register(username, email, password, first_name="", last_name=""):
    data = {"username": username, "email": email, "password": password,
            "first_name": first_name, "last_name": last_name}
    return make_request("POST", "/register/", data, auth=False)


def login(email_or_username, password):
    global ACCESS_TOKEN, REFRESH_TOKEN
    data = {"email": email_or_username, "password": password}
    r = make_request("POST", "/login/", data, auth=False)
    if r and r.status_code == 200:
        tokens = r.json()
        ACCESS_TOKEN = tokens.get("access")
        REFRESH_TOKEN = tokens.get("refresh")
    return r


def logout():
    global ACCESS_TOKEN, REFRESH_TOKEN
    data = {"refresh": REFRESH_TOKEN}
    r = make_request("POST", "/logout/", data)
    ACCESS_TOKEN = None
    REFRESH_TOKEN = None
    return r

def me():
    """
    Fetch the current logged-in user's data.
    Requires that ACCESS_TOKEN is set by login().
    """
    if not ACCESS_TOKEN:
        print("Error: You must login first to get the access token.")
        return

    # Set Authorization header
    HEADERS["Authorization"] = f"Bearer {ACCESS_TOKEN}"

    url = f"{BASE_URL}/me/"
    print("="*50)
    print(f"GET {url}")
    print("Headers:", HEADERS)

    try:
        r = requests.get(url, headers=HEADERS)
        print("Status Code:", r.status_code)

        try:
            resp_json = r.json()
            print("Response JSON:", json.dumps(resp_json, indent=2))
        except Exception:
            print("Response Text:", r.text)
            resp_json = None

        if r.status_code >= 400:
            print("Error detected!")

        return r

    except Exception as e:
        print("Exception occurred:", e)
        return None



def forgot(email):
    return make_request("POST", "/forgot/", {"email": email}, auth=False)


def reset(token, new_password):
    return make_request("POST", f"/reset/{token}/", {"new_password": new_password}, auth=False)


def verify_email(token):
    return make_request("GET", f"/verify/{token}/", auth=False)


def google_auth(google_token):
    return make_request("POST", "/google/", {"token": google_token}, auth=False)


def list_guests():
    return make_request("GET", "/guests/")


def get_guest(guest_id):
    return make_request("GET", f"/guests/{guest_id}/")


# ========================
# Podcasts Interactions
# ========================

def save_podcast(podcast_id):
    return make_request("POST", "/save/", {"podcast": podcast_id})


def list_saved_podcasts():
    return make_request("GET", "/saved/")


def submit_feedback(message):
    return make_request("POST", "/feedback/", {"message": message})


def update_progress(podcast_id, current_time_seconds):
    return make_request("POST", "/progress/", {"podcast": podcast_id, "current_time_seconds": current_time_seconds})


# ========================
# Comments
# ========================

def comment_podcast(podcast_id, text):
    return make_request("POST", "/comment/", {"podcast": podcast_id, "text": text})


def like_comment(comment_id):
    return make_request("POST", "/comment/like/", {"comment": comment_id})


def list_podcast_comments(podcast_id):
    return make_request("GET", f"/podcasts/{podcast_id}/comments/")


# ========================
# Example usage
# ========================

if __name__ == "__main__":
    # Uncomment the test you want to run individually
    
    # register("existing_user", "existing_email", "pass") # Failed ✅
    # register("testing_user", "wadoud@test.com", "strongpassword") # works ✅
    # login("doesnt@exist.com", "strongpassword") # Failed  ✅
    # login("wadoud@test.com", 'passdoesntexist') # Failed ✅
    login("admin@admin.co", '1111') # works ✅
    # me() # works ✅
    # list_guests() # works ✅
    # get_guest(0) # works ✅
    # save_podcast(7) # works ✅
    # list_saved_podcasts() # works ✅
    # submit_feedback("Great app!") # Works ✅
   
    # update_progress(1, 120) # works
    # comment_podcast(1, "Awesome podcast!") # works
    # like_comment(3) # Fails for some reason
    # list_podcast_comments(1) # works
    # logout() # works ✅
    pass

