import os
import duo_client
import ConfigParser
from flask import Flask, render_template, request

app = Flask(__name__)

def grab_keys(filename='duo.conf'):
    config = ConfigParser.RawConfigParser()
    config.read(filename)

    ikey = config.get('duo', 'ikey')
    skey = config.get('duo', 'skey')
    host = config.get('duo', 'host')
    return {'ikey': ikey, 'skey': skey, 'host': host}

duo_keys = grab_keys()

auth_api = duo_client.Auth(
    ikey=duo_keys['ikey'],
    skey=duo_keys['skey'],
    host=duo_keys['host'],
)

@app.route('/')
def home():
	try:
		ping = (auth_api.ping())
	except RuntimeError as e:
		return e.args

	try:
		check = (auth_api.check())
	except RuntimeError as e:
		return e.args
		
	return render_template('index.html')

@app.route('/', methods=['POST'])
def my_form_post():
    uname = request.form['text']
    try: 
    	preauth = auth_api.preauth(username=uname)
    except:
    	return("Username " + uname + " wasn't found")
    if preauth["result"] != "auth":
    	return(preauth["status_msg"])
    result = auth_api.auth(username=uname,factor="push",device="auto")
    return render_template('result.html', result=result)
    #result["status"])

if __name__ == '__main__':
    app.run(host='0.0.0.0')