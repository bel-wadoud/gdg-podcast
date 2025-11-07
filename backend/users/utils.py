from django.core import signing
"""
utility to generate the login tokens.


"""
def generate_token(data):
    return signing.dumps(data, salt="user-token")

def verify_token(token):
    try:
        return signing.loads(token, salt="user-token")
    except signing.BadSignature:
        return None

