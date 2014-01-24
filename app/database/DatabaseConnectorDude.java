package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import play.db.DB;

public class DatabaseConnectorDude {
	
	public DatabaseConnectorDude(){
	}
	
	public static String query(String query){
		ResultSet results = null;
		Connection connection = DB.getConnection();
		
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			results = statement.executeQuery();
			connection.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return getResults(results);
	}
	
	public static String getResults(ResultSet result){
		String fullOut = "";
		String foundType = "";
		try {
			if(result != null){
			while(result.next()){
				   int columns = result.getMetaData().getColumnCount();
				   for(int i = 1; i <= columns; i++){
					  foundType += " " + result.getString(i);
				   }
				   //foundType = result.getString("fname");
				   System.out.println(foundType);
				   fullOut += foundType + "\n";
				   foundType = "";
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return fullOut;
	}
}
