import pytesseract
from PIL import Image
from flask import Flask, render_template, redirect, request, url_for
import os, shutil
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
# change to name of your database; add path if necessary
db_name = 'sqlite.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
class Filecounter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    likescount = db.Column(db.Integer, unique=False, nullable=False)
    imgcounter = db.Column(db.Integer, unique=False, nullable=False,default='0')

db.init_app(app)

@app.route('/')
def home():
    # f = open('counter.txt', 'r')
    # integer = f.read()
    imgfilecount=0
    counter = Filecounter.query.filter_by(id='1').first()
    if counter:
        imgfilecount = counter.imgcounter
    return render_template('index.html', count=imgfilecount)


@app.route('/convert', methods=['POST'])
def convert():
    imgfilecount='0'
    counter = Filecounter.query.filter_by(id='1').first()
    if counter:
        imgfilecount = counter.imgcounter
    else:
        a=Filecounter(likescount='0',imgcounter='0')
        db.session.add(a)
        db.session.commit()

    if request.method == 'POST':
        a = request.files.get('name')
        if a:
            a.save(a.filename)
        else:
            return redirect('/')

        # Configure the module
        pytesseract.tesseract_cmd = 'traccert/tesseract.exe'
        # ////using PIL
        pimg = Image.open(a.filename, 'r')
        out_below = pytesseract.image_to_string(pimg)
        text = out_below

        # //// save count file to database
        imgfilecount=int(imgfilecount)
        imgfilecount += 1
        counter = Filecounter.query.filter_by(id="1").first()
        counter.imgcounter = str(imgfilecount)
        db.session.commit()
        # ///////Delete file to overcome space issue
        os.remove(a.filename)
        return render_template('index.html', text=text, count=imgfilecount)
    return redirect('/')

if __name__ == '__main__':
   db.create_all()
   app.run(debug = True)
