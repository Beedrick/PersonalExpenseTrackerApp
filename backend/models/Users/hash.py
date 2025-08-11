from hashlib import sha256

def encryptPass(pwrd):
    print(pwrd)
    hInstance = sha256()
    hInstance.update(pwrd)
    encryptedPass = hInstance.hexdigest()
    print(encryptedPass)

    return encryptedPass


