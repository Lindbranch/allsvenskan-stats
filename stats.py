import pandas as pd
import json

# Load the JSON data
with open('team-stats-2024.json', 'r') as file:
    data = json.load(file)

# Convert the JSON data to a DataFrame
df = pd.DataFrame(data)

# Specify the fields to calculate mean and median
fields = [
    "smcId", "goals", "shots", "shotsOnTarget", "shotsPostOrBar", 
    "penaltyGoals", "subinGoals", "headerGoals", "cornerHeaderGoals", 
    "freekickGoals", "allCornerGoals", "setPieceGoals", 
    "concededCornerGoals", "yellowCards", "redCards", 
    "corners", "distanceAsHomeTeam", "distanceAsVisitingTeam", 
    "totalDistance", "matchesPlayedAsHomeTeam", 
    "matchesPlayedAsVisitingTeam", "matchesPlayed", 
    "concededGoalsSetPiece", "homeTeamFirstPeriodAveragePossesion", 
    "homeTeamSecondPeriodAveragePossesion", 
    "visitingTeamFirstPeriodAveragePossesion", 
    "visitingTeamSecondPeriodAveragePossesion", 
    "averagePossesion", "averageAttendees", "totalAttendees"
]

# Calculate mean and median
mean_values = df[fields].mean().to_dict()
median_values = df[fields].median().to_dict()

# Combine mean and median into a single dictionary
mean_median_data = {
    "mean": mean_values,
    "median": median_values
}

# Save the results to a new JSON file
output_path = 'mean_median_data.json'
with open(output_path, 'w') as output_file:
    json.dump(mean_median_data, output_file, indent=4)

print(f"Mean and median data saved to {output_path}")
