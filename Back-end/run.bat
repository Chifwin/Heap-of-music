call proj\Scripts\activate.bat
pip install django==3.2
pip install django-cors-headers
pip install mutagen
pip install djangorestframework
pip install djangorestframework-jwt

@REM py manage.py migrate --run-syncdb

py manage.py runserver
