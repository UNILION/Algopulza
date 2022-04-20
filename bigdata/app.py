from flask import Flask
from flask_cors import CORS
from recomm import vulnerability

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/recomm/vulnerability')
def recomm_vul():
    res = vulnerability.recomm_vulnerability()
    return res

if __name__ == '__main__':
    app.debug = True # 개발자 모드
    app.run()

# python app.py 혹은 flask run으로 실행
## flask run의 경우 개발자모드 비활성화