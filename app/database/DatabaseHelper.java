package database;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper {
	
	public static List<Integer> getNumbersFromNumRecognition(String level){
		List<Integer> numbers = new ArrayList<Integer>();
		try {
			numbers = DatabaseConnectorDude.getIntegersFromResultSet(DatabaseConnectorDude.query("select number from number_recognition where numrec_level_id=" + level, new ArrayList<String>()));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return numbers;
	}
	
	public static List<Integer> getNumbersToIdentifyFromNumRecognition(String level){
		List<Integer> numbersToIdentify = new ArrayList<Integer>();
		try {
			numbersToIdentify = DatabaseConnectorDude.getIntegersFromResultSet(DatabaseConnectorDude.query("select number_to_identify from number_recognition where numrec_level_id=" + level, new ArrayList<String>()));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return numbersToIdentify;
	}
	
	public static List<ArrayList<String>> getAdditionProblemsForLevel(String level){
		List<ArrayList<String>> problems = new ArrayList<ArrayList<String>>();
		List<String> bigProblemList = new ArrayList<String>();
		ArrayList<String> problem = new ArrayList<String>();
		
		try {
			bigProblemList = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select sum_min,sum_max from addition where addition_level_id=" + level, new ArrayList<String>()));
			for(int i = 0; i < bigProblemList.size(); i++){
				if(i%2 == 0){
					problem = new ArrayList<String>();
					problem.add(bigProblemList.get(i));
					problem.add(bigProblemList.get(i+1));
					problems.add(problem);
				} 
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return problems;
	}

	public static List<ArrayList<String>> getSubtractionProblemsForLevel(String level){
			List<ArrayList<String>> problems = new ArrayList<ArrayList<String>>();
			List<String> bigProblemList = new ArrayList<String>();
			ArrayList<String> problem = new ArrayList<String>();
			
			try {
				bigProblemList = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select difference_min,difference_max from subtraction where subtraction_level_id=" + level, new ArrayList<String>()));
				for(int i = 0; i < bigProblemList.size(); i++){
					if(i%2 == 0){
						problem = new ArrayList<String>();
						problem.add(bigProblemList.get(i));
						problem.add(bigProblemList.get(i+1));
						problems.add(problem);
					} 
				}
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
			return problems;
	}
}