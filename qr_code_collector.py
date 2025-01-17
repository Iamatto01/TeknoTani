import qrcode
from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# 1. Generate QR Code
def generate_qr(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save("qrcode.png")
    print("[+] QR Code saved as 'qrcode.png'")

# 2. Endpoint to Collect Data
@app.route('/collect', methods=['GET'])
def collect_data():
    # Get IP address and browser details
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr

    # Debug info
    print(f"[+] Data Collected - IP: {ip_address}, User-Agent: {user_agent}")

    # Response to the user
    return jsonify({
        'status': 'success',
        'message': 'Data collected successfully',
        'ip_address': ip_address,
        'user_agent': user_agent
    })

# 3. Main Function
if __name__ == '__main__':
    # URL for QR Code (replace with your actual IP address or domain)
    url = "http://127.0.0.1:5000/collect"
    
    # Generate QR Code
    generate_qr(url)

    # Start Flask server
    print("[+] Starting Flask server...")
    app.run(host='0.0.0.0', port=5000)
