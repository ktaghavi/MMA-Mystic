#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, render_template, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Fighter, FightHistory, Prediction

# Views go here!

## Login - Session - Logout

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username==username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else: 
                return {'Error':'Incorrect Password'},  401
        return {'Error':'User does not exist'}, 401

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(only=('username','id'))
        else:
            return {'message':'Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout')

# User routes

class Users(Resource):

    # get all users   
    def get(self):
        users_to_get = User.query.all()
        data = [user.to_dict() for user in users_to_get]

        return data, 200
    
    # post a new user
    def post(self):
        user_to_create = request.get_json()
        print(user_to_create)
        try:
            new_user = User(   
                username = user_to_create['username'],
                email = user_to_create['email'],
                password_hash = user_to_create['password'],
            )

            print(new_user)

            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201

        except:
            raise Exception('There was an error while creating the user')

api.add_resource(Users, '/users')

class UserById(Resource):
    
    def get(self, id):
        
        user_to_choose = User.query.filter_by(id=id).first() 

        return user_to_choose.to_dict(), 200
    
    def patch(self, id):
        data_to_patch_from = request.get_json()
        user_to_choose = User.query.filter_by(id=id).first()

        if user_to_choose:
            for field in data_to_patch_from:
            # Check if the field exists in the User model
                if hasattr(user_to_choose, field):
                    setattr(user_to_choose, field, data_to_patch_from[field])
                else:
                    return {'error': 'Invalid field: {}'.format(field)}, 400
            db.session.commit()
            return user_to_choose.to_dict(), 200
        else:
            return {'error': 'The user does not exist'}, 404
        
    def delete(self, id):

        user_to_choose = User.query.filter_by(id=id).first() 

        if user_to_choose:
            db.session.delete(user_to_choose)
            db.session.commit()
            return {}, 202
        else:
            return {'error':'the user does not exist'}, 404

api.add_resource(UserById, '/users/<int:id>')


# Fighter routes 

class Fighters(Resource):

    def get(self):
        fighters = Fighter.query.all()
        data = [fighter.to_dict() for fighter in fighters]
        return data, 200

api.add_resource(Fighters, '/fighter_roster')

class FighterById(Resource):

    def get(self, id):
        fighter = Fighter.query.filter_by(id=id).first()
        return fighter.to_dict(), 200

    def patch(self, id):
        data_to_patch = request.get_json()
        fighter = Fighter.query.filter_by(id=id).first()
        if fighter:
            for field in data_to_patch:
                setattr(fighter, field, data_to_patch[field])
        else:
            return {'error': 'The fighter does not exist'}, 404

    def delete(self, id):
        fighter = Fighter.query.filter_by(id=id).first()
        if fighter:
            db.session.delete(fighter)
            db.session.commit()
            return {}, 202
        else:
            return {'error': 'The fighter does not exist'}, 404

api.add_resource(FighterById, '/fighters/<int:id>')


# Fight History routes 

class FightHistories(Resource):

    def get(self):
        completed_fights = FightHistory.query.all()
        data = [fights.to_dict() for fights in completed_fights]
        return data, 200

    def post(self):
        fight_data = request.get_json()
        try:
            new_fight = FightHistory(
                F1_id = fight_data['F1_id'],
                F2_id = fight_data['F2_id'],
                event_date = fight_data['event_date'],
                location = fight_data['location'],
                F1_opening_odds = fight_data['F1_opening_odds'],
                F2_opening_odds = fight_data['F2_opening_odds'],
                F1_closing_odds = fight_data['F1_closing_odds'],
                F2_closing_odds = fight_data['F2_closing_odds'],
                Result = fight_data['Result']
            )
            db.session.add(new_fight)
            db.session.commit()
            return new_fight, 201
        except:
            raise Exception('Error while creating fight history')

api.add_resource(FightHistories, '/fight_history')

class FightById(Resource):

    def get(self, id):
        fight = FightHistory.query.filter_by(id=id).first()
        if fight:
            return fight.to_dict(), 200
        else:
            return {'error': 'The fight does not exist'}, 404

    def patch(self, id):
        data_to_patch = request.get_json()
        fight = FightHistory.query.filter_by(id=id).first()
        if fight:
            for field in data_to_patch:
                setattr(fight, field, data_to_patch[field])
            db.session.commit()
            return fight.to_dict(), 200
        else:
            return {'error': 'The fight does not exist'}, 404

    def delete(self, id):
        fight = FightHistory.query.filter_by(id=id).first()
        if fight:
            db.session.delete(fight)
            db.session.commit()
            return {}, 202
        else:
            return {'error': 'The fight does not exist'}, 404

api.add_resource(FightById, '/fights/<int:id>')


# Prediction routes

class Predictions(Resource):

    def get(self):
        predictions = Prediction.query.all()
        data = [prediction.to_dict() for prediction in predictions]
        return data, 200

    def post(self):
        prediction_data = request.get_json()
        try:
            print(prediction_data)
            new_prediction = Prediction(
                user_id = prediction_data['user_id'],
                F1_id = prediction_data['F1_id'],
                F2_id = prediction_data['F2_id'],
                F1_win_prob = prediction_data['F1_win_prob'],
                F2_win_prob = prediction_data['F2_win_prob']
            )
            db.session.add(new_prediction)
            db.session.commit()
            return new_prediction.to_dict(), 201
        except:
            raise Exception('Error while creating prediction')

api.add_resource(Predictions, '/predictions-library')

class PredictionById(Resource):

    def get(self, id):
        prediction = Prediction.query.filter_by(id=id).first()
        if prediction:
            return prediction.to_dict(), 200
        else:
            return {'error': 'The prediction does not exist'}, 404

    def patch(self, id):
        data_to_patch = request.get_json()
        prediction = Prediction.query.filter_by(id=id).first()
        if prediction:
            for field in data_to_patch:
                setattr(prediction, field, data_to_patch[field])
            db.session.commit()
            return prediction.to_dict(), 200
        else:
            return {'error': 'The prediction does not exist'}, 404

    def delete(self, id):
        prediction = Prediction.query.filter_by(id=id).first()
        if prediction:
            db.session.delete(prediction)
            db.session.commit()
            return {}, 202
        else:
            return {'error': 'The prediction does not exist'}, 404

api.add_resource(PredictionById, '/predictions/<int:id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)