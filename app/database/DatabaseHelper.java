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
}