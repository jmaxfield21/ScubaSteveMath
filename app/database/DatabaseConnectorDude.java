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
	
	public static String query(String query){
			 	Statement statement = null;
			 
				try {
					Class.forName("com.mysql.jdbc.Driver");
				} catch (ClassNotFoundException e) {
					System.out.println("Where is your MySQL JDBC Driver?");
					e.printStackTrace();
					return;
				}
			 
				System.out.println("MySQL JDBC Driver Registered!");
				Connection connection = null;
				
				Scanner scanner = new Scanner(System.in);
				System.out.println("Enter a username:\n");
				String username = scanner.nextLine();
				System.out.println("Enter a password:\n");
				String password = scanner.nextLine();
				
				try {
					connection = DriverManager
					.getConnection("jdbc:mysql://localhost:3306/scuba_steve_db",username, password);
			 
				} catch (SQLException e) {
					System.out.println("Connection Failed! Check output console");
					e.printStackTrace();
					return;
				}
			 
				if (connection != null) {
					System.out.println("Conected! Type 'quit' to exit");
				} else {
					System.out.println("Failed to make connection!");
				}
				
				String query = null;
				while(!"quit".equals(query)){
				try {
						query = scanner.nextLine();
						statement = connection.createStatement();
						ResultSet result = statement.executeQuery(query);
						
						String foundType = "";
						while(result.next()){
							   int columns = result.getMetaData().getColumnCount();
							   for(int i = 1; i <= columns; i++){
								  foundType += " " + result.getString(i);
							   }
							   //foundType = result.getString("fname");
							   System.out.println(foundType);
							   foundType = "";
							}
					} catch (SQLException e) {
						e.printStackTrace();
				}
			 }
		 }
	}
	
	private static String getResults(ResultSet result){
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
