print ("Hello")
from faker import Faker
from datetime import date

# Local imports
from app import app
from models import db, User, Fighter, FightHistory, Prediction

fight_date = date.fromisoformat('2019-12-04')
print (fight_date)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()

        # Create fake users
        users = []
        for _ in range(6):
            username = fake.user_name()
            email = fake.email()
            password_hash = '123test!@#'
            user = User(username=username, email=email, password_hash=password_hash)
            users.append(user)
        
        db.session.add_all(users)
        db.session.commit()
        
        # # Create real fighters
        # fighters = [
        #     Fighter(name='Islam Makhachev', weightclass='Lightweight', height=70, stance='Southpaw', dob=date.fromisoformat('1991-10-27'), SigLpM=2.46, StrAcc=0.6, SApM=1.27, StrDef=0.61, TDAvg=3.17, TDAcc=0.6, TDDef=0.9, SubAvg=1.0),
        #     Fighter(name='Alexander Volkanovski', nickname='THE GREAT', weightclass='Featherweight', height=66, stance='Orthodox', dob=date.fromisoformat('1988-09-29'), SigLpM=6.19, StrAcc=0.57, SApM=3.42, StrDef=0.58, TDAvg=1.84, TDAcc=0.37, TDDef=0.7, SubAvg=0.2),
        #     Fighter(name='Khamzat Chimaev', weightclass='Middleweight', height=74, stance='Orthodox', dob=date.fromisoformat('1994-05-01'), SigLpM=5.72, StrAcc=0.58, SApM=3.46, StrDef=0.42, TDAvg=3.99, TDAcc=0.46, TDDef=1.0, SubAvg=2.7),
        #     Fighter(name='Kamaru Usman', nickname='THE NIGERIAN NIGHTMARE', weightclass='Welterweight', height=72, stance='Switch', dob=date.fromisoformat('1987-05-11'), SigLpM=4.36, StrAcc=0.2, SApM=2.74, StrDef=0.54, TDAvg=2.82, TDAcc=0.45, TDDef=0.89, SubAvg=0.1),
        #     Fighter(name='Magomed Ankalaev', weightclass='Light Heavyweight', height=75, stance='Orthodox', dob=date.fromisoformat('1992-06-02'), SigLpM=3.56, StrAcc=0.52, SApM=2.2, StrDef=0.58, TDAvg=1.07, TDAcc=0.31, TDDef=0.86, SubAvg=0.0),
        #     Fighter(name='Johnny Walker', weightclass='Light Heavyweight', height=78, stance='Orthodox', dob=date.fromisoformat('1992-03-30'), SigLpM=3.87, StrAcc=0.56, SApM=2.0, StrDef=0.45, TDAvg=0.5, TDAcc=1.0, TDDef=0.57, SubAvg=1.0)
        # ]

        # db.session.add_all(fighters)
        # db.session.commit()

        # Create fight history
        fights = [
            FightHistory(F1_id=fighters[0].id, F2_id=fighters[1].id, event_date=date.fromisoformat('2023-10-21'), location='Abu Dhabi', Result='Islam Makhachev wins by TKO'),
            FightHistory(F1_id=fighters[2].id, F2_id=fighters[3].id, event_date=date.fromisoformat('2023-10-22'), location='Las Vegas', Result='Khamzat Chimaev wins by UD'),
            FightHistory(F1_id=fighters[4].id, F2_id=fighters[5].id, event_date=date.fromisoformat('2023-10-23'), location='New York', Result='No Contest')
        ]

        db.session.add_all(fights)
        db.session.commit()

        # Create fake predictions
        users = User.query.all()
        fighters = Fighter.query.all()
        predictions = []
        for _ in range(12):
            user = fake.random_element(elements=users)
            f1 = fake.random_element(elements=fighters)
            f2 = fake.random_element(elements=fighters)
            f1_win_prob = fake.pyfloat(min_value=0, max_value=1, right_digits=2)
            f2_win_prob = 1.0 - f1_win_prob
            prediction = Prediction(user_id=user.id, F1_id=f1.id, F2_id=f2.id, F1_win_prob=f1_win_prob, F2_win_prob=f2_win_prob)
            predictions.append(prediction)

        db.session.add_all(predictions)
        db.session.commit()

    print("Seeding completed.")