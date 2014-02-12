package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

import play.db.DB;

public class DatabaseConnectorDude {
	
	public DatabaseConnectorDude(){
	}
	
	public static ResultSet query(String query){
			 	Statement statement = null;
			 	Connection connection;
//				try {
//					connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/scuba_steve_db","root", "WoollyMammoth1");
//				} catch (SQLException e1) {
//					e1.printStackTrace();
//				};
				connection = DB.getConnection(false);
				ResultSet result = null;
				
				try {
						statement = connection.createStatement();
						result = statement.executeQuery(query);
					} catch (SQLException e) {
						e.printStackTrace();
				}
				
			return result;
		 }

	public static String getStringFromResultSet(ResultSet result) throws SQLException {
		String foundType = "";
		while(result.next()){
			   int columns = result.getMetaData().getColumnCount();
			   for(int i = 1; i <= columns; i++){
				  String resultString = result.getString(i);
				  if(resultString != null){
					  foundType += " " + resultString.trim();
				  }
			   }
			}
		return foundType.trim();
	}
}
