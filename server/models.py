from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable = False, unique = True)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    predictions = db.relationship('Prediction', back_populates='user')

    #password stuff
    @hybrid_property 
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )

    serialize_rules = ["-predictions.user"]

class Fighter(db.Model, SerializerMixin):
    __tablename__ = 'fighters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    height = db.Column(db.String)
    weight = db.Column(db.String)
    reach = db.Column(db.String)
    stance = db.Column(db.String)
    DOB = db.Column(db.Date)
    SLpM = db.Column(db.Float)
    Str_Acc = db.Column(db.Float)
    SApM = db.Column(db.Float)
    Str_Def = db.Column(db.Float)
    TD_Avg = db.Column(db.Float)
    TD_Acc = db.Column(db.Float)
    TD_Def = db.Column(db.Float)
    Sub_Avg = db.Column(db.Float)
    fight_history_fighter_1 = db.relationship('FightHistory', back_populates='fighter_1', foreign_keys='FightHistory.F1_id')
    fight_history_fighter_2 = db.relationship('FightHistory', back_populates='fighter_2', foreign_keys='FightHistory.F2_id')
    predictions_fighter_1 = db.relationship('Prediction', back_populates='fighter_1', foreign_keys='Prediction.F1_id')
    predictions_fighter_2 = db.relationship('Prediction', back_populates='fighter_2', foreign_keys='Prediction.F2_id')

    serialize_rules = [
        "-predictions_fighter_1",
        "-predictions_fighter_2",
        "-fight_history_fighter_1.fighter_1",
        "-fight_history_fighter_2.fighter_2",
    ]

class FightHistory(db.Model, SerializerMixin):
    __tablename__ = 'fight_history'
    id = db.Column(db.Integer, primary_key=True)
    F1_id = db.Column(db.Integer, db.ForeignKey('fighters.id'))
    F2_id = db.Column(db.Integer, db.ForeignKey('fighters.id'))
    event_date = db.Column(db.Date)
    location = db.Column(db.String)
    Result = db.Column(db.String)
    fighter_1 = db.relationship('Fighter', back_populates='fight_history_fighter_1', foreign_keys=[F1_id])
    fighter_2 = db.relationship('Fighter', back_populates='fight_history_fighter_2', foreign_keys=[F2_id])

    serialize_rules = [
        "-fighter_1.fight_history_fighter_1",
        "-fighter_2.fight_history_fighter_2",
    ]

class Prediction(db.Model, SerializerMixin):
    __tablename__ = 'predictions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    F1_id = db.Column(db.Integer, db.ForeignKey('fighters.id'))
    F2_id = db.Column(db.Integer, db.ForeignKey('fighters.id'))
    F1_win_prob = db.Column(db.Float)
    F2_win_prob = db.Column(db.Float)
    user = db.relationship('User', back_populates='predictions')
    fighter_1 = db.relationship('Fighter', back_populates='predictions_fighter_1', foreign_keys=[F1_id])
    fighter_2 = db.relationship('Fighter', back_populates='predictions_fighter_2', foreign_keys=[F2_id])

    serialize_rules = [
        "-user",
        "-fighter_1.predictions_fighter_1",
        "-fighter_2.predictions_fighter_2",
    ]

