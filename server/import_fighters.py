import pandas as pd
from app import app
from models import db, Fighter
from datetime import datetime
import math

def import_fighter_data():
    # Load fighter data from CSV
    fighter_data = pd.read_csv('data/raw_fighter_details.csv')

    with app.app_context():
        db.create_all()

        # Create Fighter objects from the CSV data
        fighters = []
        for _, row in fighter_data.iterrows():
            dob_str = str(row['DOB'])  # Convert to string
            dob = None  # Default value for DOB

            # Check for 'nan' values using math.isnan
            if not isinstance(row['DOB'], float) or not math.isnan(row['DOB']):
                # Attempt to convert the date string to a date object
                dob = datetime.strptime(dob_str, '%d-%b-%y').date()
            
            fighter = Fighter(
                name=row['name'],
                height=row['height'],
                weight=row['weight'],
                reach=row['reach'],
                stance=row['stance'],
                DOB=dob,
                SLpM=row['SLpM'],
                Str_Acc=row['Str_Acc'],
                SApM=row['SApM'],
                Str_Def=row['Str_Def'],
                TD_Avg=row['TD_Avg'],
                TD_Acc=row['TD_Acc'],
                TD_Def=row['TD_Def'],
                Sub_Avg=row['Sub_Avg']
            )
            fighters.append(fighter)

        db.session.add_all(fighters)
        db.session.commit()

if __name__ == '__main__':
    import_fighter_data()
    print("Data import completed.")