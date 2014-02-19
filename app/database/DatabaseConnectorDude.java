package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import play.db.DB;

public class DatabaseConnectorDude {
	
	public DatabaseConnectorDude(){
	}
	
	public static ResultSet query(String query){
			 	Statement statement = null;
			 	Connection connection = DB.getConnection(false);
				ResultSet result = null;
				
				try {
						statement = connection.createStatement();
						result = statement.executeQuery(query);
						connection.commit();
					} catch (SQLException e) {
						e.printStackTrace();
				}
				
			return result;
		 }
	
	public static ResultSet insert(String query){
	 	Statement statement = null;
	 	Connection connection = DB.getConnection(false);
		ResultSet result = null;
		
		try {
				statement = connection.createStatement();
				statement.executeUpdate(query);
				connection.commit();
			} catch (SQLException e) {
				e.printStackTrace();
		}
		
	return result;
 }

	public static List<String> getStringsFromResultSet(ResultSet result) throws SQLException {
		
		List<String> stringyThingies = new ArrayList<String>();
		
		while(result.next()){
			   int columns = result.getMetaData().getColumnCount();
			   for(int i = 1; i <= columns; i++){
				  String resultString = result.getString(i);
				  if(resultString != null){
					  stringyThingies.add(resultString.trim());
				  }
			   }
			}
		
		return stringyThingies;
	}
	
	public static List<Boolean> getBooleansFromResultSet(ResultSet result) throws SQLException {
		
		List<Boolean> bools = new ArrayList<Boolean>();
		
		while(result.next()){
			   int columns = result.getMetaData().getColumnCount();
			   for(int i = 1; i <= columns; i++){
				  bools.add(new Boolean(result.getBoolean(i)));
			   }
			}
		
		return bools;
	}
	
	//Untested
	public static List<Double> getDoublesFromResultSet(ResultSet result) throws SQLException {
		
		List<Double> doubles = new ArrayList<Double>();
		
		while(result.next()){
			   int columns = result.getMetaData().getColumnCount();
			   for(int i = 1; i <= columns; i++){
				  doubles.add(new Double(result.getDouble(i)));
			   }
			}
		
		return doubles;
	}
	
	//Untested
	public static List<Timestamp> getTimestampFromResultSet(ResultSet result) throws SQLException {
		
		List<Timestamp> doubles = new ArrayList<Timestamp>();
		
		while(result.next()){
			   int columns = result.getMetaData().getColumnCount();
			   for(int i = 1; i <= columns; i++){
				  doubles.add(result.getTimestamp(i));
			   }
			}
		
		return doubles;
	}
}
